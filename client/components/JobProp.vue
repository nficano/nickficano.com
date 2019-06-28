<template>
  <div class="column is-half-mobile is-one-third-desktop">
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
  name: 'JobProp',
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
