<template>
  <div class="vector">
    <github-icon v-if="name === 'github'" />
    <instagram-icon v-if="name === 'instagram'" />
    <twitter-icon v-if="name === 'twitter'" />
    <linkedin-icon v-if="name === 'linkedin'" />
  </div>
</template>

<script>
import GithubIcon from '~/public/icon-social-github.svg'
import InstagramIcon from '~/public/icon-social-instagram.svg'
import LinkedinIcon from '~/public/icon-social-linkedin.svg'
import TwitterIcon from '~/public/icon-social-twitter.svg'
export default {
  name: 'Icon',
  components: {
    GithubIcon,
    InstagramIcon,
    LinkedinIcon,
    TwitterIcon
  },
  props: {
    name: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss">
.vector svg {
  margin: 0.5rem;
}
</style>
