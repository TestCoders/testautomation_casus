<template>
  <header class="header" placeholder="placeholder_header" fullwidth id="id_header">
    <div class="header__logo">
      <img @click="navigateToHome" src="../../assets/imtdb.svg" alt="1" id="logo" class="logo">
    </div>
    <div class="header__title">
      <h2>
        <slot></slot>
      </h2>
    </div>
    <ul class="header-menu">
      <li
        class="header-menu__item"
        v-if="!loggedIn">
        <router-link tag="a" id="header_signUp" :to="{name: 'signUp'}">Sign Up</router-link>
      </li>
      <li
        class="header-menu__item"
        v-if="!loggedIn">
        <router-link tag="a" id="header_login" :to="{name: 'login'}">Login</router-link>
      </li>
      <li
        class="header-menu__item"
        v-if="loggedIn">
        <router-link tag="a" id="header_loggedInProfile" :to="{name: 'profile'}">Profile</router-link>
      </li>
      <li
        class="header-menu__item"
        v-if="loggedIn">
        <router-link tag="a" id="header_loggedInLogout" :to="{name: 'logout'}">Logout</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'loggedIn',
    ]),
  },
  methods: {
    navigateToHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
  h2, a {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: normal;
  }

  h2 {
    color: #707070;
  }

  a {
    color: #D0D0D0;
    text-decoration: none;
  }

  ul {
    margin: 0;
  }

  .logo {
    cursor: pointer;
  }

  .header__logo {
    display: inline-block;
  }

  .header__title h2 {
    margin: 0;
  }

  .header-menu {
    display: inline-block;
    text-decoration: none;
  }

  .header-menu__item {
    display: inline-block;
    margin-left: 20px;
  }
</style>
