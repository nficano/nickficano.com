<template>
  <div class="fixed top-0 left-0 w-screen h-screen bg-black">
    <canvas
      ref="canvas"
      id="fluid"
      class="absolute top-0 left-0 w-full h-full"
      style="z-index: 1"
    />
  </div>
</template>

<script setup>
const { fluid } = useNuxtApp();

const canvas = ref(null);

onMounted(() => {
  if (!canvas.value) {
    console.error("Canvas reference is null");
    return;
  }

  // Set canvas size
  const dpr = window.devicePixelRatio || 1;
  canvas.value.width = window.innerWidth * dpr;
  canvas.value.height = window.innerHeight * dpr;
  canvas.value.style.width = `${window.innerWidth}px`;
  canvas.value.style.height = `${window.innerHeight}px`;

  // Initialize simulation
  initSimulation(canvas.value);

  // Setup event listeners
  fluid.setupEventListeners(canvas.value);

  // Start animation loop
  animate();
});

onUnmounted(() => {
  fluid.removeEventListeners();
});
</script>
