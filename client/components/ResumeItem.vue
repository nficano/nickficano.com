<template>
  <section class="hero is-fullheight">
    <div class="hero-head">
      <div class="container">
        <div class="columns">
          <div class="column is-hidden-mobile">
            <h1 class="title is-4">{{ company }}</h1>
            <h2 class="subtitle is-6">{{ location }}</h2>
            <div class="is-size-7">
              <h2 class="subtitle is-6 is-marginless">Stack</h2>
              <ul class="stack">
                <li v-for="item in stack.slice().sort()" :key="item">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <div class="column is-two-thirds-desktop is-two-thirds-tablet">
            <div class="columns">
              <div class="column">
                <h2 class="subtitle is-7">Title</h2>
                <h1 class="title is-5">{{ title }}</h1>
              </div>
              <div class="column">
                <h2 class="subtitle is-7">When</h2>
                <h1 class="title is-5">
                  {{ startDate }} &ndash;
                  <span v-if="!isCurrentlyWorkingHere">{{ endDate }}</span>
                  <span v-else>PRESENT</span>
                </h1>
              </div>
            </div>
            <div class="content is-size-7">
              <slot name="description"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'ResumeItem',
  props: {
    title: {
      required: true,
      type: String
    },
    company: {
      required: true,
      type: String
    },
    location: {
      required: true,
      type: String
    },
    fromDate: {
      required: true,
      type: Date
    },
    toDate: {
      required: false,
      type: Date,
      default: null
    },
    stack: {
      required: true,
      type: Array
    },
    isCurrentlyWorkingHere: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    startDate: function() {
      return dayjs(this.fromDate).format('MMM YYYY')
    },
    endDate: function() {
      return dayjs(this.toDate).format('MMM YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-head {
  padding-top: 2rem;
}
</style>
