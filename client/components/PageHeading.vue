<template>
  <div
    class="column is-one-third-desktop"
    :class="{ 'is-full-mobile': isFullMobile, 'is-half-mobile': !isFullMobile }"
  >
    <h4 class="title is-4">
      {{ title }}
    </h4>
    <h5 class="subtitle is-5">
      {{ subtitle }}
    </h5>
  </div>
</template>

<script>
export default {
  name: 'Heading',
  props: {
    title: {
      required: true,
      type: String
    },
    subtitle: {
      required: true,
      type: String
    },
    isFullMobile: {
      required: false,
      default: false,
      type: Boolean
    }
  }
}
</script>
