import { ref } from "vue";
import { getWebGLContext } from "~/utils/webgl";
import { initFramebuffers } from "~/utils/framebuffers";
import { createPrograms } from "~/public/shaders/programs";
import { step, render } from "~/utils/simulation";
import { updateColors, applyInputs } from "~/utils/state";

let gl = null;
let ext = null;
let blit = null;

export function useFluidSimulation() {
  const frameCount = ref(0);
  let animationFrameId = null;

  function initSimulation(canvas) {
    // Initialize WebGL context
    const { gl: glContext, ext: extContext } = getWebGLContext(canvas);
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

    // Create shader programs
    const programs = createPrograms(gl, ext);
    ({
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
    } = programs);

    // Initialize framebuffers
    initFramebuffers();
  }

  function cleanupSimulation() {
    if (gl) {
      // Clean up WebGL resources
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  }

  function updateSimulation(dt) {
    updateColors(dt);
    applyInputs();
    step(dt);
    render(null);
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    frameCount.value++;
  }

  return {
    frameCount,
    initSimulation,
    cleanupSimulation,
    updateSimulation,
    animate,
  };
}
