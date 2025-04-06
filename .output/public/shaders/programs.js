import { compileShader, createProgram, getUniforms } from "./utils";
import { baseVertexShader } from "./baseVertexShader";
import { copyShader } from "./copyShader";
import { clearShader } from "./clearShader";
import { splatShader } from "./splatShader";
import { advectionShader } from "./advectionShader";
import { divergenceShader } from "./divergenceShader";
import { curlShader } from "./curlShader";
import { vorticityShader } from "./vorticityShader";
import { pressureShader } from "./pressureShader";
import { gradientSubtractShader } from "./gradientSubtractShader";
import { displayShader } from "./displayShader";

export function createPrograms(gl, ext) {
  // Compile base vertex shader
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, baseVertexShader);
  if (!vertexShader) {
    console.error("Failed to compile base vertex shader");
    return null;
  }

  // Compile all fragment shaders
  const copyProgram = createProgram(
    gl,
    vertexShader,
    compileShader(gl, gl.FRAGMENT_SHADER, copyShader)
  );
  const clearProgram = createProgram(
    gl,
    vertexShader,
    compileShader(gl, gl.FRAGMENT_SHADER, clearShader)
  );
  const splatProgram = createProgram(
    gl,
    vertexShader,
    compileShader(gl, gl.FRAGMENT_SHADER, splatShader)
  );
  const advectionProgram = createProgram(
    gl,
    vertexShader,
    compileShader(gl, gl.FRAGMENT_SHADER, advectionShader)
  );
  const divergenceProgram = createProgram(
    gl,
    vertexShader,
    compileShader(gl, gl.FRAGMENT_SHADER, divergenceShader)
  );
  const curlProgram = createProgram(
    gl,
    vertexShader,
    compileShader(gl, gl.FRAGMENT_SHADER, curlShader)
  );
  const vorticityProgram = createProgram(
    gl,
    vertexShader,
    compileShader(gl, gl.FRAGMENT_SHADER, vorticityShader)
  );
  const pressureProgram = createProgram(
    gl,
    vertexShader,
    compileShader(gl, gl.FRAGMENT_SHADER, pressureShader)
  );
  const gradienSubtractProgram = createProgram(
    gl,
    vertexShader,
    compileShader(gl, gl.FRAGMENT_SHADER, gradientSubtractShader)
  );

  // Create display material
  const displayMaterial = new Material(vertexShader, displayShader);

  return {
    copyProgram,
    clearProgram,
    splatProgram,
    advectionProgram,
    divergenceProgram,
    curlProgram,
    vorticityProgram,
    pressureProgram,
    gradienSubtractProgram,
    displayMaterial,
  };
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
      let fragmentShader = compileShader(
        gl.FRAGMENT_SHADER,
        this.fragmentShaderSource,
        keywords
      );
      program = createProgram(this.vertexShader, fragmentShader);
      this.programs[hash] = program;
    }
    if (program === this.activeProgram) return;
    this.uniforms = getUniforms(program);
    this.activeProgram = program;
  }

  bind() {
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
