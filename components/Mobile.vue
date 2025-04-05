<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-black overflow-hidden"
    v-bind="$attrs"
  >
    <MacDock />
    <canvas
      ref="canvas"
      id="fluid"
      class="absolute top-0 left-0 w-screen h-screen overflow-hidden"
      style="z-index: 1"
    />
  </div>
</template>

<script setup>
import { useNuxtApp } from "#app";

const canvas = ref(null);
const frameCount = ref(0);
let animationFrameId = null;
let gl = null;
let ext = null;

// Fluid simulation variables
let dye, velocity, divergence, curl, pressure;
let lastUpdateTime = Date.now();
let colorUpdateTimer = 0.0;

// Shader programs
let copyProgram,
  clearProgram,
  splatProgram,
  advectionProgram,
  divergenceProgram;
let curlProgram, vorticityProgram, pressureProgram, gradienSubtractProgram;
let displayMaterial;

// Simulation parameters
const SIM_RESOLUTION = 128;
const DYE_RESOLUTION = 1440;
const DENSITY_DISSIPATION = 3.5;
const VELOCITY_DISSIPATION = 2;
const PRESSURE = 0.1;
const PRESSURE_ITERATIONS = 20;
const CURL = 3;
const SPLAT_RADIUS = 0.2;
const SPLAT_FORCE = 6000;
const SHADING = true;
const COLOR_UPDATE_SPEED = 10;
const BACK_COLOR = { r: 0.5, g: 0, b: 0 };
const TRANSPARENT = true;

// Add blit variable declaration at the top level
let blit = null;

const { $fluid } = useNuxtApp();

function getWebGLContext(canvas) {
  console.log("Attempting to get WebGL context...");
  const params = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  };
  let context = canvas.getContext("webgl2", params);
  const isWebGL2 = !!context;
  console.log("WebGL2 supported:", isWebGL2);

  if (!isWebGL2) {
    console.log("Falling back to WebGL1...");
    context =
      canvas.getContext("webgl", params) ||
      canvas.getContext("experimental-webgl", params);
  }

  let halfFloat;
  let supportLinearFiltering;
  if (isWebGL2) {
    context.getExtension("EXT_color_buffer_float");
    supportLinearFiltering = context.getExtension("OES_texture_float_linear");
  } else {
    halfFloat = context.getExtension("OES_texture_half_float");
    supportLinearFiltering = context.getExtension(
      "OES_texture_half_float_linear"
    );
  }

  context.clearColor(0.0, 0.0, 0.0, 1.0);
  const halfFloatTexType = isWebGL2
    ? context.HALF_FLOAT
    : halfFloat && halfFloat.HALF_FLOAT_OES;

  let formatRGBA, formatRG, formatR;
  if (isWebGL2) {
    formatRGBA = getSupportedFormat(
      context,
      context.RGBA16F,
      context.RGBA,
      halfFloatTexType
    );
    formatRG = getSupportedFormat(
      context,
      context.RG16F,
      context.RG,
      halfFloatTexType
    );
    formatR = getSupportedFormat(
      context,
      context.R16F,
      context.RED,
      halfFloatTexType
    );
  } else {
    formatRGBA = getSupportedFormat(
      context,
      context.RGBA,
      context.RGBA,
      halfFloatTexType
    );
    formatRG = getSupportedFormat(
      context,
      context.RGBA,
      context.RGBA,
      halfFloatTexType
    );
    formatR = getSupportedFormat(
      context,
      context.RGBA,
      context.RGBA,
      halfFloatTexType
    );
  }

  return {
    gl: context,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering,
    },
  };
}

function getSupportedFormat(gl, internalFormat, format, type) {
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
    switch (internalFormat) {
      case gl.R16F:
        return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
      case gl.RG16F:
        return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
      default:
        return null;
    }
  }
  return {
    internalFormat,
    format,
  };
}

function supportRenderTextureFormat(gl, internalFormat, format, type) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );

  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  return status === gl.FRAMEBUFFER_COMPLETE;
}

