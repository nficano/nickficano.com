<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: "h-screen overflow-hidden p-0 m-0",
  },
  htmlAttrs: {
    class: " h-screen overflow-hidden p-0 m-0 bg-gray-900",
  },
  title: "Hello |Nick Ficano",
  meta: [
    { name: "robots", content: "noindex, nofollow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});
</script>
