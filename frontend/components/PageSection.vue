<template>
  <div class="fp-section container" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageSection'
}
</script>

<style lang="scss">
@media (max-height: 400px) {
  .fp-section {
    height: auto !important;
  }
}
</style>
