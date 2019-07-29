<template>
  <section>
    <div class="section section-blog">
      <div class="container is-size-6 is-size-6-mobile" v-bind="$attrs">
        <div class="columns">
          <div class="column is-8 is-offset-2" v-bind="$attrs">
            <h2 class="subtitle is-hidden-mobile">{{ published }}</h2>
            <h3 class="title is-3">{{ title }}</h3>
            <article class="shareable is-size-8-mobile" v-html="html" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Prism from 'prismjs'
import shareThis from 'share-this'

import * as twitterSharer from 'share-this/dist/sharers/twitter'
import * as facebookSharer from 'share-this/dist/sharers/facebook'
import * as redditSharer from 'share-this/dist/sharers/reddit'

export default {
  components: {},
  async asyncData({ params }) {
    const post = await import(`~/content/blog/${params.slug}.md`)
    const attr = post.attributes
    const slug = params.slug
    const { published, updated, title } = attr
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    const datePublished = new Date(published)
    const dateUpdated = new Date(updated)
    return {
      title,
      published: datePublished.toLocaleDateString('en-US', dateOptions),
      updated: dateUpdated.toLocaleDateString('en-US', dateOptions),
      slug,
      html: post.html
    }
  },
  mounted() {
    Prism.highlightAll()
    const selectionShare = shareThis({
      selector: '.shareable > :not(pre)',
      sharers: [twitterSharer, facebookSharer, redditSharer]
    })
    selectionShare.init()
  }
}
</script>

<style lang="scss">
.section-blog p {
  padding-bottom: 1.5rem;
}
code {
  background: none;
}
</style>
