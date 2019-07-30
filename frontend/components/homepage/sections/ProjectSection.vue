<template>
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
      <div class="control has-text-centered">
        <nuxt-link to="/projects" class="button">More Projects</nuxt-link>
      </div>
    </div>
    <peek name="blog" />
  </page-section>
</template>
<script>
import PageSection from '~/components/PageSection.vue'
import Peek from '~/components/Peek.vue'
import Project from '~/components/Project.vue'
import PageHeading from '~/components/PageHeading.vue'
export default {
  components: {
    PageSection,
    Peek,
    PageHeading,
    Project
  }
}
</script>
<style lang="scss" scoped>
.project {
  padding-bottom: 1.5rem;
}
</style>