function initFramebuffers() {
  let simRes = getResolution(SIM_RESOLUTION);
  let dyeRes = getResolution(DYE_RESOLUTION);
  const texType = ext.halfFloatTexType;
  const rgba = ext.formatRGBA;
  const rg = ext.formatRG;
  const r = ext.formatR;
  const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
  gl.disable(gl.BLEND);

  if (!dye) {
    dye = createDoubleFBO(
      dyeRes.width,
      dyeRes.height,
      rgba.internalFormat,
      rgba.format,
      texType,
      filtering
    );
  } else {
    dye = resizeDoubleFBO(
      dye,
      dyeRes.width,
      dyeRes.height,
      rgba.internalFormat,
      rgba.format,
      texType,
      filtering
    );
  }

  if (!velocity) {
    velocity = createDoubleFBO(
      simRes.width,
      simRes.height,
      rg.internalFormat,
      rg.format,
      texType,
      filtering
    );
  } else {
    velocity = resizeDoubleFBO(
      velocity,
      simRes.width,
      simRes.height,
      rg.internalFormat,
      rg.format,
      texType,
      filtering
    );
  }

  divergence = createFBO(
    simRes.width,
    simRes.height,
    r.internalFormat,
    r.format,
    texType,
    gl.NEAREST
  );
  curl = createFBO(
    simRes.width,
    simRes.height,
    r.internalFormat,
    r.format,
    texType,
    gl.NEAREST
  );
  pressure = createDoubleFBO(
    simRes.width,
    simRes.height,
    r.internalFormat,
    r.format,
    texType,
    gl.NEAREST
  );
}

function createFBO(w, h, internalFormat, format, type, param) {
  gl.activeTexture(gl.TEXTURE0);
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  let fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );
  gl.viewport(0, 0, w, h);
  gl.clear(gl.COLOR_BUFFER_BIT);

  let texelSizeX = 1.0 / w;
  let texelSizeY = 1.0 / h;
  return {
    texture,
    fbo,
    width: w,
    height: h,
    texelSizeX,
    texelSizeY,
    attach(id) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    },
  };
}

function createDoubleFBO(w, h, internalFormat, format, type, param) {
  let fbo1 = createFBO(w, h, internalFormat, format, type, param);
  let fbo2 = createFBO(w, h, internalFormat, format, type, param);
  return {
    width: w,
    height: h,
    texelSizeX: fbo1.texelSizeX,
    texelSizeY: fbo1.texelSizeY,
    get read() {
      return fbo1;
    },
    set read(value) {
      fbo1 = value;
    },
    get write() {
      return fbo2;
    },
    set write(value) {
      fbo2 = value;
    },
    swap() {
      let temp = fbo1;
      fbo1 = fbo2;
      fbo2 = temp;
    },
  };
}

function resizeFBO(target, w, h, internalFormat, format, type, param) {
  let newFBO = createFBO(w, h, internalFormat, format, type, param);
  copyProgram.bind();
  gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
  blit(newFBO);
  return newFBO;
}

function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
  if (target.width === w && target.height === h) return target;
  target.read = resizeFBO(
    target.read,
    w,
    h,
    internalFormat,
    format,
    type,
    param
  );
  target.write = createFBO(w, h, internalFormat, format, type, param);
  target.width = w;
  target.height = h;
  target.texelSizeX = 1.0 / w;
  target.texelSizeY = 1.0 / h;
  return target;
}

function getResolution(resolution) {
  let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
  if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
  const min = Math.round(resolution);
  const max = Math.round(resolution * aspectRatio);
  if (gl.drawingBufferWidth > gl.drawingBufferHeight) {
    return { width: max, height: min };
  } else {
    return { width: min, height: max };
  }
}

function scaleByPixelRatio(input) {
  const pixelRatio = window.devicePixelRatio || 1;
  return Math.floor(input * pixelRatio);
}

function updateColors(dt) {
  colorUpdateTimer += dt * COLOR_UPDATE_SPEED;
  if (colorUpdateTimer >= 1) {
    colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
    $fluid.pointers.forEach((p) => {
      p.color = generateColor();
    });
  }
}

