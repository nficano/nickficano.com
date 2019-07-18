<template>
  <div class="section">
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
