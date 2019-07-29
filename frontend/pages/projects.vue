<template>
  <div>
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

      <project icon="tangerine">
        <a href="https://github.com/nficano/tangerine">
          tangerine - A Flask inspired, decorator based API wrapper for writing
          Slack bots.
        </a>
      </project>

      <project icon="jotonce">
        <a href="https://beta.jotonce.com">
          jotonce - Create anonymous, sharable, password protected notes that
          self-terminate in a few minutes or a few days
        </a>
      </project>

      <project icon="humps">
        <a href="https://github.com/nficano/humps">
          humps - Convert strings (and dictionary keys) between snake case,
          camel case and pascal case in Python. Inspired by Humps for Node
        </a>
      </project>
    </div>
  </div>
</template>

<script>
import Project from '~/components/Project.vue'
import PageHeading from '~/components/PageHeading.vue'
export default {
  components: {
    Project,
    PageHeading
  }
}
</script>

<style lang="scss"></style>
