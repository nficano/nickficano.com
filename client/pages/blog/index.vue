<template>
  <div>
    <page-heading title="Posts" subtitle="Today I Learned" />
    <div class="section section-blog">
      <featured-blog-post
        title="Change Mac OS default file associations with this command line utility"
        datetime="2 hours ago"
        brief="How-to coerce all programming related files to open in your preferred text editor by default."
      />
    </div>
  </div>
</template>

<script>
import PageHeading from '~/components/PageHeading.vue'
import FeaturedBlogPost from '~/components/FeaturedBlogPost.vue'
export default {
  components: {
    FeaturedBlogPost,
    PageHeading
  }
}
</script>

<style lang="scss"></style>
