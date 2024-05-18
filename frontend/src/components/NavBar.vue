<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container">
      <RouterLink class="navbar-brand" :to="{ name: 'home' }"
        >BOSTOREK</RouterLink
      >
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link" v-bind:to="{ name: 'home' }"
            >Home</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" v-bind:to="{ name: 'books' }"
            >Books</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" v-bind:to="{ name: 'contact' }"
            >Contact Us</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" v-bind:to="{ name: 'login' }"
            >Login</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" v-bind:to="{ name: 'register' }"
            >Register</RouterLink
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "NavBar",
  data() {
    return {};
  },
  components: { RouterLink },
};
</script>

<style scoped>
.custom-navbar {
  background-color: #063547;
  padding: 15px 0;
}

.navbar-brand {
  padding: 0;
  margin: 0;
  color: #ffffff;
  font-weight: bold;
  font-size: 24px;
}

.nav-link {
  padding: 10px 20px !important;
  color: #ffffff;
  text-align: center;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 0.393);
}

.activeLink.nav-link {
  color: rgba(255, 255, 255, 0.393);
}
</style>
