<template>
  <div class="container">
    <div class="columns is-mobile">
      <div
        class="column is-11 is-10-desktop is-offset-1-desktop is-offset-1-tablet"
      >
        <div class="columns is-mobile">
          <div
            class="column is-2-desktop is-narrow-widescreen is-narrow-touch is-narrow-fullhd project"
          >
            <icon :name="icon" />
          </div>
          <div class="column is-mobile-9 is-9 project">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/Icon.vue'
export default {
  name: 'Project',
  components: {
    Icon
  },
  props: {
    icon: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.vector {
  display: flex;
  justify-content: center;
}
a:hover {
  color: #ffffff;
}
</style>
