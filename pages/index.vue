<template>
  <div class="h-screen overflow-hidden overflow-y-hidden p-0 m-0">
    <client-only>
      <Desktop v-if="!isMobile" />
      <Mobile v-else />
    </client-only>
  </div>
</template>

<script setup>
import {
  useBreakpoints,
  breakpointsTailwind,
  useScrollLock,
} from "@vueuse/core";
import { onMounted } from "vue";

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("md");

// Initialize scroll lock as null
let isLocked = ref(null);

onMounted(() => {
  // Only initialize scroll lock on client side
  isLocked = useScrollLock(document.body);
  isLocked.value = true; // Lock scrolling by default
});
</script>
