<template>
  <page-section>
    <div class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">say hello</h1>
          <h2 class="subtitle">
            <a href="mailto:nficano@gmail.com">nficano@gmail.com</a>
          </h2>
        </div>
      </div>
    </div>
  </page-section>
</template>
<script>
import PageSection from '~/components/PageSection.vue'
export default {
  components: {
    PageSection
  }
}
</script>
<style lang="scss">
a:hover {
  color: #ffffff;
}
</style>
