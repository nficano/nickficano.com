import { getSimulationState } from "../simulation";
import { generateColor } from "./colors";
import { wrap } from "./colors";

export function updateColors(dt) {
  const state = getSimulationState();
  const { COLOR_UPDATE_SPEED } = state;

  colorUpdateTimer += dt * COLOR_UPDATE_SPEED;
  if (colorUpdateTimer >= 1) {
    colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
    pointers.forEach((p) => {
      p.color = generateColor();
    });
  }
}

export function applyInputs() {
  const state = getSimulationState();
  const { pointers, splatPointer } = state;

  pointers.forEach((p) => {
    if (p.moved) {
      p.moved = false;
      splatPointer(p);
    }
  });
}

export function calcDeltaTime() {
  const state = getSimulationState();
  const { lastUpdateTime } = state;

  let now = Date.now();
  let dt = (now - lastUpdateTime) / 1000;
  dt = Math.min(dt, 0.016666);
  lastUpdateTime = now;
  return dt;
}

export function splatPointer(pointer) {
  const state = getSimulationState();
  const { SPLAT_FORCE } = state;

  let dx = pointer.deltaX * SPLAT_FORCE;
  let dy = pointer.deltaY * SPLAT_FORCE;
  splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
}

export function splat(x, y, dx, dy, color) {
  const state = getSimulationState();
  const { gl, splatProgram, velocity, dye, SPLAT_RADIUS } = state;

  splatProgram.bind();
  gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
  gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
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
  let aspectRatio = canvas.width / canvas.height;
  if (aspectRatio > 1) radius *= aspectRatio;
  return radius;
}