function generateColor() {
  let c = HSVtoRGB(Math.random(), 1.0, 1.0);
  c.r *= 0.15;
  c.g *= 0.15;
  c.b *= 0.15;
  return c;
}

function HSVtoRGB(h, s, v) {
  let r, g, b, i, f, p, q, t;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return { r, g, b };
}

function wrap(value, min, max) {
  const range = max - min;
  if (range === 0) return min;
  return ((value - min) % range) + min;
}

function calcDeltaTime() {
  let now = Date.now();
  let dt = (now - lastUpdateTime) / 1000;
  dt = Math.min(dt, 0.016666);
  lastUpdateTime = now;
  return dt;
}

function splatPointer(pointer) {
  let dx = pointer.deltaX * SPLAT_FORCE;
  let dy = pointer.deltaY * SPLAT_FORCE;
  splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
}

function splat(x, y, dx, dy, color) {
  splatProgram.bind();
  gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
  gl.uniform1f(
    splatProgram.uniforms.aspectRatio,
    canvas.value.width / canvas.value.height
  );
  gl.uniform2f(splatProgram.uniforms.point, x, y);
  gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
  gl.uniform1f(
    splatProgram.uniforms.radius,
    correctRadius(SPLAT_RADIUS / 100.0)
  );
  blit(velocity.write);
  velocity.swap();

  gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
  gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
  blit(dye.write);
  dye.swap();
}

function correctRadius(radius) {
  let aspectRatio = canvas.value.width / canvas.value.height;
  if (aspectRatio > 1) radius *= aspectRatio;
  return radius;
}

function applyInputs() {
  $fluid.pointers.forEach((p) => {
    if (p.moved) {
      p.moved = false;
      splatPointer(p);
    }
  });
}

function step(dt) {
  if (!gl) {
    console.error("WebGL context not available");
    return;
  }

  gl.disable(gl.BLEND);

  // Curl
  if (!curlProgram || !curlProgram.program) {
    console.error("Curl program not initialized");
    return;
  }
  curlProgram.bind();
  gl.uniform2f(
    curlProgram.uniforms.texelSize,
    velocity.texelSizeX,
    velocity.texelSizeY
  );
  gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
  blit(curl);

  // Vorticity
  if (!vorticityProgram || !vorticityProgram.program) {
    console.error("Vorticity program not initialized");
    return;
  }
  vorticityProgram.bind();
  gl.uniform2f(
    vorticityProgram.uniforms.texelSize,
    velocity.texelSizeX,
    velocity.texelSizeY
  );
  gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
  gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
  gl.uniform1f(vorticityProgram.uniforms.curl, CURL);
  gl.uniform1f(vorticityProgram.uniforms.dt, dt);
  blit(velocity.write);
  velocity.swap();

  // Divergence
  if (!divergenceProgram || !divergenceProgram.program) {
    console.error("Divergence program not initialized");
    return;
  }
  divergenceProgram.bind();
  gl.uniform2f(
    divergenceProgram.uniforms.texelSize,
    velocity.texelSizeX,
    velocity.texelSizeY
  );
  gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
  blit(divergence);

  // Clear pressure
  if (!clearProgram || !clearProgram.program) {
    console.error("Clear program not initialized");
    return;
  }
  clearProgram.bind();
  gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
  gl.uniform1f(clearProgram.uniforms.value, PRESSURE);
  blit(pressure.write);
  pressure.swap();

  // Pressure
  if (!pressureProgram || !pressureProgram.program) {
    console.error("Pressure program not initialized");
    return;
  }
  pressureProgram.bind();
  gl.uniform2f(
    pressureProgram.uniforms.texelSize,
    velocity.texelSizeX,
    velocity.texelSizeY
  );
  gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
  for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
    gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
    blit(pressure.write);
    pressure.swap();
  }

  // Gradient Subtract
  if (!gradienSubtractProgram || !gradienSubtractProgram.program) {
    console.error("Gradient subtract program not initialized");
    return;
  }
  gradienSubtractProgram.bind();
  gl.uniform2f(
    gradienSubtractProgram.uniforms.texelSize,
    velocity.texelSizeX,
    velocity.texelSizeY
  );
  gl.uniform1i(
    gradienSubtractProgram.uniforms.uPressure,
    pressure.read.attach(0)
  );
  gl.uniform1i(
    gradienSubtractProgram.uniforms.uVelocity,
    velocity.read.attach(1)
  );
  blit(velocity.write);
  velocity.swap();

  // Advection
  if (!advectionProgram || !advectionProgram.program) {
    console.error("Advection program not initialized");
    return;
  }
  advectionProgram.bind();
  gl.uniform2f(
    advectionProgram.uniforms.texelSize,
    velocity.texelSizeX,
    velocity.texelSizeY
  );
  if (!ext.supportLinearFiltering) {
    gl.uniform2f(
      advectionProgram.uniforms.dyeTexelSize,
      velocity.texelSizeX,
      velocity.texelSizeY
    );
  }
  let velocityId = velocity.read.attach(0);
  gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
  gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
  gl.uniform1f(advectionProgram.uniforms.dt, dt);
  gl.uniform1f(advectionProgram.uniforms.dissipation, VELOCITY_DISSIPATION);
  blit(velocity.write);
  velocity.swap();

  if (!ext.supportLinearFiltering) {
    gl.uniform2f(
      advectionProgram.uniforms.dyeTexelSize,
      dye.texelSizeX,
      dye.texelSizeY
    );
  }
  gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
  gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
  gl.uniform1f(advectionProgram.uniforms.dissipation, DENSITY_DISSIPATION);
  blit(dye.write);
  dye.swap();
}

