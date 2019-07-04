<template>
  <div>
    <section class="hero is-fullheight is-viewheight-fix">
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
      location="New York, NY"
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
        'Node.js',
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
            Responsible for architecting and implementing the company's
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
      title="Founder"
      company="JotOnce"
      location="New York, NY"
      :from-date="new Date(2010, 6, 1)"
      :is-currently-working-here="true"
      :stack="['Python', 'Flask', 'Node.js', 'Nuxt.js', 'PostgreSQL']"
    >
      <template v-slot:description>
        Independently developed and designed a successful web application for
        quickly creating password-protected and shareable notes, garnering two
        acquisition offers in the past 12 months and features in
        <a
          href="https://lifehacker.com/jotonce-is-a-password-protected-web-based-scratch-pad-5678479"
          target="_blank"
          class="is-primary"
          >LifeHacker</a
        >
        and
        <a
          href="https://gigaom.com/2010/09/13/jotonce-password-protected-shareable-notes/"
          target="_blank"
          class="is-primary"
          >GigaOM</a
        >. Currently rewriting
        <a href="https://beta.jotonce.com" target="_blank">beta</a>.
        <ul>
          <li>
            Research UI design patterns and principles in an effort to create
            the most intuitive user experience possible.
          </li>
          <li>
            Solicit user feedback and designer insights, and continuously
            iterate on the design to improve UI/UX.
          </li>
          <li>
            Integrated site with session replay tools, heat maps, and an A/B
            testing framework to optimize UX.
          </li>
        </ul>
      </template>
    </resume-item>
    <resume-item
      title="Senior Engineer"
      company="Keep.com"
      location="New York, NY"
      :from-date="new Date(2012, 4, 1)"
      :to-date="new Date(2016, 0, 1)"
      :is-currently-working-here="false"
      :stack="[
        'Python',
        'Flask',
        'Node.js',
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
    <resume-item
      title="Freelance Developer"
      company="3atmospheres"
      location="New York, NY"
      :from-date="new Date(2011, 6, 1)"
      :to-date="new Date(2012, 5, 1)"
      :is-currently-working-here="false"
      :stack="['Python', 'Django', 'Solr']"
    >
      <template v-slot:description>
        <div>
          <ul>
            <li>
              Created curated restaurant discovery
              <a
                href="https://www.crunchbase.com/organization/taste-savant#section-overview"
                target="_blank"
                >website</a
              >, heavily integrated with Facebook, Twitter, and Foursquare.
            </li>
            <li>
              Developed backend infrastructure and REST-API for Instagram-like
              <a
                href="https://www.crunchbase.com/organization/trendabl"
                target="_blank"
                >iPhone application</a
              >
              geared towards fashion.
            </li>
          </ul>
        </div>
      </template>
    </resume-item>

    <resume-item
      title="Lead Engineer"
      company="OneReceipt (Acquired by Ebates)"
      location="New York, NY"
      :from-date="new Date(2010, 12, 1)"
      :to-date="new Date(2011, 6, 1)"
      :is-currently-working-here="false"
      :stack="['Django', 'Celery', 'MongoDB', 'Solr', 'AWS']"
    >
      <template v-slot:description>
        <div>
          <ul>
            <li>
              Hired as the first employee at OneReceipt (acquired by Ebates), a
              tool that scans an email inbox for purchase-related emails, then
              parses, organizes, and generates detailed analytics on such
              purchases.
            </li>
            <li>
              Bootstrapped complete infrastructure, from a pluggable,
              email-parsing and ingestion framework to a DataMapper system that
              evaluated and transformed message content into a structured
              format.
            </li>
          </ul>
        </div>
      </template>
    </resume-item>

    <resume-item
      title="Co-Founder/Engineer"
      company="2Sprout, LLC"
      location="New Haven, CT"
      :from-date="new Date(2008, 7, 1)"
      :to-date="new Date(2010, 5, 1)"
      :is-currently-working-here="false"
      :stack="['Django', 'PostgreSQL']"
    >
      <template v-slot:description>
        <div>
          <ul>
            <li>
              Designed and implemented server-side infrastructure, including the
              website, for platform focused on creating a universal and open
              prototype for real-time, semi-structured data aggregation.
            </li>
            <li>
              Researched data organization systems, taxonomies, and
              classification schemes, and experimented with various compression
              and transmission techniques.
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

.is-viewheight-fix {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}

strong {
  border-bottom: 3px solid #fbc91b;
}
</style>
