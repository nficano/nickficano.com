<template>
  <div>
    <div v-fullpage:myFullpage="options">
      <hero-section />
      <about-section />
      <project-section />
      <contact-section />
    </div>
  </div>
</template>

<script>
import AboutSection from '~/components/homepage/sections/AboutSection.vue'
import ContactSection from '~/components/homepage/sections/ContactSection.vue'
import HeroSection from '~/components/homepage/sections/HeroSection.vue'
import ProjectSection from '~/components/homepage/sections/ProjectSection.vue'
export default {
  components: {
    AboutSection,
    ContactSection,
    HeroSection,
    ProjectSection
  },
  data() {
    return {
      options: {
        menu: '#menu',
        anchors: ['hero', 'about', 'projects', 'contact', 'pgp'],
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
        responsiveHeight: 600,
        easingcss3: 'ease',
        licenseKey: '71BA395D-00834D03-A6571AD9-9C5CB62E',
        onLeave: function(origin, destination) {
          // toggle peeks visibility when entering/leaving a section.
          document
            .querySelectorAll(`.peek-${destination.anchor}`)
            .forEach(el => el.classList.add('is-unfocused'))
          document
            .querySelectorAll(`.peek-${origin.anchor}`)
            .forEach(el => el.classList.remove('is-unfocused'))
        }
      }
    }
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

.section {
  padding: 2rem 1.5rem 0 1.5rem;
}
</style>