function render(target) {
  if (!gl) {
    console.error("WebGL context not available");
    return;
  }

  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.BLEND);
  drawDisplay(target);
}

function drawDisplay(target) {
  if (!displayMaterial || !displayMaterial.activeProgram) {
    console.error("Display material not initialized");
    return;
  }

  let width = target == null ? gl.drawingBufferWidth : target.width;
  let height = target == null ? gl.drawingBufferHeight : target.height;
  displayMaterial.bind();
  if (SHADING) {
    gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
  }
  gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
  blit(target);
}

// Add helper functions for shader compilation
function compileShader(type, source, keywords) {
  source = addKeywords(source, keywords);
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  // Check for shader compilation errors
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader);
    console.error(`Shader compilation error: ${error}`);
    console.error("Shader source:", source);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function addKeywords(source, keywords) {
  if (!keywords) return source;
  let keywordsString = "";
  keywords.forEach((keyword) => {
    keywordsString += "#define " + keyword + "\n";
  });
  return keywordsString + source;
}

function createProgram(vertexShader, fragmentShader) {
  if (!vertexShader || !fragmentShader) {
    console.error("Missing vertex or fragment shader");
    return null;
  }

  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // Check for program linking errors
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program);
    console.error(`Program linking error: ${error}`);
    gl.deleteProgram(program);
    return null;
  }

  // Validate the program
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    const error = gl.getProgramInfoLog(program);
    console.error(`Program validation error: ${error}`);
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function getUniforms(program) {
  let uniforms = [];
  let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < uniformCount; i++) {
    let uniformName = gl.getActiveUniform(program, i).name;
    uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
  }
  return uniforms;
}

class Program {
  constructor(vertexShader, fragmentShader) {
    if (!vertexShader || !fragmentShader) {
      console.error("Missing vertex or fragment shader in Program constructor");
      return;
    }

    this.uniforms = {};
    this.program = createProgram(vertexShader, fragmentShader);

    if (!this.program) {
      console.error("Failed to create program");
      return;
    }

    this.uniforms = getUniforms(this.program);
  }

  bind() {
    if (!this.program) {
      console.error("Cannot bind invalid program");
      return;
    }
    gl.useProgram(this.program);
  }
}

class Material {
  constructor(vertexShader, fragmentShaderSource) {
    this.vertexShader = vertexShader;
    this.fragmentShaderSource = fragmentShaderSource;
    this.programs = [];
    this.activeProgram = null;
    this.uniforms = [];
  }

