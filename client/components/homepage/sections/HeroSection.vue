<template>
  <page-section>
    <div class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered is-hidden-when-inactive">
          <h1 class="title">Nick Ficano</h1>
          <h2 class="subtitle">New York, NY &ndash; Software Engineer</h2>
          <div class="social">
            <a href="https://twitter.com/nficano" target="_blank">
              <icon name="twitter" />
            </a>
            <a href="https://www.instagram.com/nficano/" target="_blank">
              <icon name="instagram" />
            </a>
            <a href="https://www.linkedin.com/in/nficano/" target="_blank">
              <icon name="linkedin" />
            </a>
            <a href="https://github.com/nficano" target="_blank">
              <icon name="github" />
            </a>
          </div>
        </div>
      </div>
      <peek name="about" />
    </div>
  </page-section>
</template>
<script>
import PageSection from '~/components/PageSection.vue'
import Icon from '~/components/Icon.vue'
import Peek from '~/components/Peek.vue'
export default {
  components: {
    PageSection,
    Icon,
    Peek
  }
}
</script>

<style lang="scss">
a {
  svg {
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    svg {
      transform: scale(1.3);
    }
  }
}
.social {
  display: inline-flex;
  justify-content: center;
}
.hero.is-fullheight .hero-body > .is-hidden-when-inactive {
  transition: all 0.2s ease-in-out;
  opacity: 0;
}
.active > .hero.is-fullheight .hero-body > .is-hidden-when-inactive {
  transition: all 0.2s ease-in-out;
  opacity: 1;
}
</style>
