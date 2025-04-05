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
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";
import MacDock from "~/components/MacDock.vue";
import TextHover from "~/components/TextHover.vue";

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("md");
</script>