  setKeywords(keywords) {
    let hash = 0;
    for (let i = 0; i < keywords.length; i++) {
      hash += hashCode(keywords[i]);
    }
    let program = this.programs[hash];
    if (program == null) {
      console.log("Compiling fragment shader with keywords:", keywords);
      let fragmentShader = compileShader(
        gl.FRAGMENT_SHADER,
        this.fragmentShaderSource,
        keywords
      );
      if (!fragmentShader) {
        console.error("Failed to compile fragment shader");
        return;
      }
      console.log("Creating program with vertex and fragment shaders");
      program = createProgram(this.vertexShader, fragmentShader);
      if (!program) {
        console.error("Failed to create program");
        return;
      }
      this.programs[hash] = program;
    }
    if (program === this.activeProgram) return;
    this.uniforms = getUniforms(program);
    this.activeProgram = program;
    console.log("Material program set with uniforms:", this.uniforms);
  }

  bind() {
    if (!this.activeProgram) {
      console.error("Cannot bind material: no active program");
      return;
    }
    gl.useProgram(this.activeProgram);
  }
}

function hashCode(s) {
  if (s.length === 0) return 0;
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

onMounted(() => {
  console.log("Component mounted");
  console.log("Canvas element:", canvas.value);

  if (!canvas.value) {
    console.error("Canvas reference is null");
    return;
  }

  // Reset pointers before setup
  $fluid.resetPointers();

  // Set canvas size
  const dpr = window.devicePixelRatio || 1;
  console.log("Device Pixel Ratio:", dpr);

  canvas.value.width = window.innerWidth * dpr;
  canvas.value.height = window.innerHeight * dpr;
  canvas.value.style.width = `${window.innerWidth}px`;
  canvas.value.style.height = `${window.innerHeight}px`;

  console.log("Canvas dimensions:", {
    width: canvas.value.width,
    height: canvas.value.height,
    styleWidth: canvas.value.style.width,
    styleHeight: canvas.value.style.height,
  });

  // Initialize WebGL context
  const { gl: glContext, ext: extContext } = getWebGLContext(canvas.value);
  gl = glContext;
  ext = extContext;

  if (!gl) {
    console.error("WebGL not supported");
    return;
  }

  // Initialize blit function
  blit = (() => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([0, 1, 2, 0, 2, 3]),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);
    return (target, clear = false) => {
      if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      if (clear) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
  })();

  // Compile base vertex shader
  const baseVertexShader = compileShader(
    gl.VERTEX_SHADER,
    `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
      vUv = aPosition * 0.5 + 0.5;
      vL = vUv - vec2(texelSize.x, 0.0);
      vR = vUv + vec2(texelSize.x, 0.0);
      vT = vUv + vec2(0.0, texelSize.y);
      vB = vUv - vec2(0.0, texelSize.y);
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `
  );

  if (!baseVertexShader) {
    console.error("Failed to compile base vertex shader");
    return;
  }

  // Compile all fragment shaders
  const copyShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
      gl_FragColor = texture2D(uTexture, vUv);
    }
  `
  );

  const clearShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
      gl_FragColor = value * texture2D(uTexture, vUv);
    }
  `
  );

  const splatShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
      vec2 p = vUv - point.xy;
      p.x *= aspectRatio;
      vec3 splat = exp(-dot(p, p) / radius) * color;
      vec3 base = texture2D(uTarget, vUv).xyz;
      gl_FragColor = vec4(base + splat, 1.0);
    }
  `
  );

  const advectionShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
      vec2 st = uv / tsize - 0.5;
      vec2 iuv = floor(st);
      vec2 fuv = fract(st);

      vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
      vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
      vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
      vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

      return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
      #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
      #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
      #endif
      float decay = 1.0 + dissipation * dt;
      gl_FragColor = result / decay;
    }
  `,
    ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]
  );

  const divergenceShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;

      vec2 C = texture2D(uVelocity, vUv).xy;
      if (vL.x < 0.0) { L = -C.x; }
      if (vR.x > 1.0) { R = -C.x; }
      if (vT.y > 1.0) { T = -C.y; }
      if (vB.y < 0.0) { B = -C.y; }

      float div = 0.5 * (R - L + T - B);
      gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
  `
  );

  const curlShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
      float L = texture2D(uVelocity, vL).y;
      float R = texture2D(uVelocity, vR).y;
      float T = texture2D(uVelocity, vT).x;
      float B = texture2D(uVelocity, vB).x;
      float vorticity = R - L - T + B;
      gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
  `
  );

  const vorticityShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
      float L = texture2D(uCurl, vL).x;
      float R = texture2D(uCurl, vR).x;
      float T = texture2D(uCurl, vT).x;
      float B = texture2D(uCurl, vB).x;
      float C = texture2D(uCurl, vUv).x;

      vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
      force /= length(force) + 0.0001;
      force *= curl * C;
      force.y *= -1.0;

      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity += force * dt;
      velocity = min(max(velocity, -1000.0), 1000.0);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `
  );

  const pressureShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float C = texture2D(uPressure, vUv).x;
      float divergence = texture2D(uDivergence, vUv).x;
      float pressure = (L + R + B + T - divergence) * 0.25;
      gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
  `
  );

  const gradientSubtractShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity.xy -= vec2(R - L, T - B);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `
  );

  // Create all programs
  copyProgram = new Program(baseVertexShader, copyShader);
  clearProgram = new Program(baseVertexShader, clearShader);
  splatProgram = new Program(baseVertexShader, splatShader);
  advectionProgram = new Program(baseVertexShader, advectionShader);
  divergenceProgram = new Program(baseVertexShader, divergenceShader);
  curlProgram = new Program(baseVertexShader, curlShader);
  vorticityProgram = new Program(baseVertexShader, vorticityShader);
  pressureProgram = new Program(baseVertexShader, pressureShader);
  gradienSubtractProgram = new Program(
    baseVertexShader,
    gradientSubtractShader
  );

  // Create display material
  const displayShaderSource = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
      color = max(color, vec3(0));
      return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
      vec3 c = texture2D(uTexture, vUv).rgb;
      #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
      #endif

      float a = max(c.r, max(c.g, c.b));
      gl_FragColor = vec4(c, a);
    }
  `;
  console.log("Creating display material...");
  displayMaterial = new Material(baseVertexShader, displayShaderSource);
  console.log("Display material created:", displayMaterial);

  // Initialize display material with keywords
  const displayKeywords = [];
  if (SHADING) {
    displayKeywords.push("SHADING");
  }
  console.log("Setting display material keywords:", displayKeywords);
  displayMaterial.setKeywords(displayKeywords);
  console.log("Display material after setting keywords:", {
    activeProgram: displayMaterial.activeProgram,
    uniforms: displayMaterial.uniforms,
    programs: displayMaterial.programs,
  });

  // Initialize framebuffers
  console.log("Initializing framebuffers...");
  initFramebuffers();
  console.log("Framebuffers initialized");

  // Start animation loop
  function animate() {
    if (!gl) {
      console.error("WebGL context not available");
      return;
    }
    if (!copyProgram || !copyProgram.program) {
      console.error("Copy program not initialized");
      return;
    }
    if (!displayMaterial) {
      console.error("Display material not created");
      return;
    }
    if (!displayMaterial.activeProgram) {
      console.error("Display material active program not set");
      return;
    }

    animationFrameId = requestAnimationFrame(animate);
    frameCount.value++;

    const dt = calcDeltaTime();
    updateColors(dt);
    applyInputs();
    step(dt);
    render(null);
  }

  console.log("Starting animation loop...");
  animate();

  // Add event listeners
  $fluid.setupEventListeners(canvas.value);
});

onBeforeUnmount(() => {
  console.log("Component unmounting");
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    console.log("Animation frame cancelled");
  }
  $fluid.removeEventListeners();
  $fluid.resetPointers();
});
</script>
