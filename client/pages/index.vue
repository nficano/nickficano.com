<template>
  <div>
    <full-page id="fullpage" ref="fullpage" :options="options">
      <page-section :class="['fp-section']">
        <div class="hero is-fullheight">
          <div class="hero-body">
            <div class="container has-text-centered has-text-left-mobile">
              <h1 class="title">Software Engineer</h1>
              <h2 class="subtitle">New York City, NY</h2>
            </div>
          </div>
        </div>
      </page-section>
      <page-section :class="['fp-section', 'about']">
        <div class="section">
          <div class="container">
            <h1 class="title">
              About
            </h1>
            <h2 class="subtitle">
              Who am I
            </h2>
          </div>
        </div>
        <div class="section about-body">
          <div class="container">
            <p>
              A kind and candid engineer with experience building, developing,
              and leading motivated teams of developers while consistently
              developing creative solutions for identified business problems.
            </p>
            <br />
            <p>
              Passionate about creating efficiencies and instilling a culture of
              humor and collaboration.
              <strong>Trusted as first engineer/employee</strong> hire at two
              companies.
            </p>
          </div>
          <div class="container">
            <div class="control has-text-centered">
              <a href="#" class="button">Resume</a>
            </div>
          </div>
        </div>
      </page-section>
      <page-section :class="['fp-section']">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Projects</h1>
            <h2 class="subtitle">Things I made</h2>
          </div>
        </div>
      </page-section>
      <page-section :class="['fp-section']">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Blog</h1>
            <h2 class="subtitle">Today I Learned</h2>
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
        anchors: ['hero', 'about', 'projects', 'blog', 'contact'],
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

.button {
  background: transparent;
  color: #ffffff;
  border-radius: 0;
  border: 0.1rem solid #fff;
  padding: 1.2rem 3rem;
  margin-top: 2rem;
}

.about-body {
  margin-top: -2rem;
}
</style>
