import {
  updatePointerDownData,
  updatePointerMoveData,
} from "../utils/pointers";

export default defineNuxtPlugin(() => {
  // Pointers array
  const pointers = [
    {
      id: -1,
      texcoordX: 0,
      texcoordY: 0,
      prevTexcoordX: 0,
      prevTexcoordY: 0,
      deltaX: 0,
      deltaY: 0,
      down: false,
      moved: false,
      color: [0, 0, 0],
    },
  ];

  let canvas = null;

  function setupEventListeners(canvasElement) {
    if (!canvasElement) {
      console.error("No canvas element provided");
      return;
    }
    canvas = canvasElement;
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  }

  function removeEventListeners() {
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
    canvas = null;
  }

  function handleMouseDown(e) {
    if (!canvas) return;
    let pointer = pointers[0];
    let posX = scaleByPixelRatio(e.clientX);
    let posY = scaleByPixelRatio(e.clientY);
    updatePointerDownData(pointer, -1, posX, posY, canvas);
  }

  function handleMouseMove(e) {
    if (!canvas) return;
    let pointer = pointers[0];
    let posX = scaleByPixelRatio(e.clientX);
    let posY = scaleByPixelRatio(e.clientY);
    updatePointerMoveData(pointer, posX, posY, canvas);
  }

  function handleMouseUp() {
    if (!canvas) return;
    let pointer = pointers[0];
    pointer.down = false;
  }

  function handleTouchStart(e) {
    if (!canvas) return;
    const touches = e.targetTouches;
    let pointer = pointers[0];
    for (let i = 0; i < touches.length; i++) {
      let posX = scaleByPixelRatio(touches[i].clientX);
      let posY = scaleByPixelRatio(touches[i].clientY);
      updatePointerDownData(pointer, touches[i].identifier, posX, posY, canvas);
    }
  }

  function handleTouchMove(e) {
    if (!canvas) return;
    const touches = e.targetTouches;
    let pointer = pointers[0];
    for (let i = 0; i < touches.length; i++) {
      let posX = scaleByPixelRatio(touches[i].clientX);
      let posY = scaleByPixelRatio(touches[i].clientY);
      updatePointerMoveData(pointer, posX, posY, canvas);
    }
  }

  function handleTouchEnd(e) {
    if (!canvas) return;
    const touches = e.changedTouches;
    let pointer = pointers[0];
    for (let i = 0; i < touches.length; i++) {
      pointer.down = false;
    }
  }

  function scaleByPixelRatio(input) {
    const pixelRatio = window.devicePixelRatio || 1;
    return Math.floor(input * pixelRatio);
  }

  return {
    provide: {
      fluid: {
        setupEventListeners,
        removeEventListeners,
        pointers,
        getCanvas: () => canvas,
        resetPointers: () => {
          pointers[0] = {
            id: -1,
            texcoordX: 0,
            texcoordY: 0,
            prevTexcoordX: 0,
            prevTexcoordY: 0,
            deltaX: 0,
            deltaY: 0,
            down: false,
            moved: false,
            color: [0, 0, 0],
          };
        },
      },
    },
  };
});
