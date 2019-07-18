<template>
  <div>
    <full-page id="fullpage" ref="fullpage" :options="options">
      <page-section>
        <div class="hero is-fullheight">
          <div class="hero-body">
            <div class="container has-text-centered">
              <h1 class="title">Software Engineer</h1>
              <h2 class="subtitle">New York City, NY</h2>
              <div class="social">
                <icon name="twitter" />
                <icon name="instagram" />
                <icon name="linkedin" />
                <icon name="github" />
              </div>
            </div>
          </div>
          <peek name="about" />
        </div>
      </page-section>
      <page-section>
        <page-heading title="About" subtitle="Who am I" />
        <div class="section section-about ">
          <div class="container is-size-4 is-size-6-mobile">
            <div class="columns">
              <div class="column is-8 is-offset-2">
                <p>
                  A kind and candid engineer with experience building,
                  developing, and leading motivated teams of developers while
                  consistently developing creative solutions for identified
                  business problems.
                </p>
                <br />
                <p>
                  Passionate about creating efficiencies and instilling a
                  culture of humor and collaboration. Trusted as first
                  engineer/employee hire at two companies.
                </p>
                <div class="control has-text-centered">
                  <a href="#" class="button">Resume</a>
                </div>
              </div>
            </div>
          </div>
          <peek name="projects" />
        </div>
      </page-section>
      <page-section>
        <page-heading title="Projects" subtitle="Things I made" />
        <peek name="posts" />
      </page-section>
      <page-section>
        <page-heading title="Posts" subtitle="Today I Learned" />
        <div class="section section-blog">
          <featured-blog-post
            title="Change Mac OS default file associations with this command line utility"
            datetime="2 hours ago"
            brief="How-to coerce all programming related files to open in your preferred text editor by default."
          />
          <div class="control has-text-centered">
            <a href="#" class="button">View All</a>
          </div>
        </div>
        <peek name="contact" />
      </page-section>
      <page-section>
        <page-heading title="Contact" subtitle="Get in touch" />
        <div class="section section-contact">
          <div class="container"></div>
        </div>
      </page-section>
    </full-page>
  </div>
</template>

<script>
import Icon from '~/components/Icon.vue'
import Peek from '~/components/Peek.vue'
import PageSection from '~/components/PageSection.vue'
import PageHeading from '~/components/PageHeading.vue'
import FeaturedBlogPost from '~/components/FeaturedBlogPost.vue'
export default {
  components: {
    Icon,
    FeaturedBlogPost,
    PageSection,
    PageHeading,
    Peek
  },
  data() {
    return {
      options: {
        menu: '#menu',
        anchors: ['hero', 'about', 'projects', 'posts', 'contact'],
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
        scrollHorizontally: false,
        onLeave: function(origin, destination, direction) {
          const destPeek = document.querySelector(`.peek-${destination.anchor}`)
          if (destPeek) {
            destPeek.classList.add('is-unfocused')
          }
          const originPeek = document.querySelector(`.peek-${origin.anchor}`)
          if (originPeek) {
            originPeek.classList.remove('is-unfocused')
          }
        }
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

.section {
  padding: 3rem 1.5rem 0 1.5rem;
}

.section-about {
  padding: 2rem 1.5rem 0 1.5rem;
}

.social {
  display: flex;
  justify-content: center;
}
</style>
