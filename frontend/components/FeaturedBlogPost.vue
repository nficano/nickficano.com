<template>
  <div class="container is-size-6 is-size-6-mobile" v-bind="$attrs">
    <div class="columns">
      <div class="column is-8 is-offset-2" v-bind="$attrs">
        <h2 class="subtitle is-hidden-mobile">{{ datetime }}</h2>
        <h3 class="title is-3">
          <a :href="`blog/${slug}`">{{ title }}</a>
        </h3>
        <p class="is-size-8-mobile">
          {{ brief }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPreview',
  props: {
    title: {
      required: true,
      type: String
    },
    datetime: {
      required: true,
      type: String
    },
    brief: {
      required: true,
      type: String
    },
    slug: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-family: 'Bebas';
  color: #8e8e93;
  font-weight: 100;
}

.subtitle {
  margin-bottom: 2rem;
}

.subtitle,
.title {
  opacity: 1;
  animation: none;
}
.container {
  margin-top: 2rem;
  letter-spacing: 0.03rem;
}
p {
  margin-bottom: 0rem;
}
</style>
