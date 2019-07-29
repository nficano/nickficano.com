<template>
  <page-section>
    <page-heading title="Blog" subtitle="Today I Learned" />
    <div class="section section-blog">
      <featured-blog-post
        title="Change Mac OS default file associations with this command line utility"
        datetime="2 hours ago"
        brief="How-to coerce all programming related files to open in your preferred text editor by default."
        slug="change-macos-default-file-associations-command-line-duti"
      />
      <div class="control has-text-centered">
        <nuxt-link to="/blog" class="button">More Posts</nuxt-link>
      </div>
    </div>
    <peek name="contact" />
  </page-section>
</template>
<script>
import Peek from '~/components/Peek.vue'
import PageSection from '~/components/PageSection.vue'
import PageHeading from '~/components/PageHeading.vue'
import FeaturedBlogPost from '~/components/FeaturedBlogPost.vue'
export default {
  components: {
    PageSection,
    FeaturedBlogPost,
    Peek,
    PageHeading
  }
}
</script>
