<template>
  <div class="container">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-end">
        <div class="navbar-brand">
          <a class="navbar-item" href="/"><logo /></a>
        </div>
      </div>
    </nav>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Software Engineer<br />
            and top 15 Python developers<br />
            in New York City by GitHub Stargazers.
          </h1>
          <h2 class="subtitle">Source</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Logo from '~/public/logo.svg'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped></style>
