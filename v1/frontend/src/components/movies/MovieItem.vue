<template>
  <li>
    <div class="movie__image-container">
      <div class="movie__image-box">
        <router-link
          tag="a"
          :to="{ name: 'movie', params: { imdbId: movie.imdb }}">
          <img v-if="movie.image"
            :src="movie.image"
            :alt="movie.image"
            class="movie__image">
          <img v-if="!movie.image"
            src="../../assets/movie_posters/no-poster.png"
            alt="No movie image available"
            class="movie__image">
        </router-link>
      </div>
    </div>
    <div class="movie__details">
      <h3 id='movie__title'>{{movie.title}}</h3>
      <p id="movie__description">{{movie.description}}</p>
      <router-link
        tag="button"
        :to="{ name: 'movie', params: { imdbId: movie.imdb }}"
        v-if="loggedIn">more...
      </router-link>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'movieItem',
  props: ['movie'],
  computed: {
    ...mapGetters([
      'loggedIn',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/_variables.scss';

  li {
    display: flex;
    margin: 50px -26px;
    padding: 26px;
    background: $primary-gradient;
    list-style-type: none;
  }

  .movie__image-container {
    flex: 1 0 auto;
    width: 250px;
    max-width: 250px;

    .movie__image-box {
      position: relative;
      overflow: hidden;
      height: 0;
      padding-top: 297px / 210px * 100%;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .movie__details {
    position: relative;
    width: 100%;
    padding-left: 26px;

    h3 {
      margin-top: 0;
    }

    button {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 35px;
      height: 35px;
      padding: 0;
      color: $white;
      background: url('../../assets/icons/baseline-expand_more-24px.svg') no-repeat center;
      border: solid 1px #000;
      outline: none;
      border-radius: 50%;
      text-indent: -100000px;
    }
  }
</style>
