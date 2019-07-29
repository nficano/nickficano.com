<template>
  <div class="vector">
    <github-icon v-if="name === 'github'" />
    <instagram-icon v-if="name === 'instagram'" />
    <twitter-icon v-if="name === 'twitter'" />
    <linkedin-icon v-if="name === 'linkedin'" />
    <dotfiles v-if="name === 'dotfiles'" />
    <humps v-if="name === 'humps'" />
    <jotonce v-if="name === 'jotonce'" />
    <python-lambda v-if="name === 'python-lambda'" />
    <pytube v-if="name === 'pytube'" />
    <tangerine v-if="name === 'tangerine'" />
    <star-icon v-if="name === 'star'" />
  </div>
</template>

<script>
import GithubIcon from '~/public/icon-social-github.svg'
import InstagramIcon from '~/public/icon-social-instagram.svg'
import LinkedinIcon from '~/public/icon-social-linkedin.svg'
import TwitterIcon from '~/public/icon-social-twitter.svg'
import Dotfiles from '~/public/logo-dotfiles.svg'
import Humps from '~/public/logo-humps.svg'
import Jotonce from '~/public/logo-jotonce.svg'
import PythonLambda from '~/public/logo-python-lambda.svg'
import Pytube from '~/public/logo-pytube.svg'
import Tangerine from '~/public/logo-tangerine.svg'
import StarIcon from '~/public/icon-star.svg'

export default {
  name: 'Icon',
  components: {
    GithubIcon,
    InstagramIcon,
    LinkedinIcon,
    TwitterIcon,
    Dotfiles,
    Humps,
    Jotonce,
    PythonLambda,
    Pytube,
    Tangerine,
    StarIcon
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
