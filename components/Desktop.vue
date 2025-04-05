<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center overflow-hidden relative"
  >
    <div class="absolute inset-0 bg-black/20 backdrop-blur-sm md:hidden"></div>
    <TextHover text="Hello" />
    <MacDock />
  </div>
</template>

<script setup>
import MacDock from "~/components/MacDock.vue";
import TextHover from "~/components/TextHover.vue";
</script>
