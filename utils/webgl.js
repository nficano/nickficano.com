export function getWebGLContext(canvas) {
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
