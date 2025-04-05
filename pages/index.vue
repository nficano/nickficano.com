<template>
  <div class="h-screen overflow-hidden overflow-y-hidden p-0 m-0">
    <client-only>
      <Desktop v-if="!isMobile" />
      <Mobile v-else />
    </client-only>
  </div>
</template>

<script setup>
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("md");
</script>
