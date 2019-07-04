<template>
  <section class="section">
    <div class="container is-widescreen is-fullhd">
      <div class="columns is-multiline is-mobile has-margin-bottom-10">
        <job-prop
          :title="company"
          subtitle="New York, NY"
          :is-full-mobile="true"
        />
        <job-prop :title="title" subtitle="title" :is-full-mobile="true" />
        <job-prop :title="when" subtitle="when" :is-full-mobile="true" />
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
      return dayjs(this.fromDate).format('MMM YYYY')
    },
    endDate: function() {
      return dayjs(this.toDate).format('MMM YYYY')
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
