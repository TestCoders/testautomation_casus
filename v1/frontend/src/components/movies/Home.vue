<template>
  <div class="home">
    <v-header>Movies</v-header>
    <section class="cta__container">
      <hr>
      <router-link tag="button" :to="'movies'">List all movies</router-link>
    </section>
    <main class="sneek-preview">
      <div class="sneek-preview__container">
        <h3>Coming soon:</h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/Y6ljFaKRTrI?start=6" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/_variables.scss';

  main {
    min-height: calc(100vh - (#{$header-height + $mid-height})) !important;
    background: $primary-gradient;
  }
</style>
