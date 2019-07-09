<template>
  <div>
    <full-page id="fullpage" ref="fullpage" :options="options">
      <page-section :class="['hero', 'is-fullheight', 'is-viewheight-fix']">
        <div class="hero-body">
          <div class="container has-text-centered has-text-left-mobile">
            <h1 class="title">Software Engineer</h1>
            <h2 class="subtitle">New York City, NY</h2>
          </div>
        </div>
      </page-section>
      <page-section :class="['fp-section']">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">About</h1>
            <h2 class="subtitle">Who I am</h2>
          </div>
        </div>
      </page-section>
      <page-section :class="['fp-section']">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Resume</h1>
            <h2 class="subtitle">What I do</h2>
          </div>
        </div>
      </page-section>
      <page-section :class="['fp-section']">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Projects</h1>
            <h2 class="subtitle">What I built</h2>
          </div>
        </div>
      </page-section>
      <page-section :class="['fp-section']">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Blog</h1>
            <h2 class="subtitle">What I think</h2>
          </div>
        </div>
      </page-section>
      <page-section :class="['fp-section']">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">contact</h1>
            <h2 class="subtitle">Get in touch</h2>
          </div>
        </div>
      </page-section>
    </full-page>
  </div>
</template>

<script>
import PageSection from '~/components/PageSection.vue'
export default {
  components: {
    PageSection
  },
  data() {
    return {
      options: {
        menu: '#menu',
        anchors: ['hero', 'forward', 'resume', 'blog'],
        sectionSelector: '.fp-section',
        verticalCentered: false,
        css3: true,
        navigation: true,
        navigationPosition: 'right',
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        licenseKey: '71BA395D-00834D03-A6571AD9-9C5CB62E',
        scrollHorizontallyKey: '82FBEF60-E1BF40C7-B2DE869C-5420175B',
        scrollHorizontally: false
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
</script>

<style lang="scss">
.fp-tableCell {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
