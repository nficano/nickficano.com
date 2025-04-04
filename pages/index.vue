<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center overflow-hidden relative"
  >
    <video
      autoplay
      loop
      muted
      playsinline
      class="absolute inset-0 w-full h-full object-cover opacity-30 md:hidden"
    >
      <source
        src="https://s3.us-east-1.amazonaws.com/assets.nickficano.com/blepharisma-musculus.webm"
        type="video/webm"
      />
    </video>
    <div class="absolute inset-0 bg-black/20 backdrop-blur-sm md:hidden"></div>
    <TextHover text="Hello" />
    <MacDock />
  </div>
</template>

<script setup>
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";
import MacDock from "~/components/MacDock.vue";
import TextHover from "~/components/TextHover.vue";

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("md");
</script>

<style>
html,
body {
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
