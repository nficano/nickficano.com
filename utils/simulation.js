import { getSimulationState } from "../simulation";

export function step(dt) {
  const state = getSimulationState();
  const {
    gl,
    velocity,
    divergence,
    curl,
    pressure,
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
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  } = state;

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

export function render(target) {
  const state = getSimulationState();
  const { gl, displayMaterial, dye } = state;

  if (!gl) {
    console.error("WebGL context not available");
    return;
  }

  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.BLEND);
  drawDisplay(target);
}

function drawDisplay(target) {
  const state = getSimulationState();
  const { gl, displayMaterial, dye, SHADING } = state;

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
