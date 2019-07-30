<template>
  <div class="section is-paddingless-mobile">
    <div class="container" v-bind="$attrs">
      <h1 class="title">{{ title }}</h1>
      <h2 class="subtitle">{{ subtitle }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturedBlogPost',
  props: {
    title: {
      required: true,
      type: String
    },
    subtitle: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss">
.title {
  opacity: 0;
  animation: 200ms ease-out 0.5s 1 title-slide-up;
  animation-fill-mode: both;
}

.subtitle {
  opacity: 0;
  animation: 200ms ease-out 0.8s 1 subtitle-slide-down;
  animation-fill-mode: both;
}
</style>
