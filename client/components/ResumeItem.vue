<template>
  <section class="section">
    <div class="container is-widescreen is-fullhd has-margin-top-20">
      <div class="columns is-multiline is-mobile has-margin-bottom-20">
        <job-prop :title="company" subtitle="New York, NY" />
        <job-prop :title="title" subtitle="title" />
        <job-prop :title="when" subtitle="when" />
      </div>
    </div>
    <div class="container is-widescreen is-fullhd">
      <div class="content is-size-5-mobile">
        <slot name="description"></slot>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs'
import JobProp from '~/components/JobProp.vue'
export default {
  name: 'ResumeItem',
  components: {
    JobProp
  },
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
      return dayjs(this.fromDate).format('MMM YY')
    },
    endDate: function() {
      return dayjs(this.toDate).format('MMM YY')
    },
    when: function() {
      return `${this.startDate} – ${
        this.isCurrentlyWorkingHere ? 'PRESENT' : this.endDate
      }`
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-head {
  padding-top: 2rem;
}
</style>
