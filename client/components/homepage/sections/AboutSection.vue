<template>
  <page-section>
    <page-heading title="About" subtitle="Who am I" />
    <div class="section section-about">
      <div class="container is-size-6 is-size-6-mobile">
        <div class="columns columns-about">
          <div class="column is-8 is-offset-2">
            <p>
              A kind and candid software engineer with experience building,
              developing, and leading motivated teams of developers while
              consistently developing creative solutions for identified business
              problems.
            </p>
            <br />
            <p>
              Passionate about creating efficiencies and instilling a culture of
              humor and collaboration. Trusted as first engineer/employee hire
              at two companies.
            </p>
            <div class="control has-text-centered">
              <a
                href="https://dl.nickficano.com/Nick%20Ficano%20Resume.pdf"
                class="button is-shadowless"
                >Resume</a
              >
            </div>
          </div>
        </div>
      </div>
      <peek name="projects" />
    </div>
  </page-section>
</template>
<script>
import PageSection from '~/components/PageSection.vue'
import Peek from '~/components/Peek.vue'
import PageHeading from '~/components/PageHeading.vue'
export default {
  components: {
    PageSection,
    Peek,
    PageHeading
  }
}
</script>
<style lang="scss"></style>
