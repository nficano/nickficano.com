<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center overflow-hidden"
  >
    <TextHover text="Hello" />
    <MacDock />
  </div>
</template>

<script setup>
import MacDock from "~/components/MacDock.vue";
import TextHover from "~/components/TextHover.vue";
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
