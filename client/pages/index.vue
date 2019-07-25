<template>
  <div>
    <full-page id="fullpage" ref="fullpage" :options="options">
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
      <page-section>
        <page-heading title="About" subtitle="Who am I" />
        <div class="section section-about">
          <div class="container is-size-5 is-size-6-mobile">
            <div class="columns columns-about">
              <div class="column is-8 is-offset-2">
                <p>
                  A kind and candid software engineer with experience building,
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
                  <a
                    href="https://dl.nickficano.com/Nick%20Ficano%20Resume.pdf"
                    class="button is-shadowless"
                    >Resume</a
                  >
                </div>
              </div>
            </div>
          </div>
          <peek name="projects" />
        </div>
      </page-section>
      <page-section>
        <page-heading title="Projects" subtitle="Things I made" />
        <div class="section section-projects">
          <project icon="pytube">
            <a href="https://github.com/nficano/pytube">
              pytube - A lightweight, dependency-free Python library (and
              command-line utility) for downloading YouTube Videos.
            </a>
          </project>

          <project icon="python-lambda">
            <a href="https://github.com/nficano/python-lambda">
              python-lambda - A toolkit for developing and deploying serverless
              Python code in AWS Lambda.
            </a>
          </project>

          <project icon="tangerine" :class="['is-hidden-mobile']">
            <a href="https://github.com/nficano/tangerine">
              tangerine - A Flask inspired, decorator based API wrapper for
              writing Slack bots.
            </a>
          </project>
          <div class="control has-text-centered">
            <nuxt-link to="/projects" class="button">More Projects</nuxt-link>
          </div>
        </div>
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
            <nuxt-link to="/blog" class="button">More Posts</nuxt-link>
          </div>
        </div>
        <peek name="contact" />
      </page-section>
      <page-section>
        <div class="hero is-fullheight">
          <div class="hero-body">
            <div class="container has-text-centered">
              <h1 class="title">say hello</h1>
              <h2 class="subtitle">nficano@gmail.com</h2>
            </div>
          </div>
        </div>
      </page-section>
    </full-page>
  </div>
</template>

<script>
import Icon from '~/components/Icon.vue'
import Peek from '~/components/Peek.vue'
import Project from '~/components/Project.vue'
import PageSection from '~/components/PageSection.vue'
import PageHeading from '~/components/PageHeading.vue'
import FeaturedBlogPost from '~/components/FeaturedBlogPost.vue'
export default {
  components: {
    Icon,
    FeaturedBlogPost,
    PageSection,
    PageHeading,
    Peek,
    Project
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
        },
        afterLoad: function(origin, destination, direction) {
          const dest = document.querySelector(`.columns-${destination.anchor}`)
          if (dest) {
            dest.classList.remove('is-action-potential')
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}
.page-enter,
.page-leave-active {
  opacity: 0;
  transform-origin: 50% 50%;
}
.hero.is-fullheight .hero-body > .is-hidden-when-inactive {
  transition: all 0.2s ease-in-out;
  opacity: 0;
}
.active > .hero.is-fullheight .hero-body > .is-hidden-when-inactive {
  transition: all 0.2s ease-in-out;
  opacity: 1;
}
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
  display: inline-flex;
  justify-content: center;
}

.project {
  padding-bottom: 1.5rem;
}
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
</style>
