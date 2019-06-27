<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered has-text-left-mobile">
          <h1 class="title">
            Passionate Software Engineer
            <br />
            Top-15
            <span class="is-hidden-mobile">Github</span> Python
            <span class="is-hidden-touch">developers</span>
            <span class="is-hidden-desktop">devs</span>
            in
            <span class="is-hidden-tablet-only">
              New York City.
            </span>
            <span class="is-hidden-mobile is-hidden-desktop">NYC.</span>
            <br />
            First hire at two companies.
          </h1>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container"></div>
      </div>
    </section>
    <resume-item
      title="Lead Engineer"
      company="Simple Health"
      location="Greater New York City Area"
      :from-date="new Date(2016, 0, 15)"
      :is-currently-working-here="true"
      :stack="[
        'Ansible',
        'AWS Lambda',
        'Express',
        'Flask',
        'GraphQL',
        'JavaScript',
        'Jest',
        'MySQL',
        'NodeJS',
        'OpenCV',
        'PyTest',
        'Python',
        'React',
        'Travis CI'
      ]"
    >
      <template v-slot:description>
        <div>
          <p>
            Responsible for architecting and implementing company's
            <strong>backend infrastructure</strong>, setting up first servers
            and databases, performing all data modeling, and planning management
            and storage of users, order, and product data. Lead the
            <strong>full software development lifecycle</strong>, and managed a
            team of developers responsible for the web administration system.
          </p>
          <ul>
            <li>
              Act as <strong>product owner</strong> for task system that enabled
              customer service representatives to process orders correctly and
              efficiently, responsible for managing product strategy and
              developing the technical roadmap.
            </li>
            <li>
              Developed web administration system, enabling product inventory
              management, order receipt and tracking, and real-time messaging
              for customer support to communicate with customers via email and
              SMS.
            </li>
            <li>
              Collaborate closely with customer support, marketing, and product
              teams to <strong>identify requirements</strong>, inefficiencies,
              and preferred features to develop solutions.
            </li>
            <li>
              Bootstrapped <strong>provisionally patented</strong> vision engine
              that performs real-time facial distance detection using a mobile
              phone or web camera, allowing users to take eye tests remotely
              without the presence of a physician.
            </li>
            <li>
              Developed image processing pipeline to analyze incoming images and
              PDFs, apply various transforms such as perspective and orientation
              correction, and then re-encoding it back to our cloud storage
              service.
            </li>
            <li>
              Built Slackbot that significantly
              <strong>streamlined operations</strong> and improved network
              security, including permitting user-friendly firewall rule
              management and providing secure access to production snapshot for
              local development.
            </li>
            <li>
              Performed data extraction and analysis, and used variance and
              standard deviation <strong>statistics</strong> to optimize
              customer retention.
            </li>
          </ul>
        </div>
      </template>
    </resume-item>
    <resume-item
      title="Senior Engineer"
      company="Keep"
      location="Greater New York City Area"
      :from-date="new Date(2012, 4, 1)"
      :to-date="new Date(2016, 0, 1)"
      :is-currently-working-here="false"
      :stack="[
        'Python',
        'Flask',
        'NodeJS',
        'JavaScript',
        'PostgreSQL',
        'Chef',
        'Vagrant',
        'Redis',
        'RabbitMQ',
        'Celery'
      ]"
    >
      <template v-slot:description>
        <div>
          <p>
            Developed backend infrastructure and API layer that powered
            interactive curated product discovery iOS and Android mobile app for
            fashion, home decor, and design shopping.
          </p>
          <ul>
            <li>
              Developed interactive tool for testing internal API layer, which
              streamlined mobile feature development, aided debugging efforts,
              and improved collaboration between server side and client side
              teams.
            </li>
            <li>
              Rewrote and managed universal cart order fulfillment system,
              transforming a confusing page requiring heavy training to a simple
              wizard-based workflow system that created steps based on
              conditional order logic.
            </li>
          </ul>
        </div>
      </template>
    </resume-item>
  </div>
</template>

<script>
import ResumeItem from '~/components/ResumeItem.vue'
export default {
  components: {
    ResumeItem
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
</script>

<style lang="scss" scoped>
.hero-head {
  padding-top: 2rem;
}
</style>
