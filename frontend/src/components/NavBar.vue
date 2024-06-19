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
        <li class="nav-item" v-if="isLoggedIn">
          <RouterLink class="nav-link" v-bind:to="{ name: 'dashboard' }"
            >Dashboard</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" v-bind:to="{ name: 'contact' }"
            >Contact Us</RouterLink
          >
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button class="nav-link" @click="logout">Logout</button>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <RouterLink class="nav-link" v-bind:to="{ name: 'login' }"
            >Login</RouterLink
          >
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
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
import { useAuthStore } from "@/stores/authStore.js";
import { mapState, mapActions } from "pinia";

export default {
  name: "NavBar",
  data() {
    return {};
  },
  components: { RouterLink },
  computed: {
    ...mapState(useAuthStore, ["isLoggedIn"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logoutAccount"]),

    logout() {
      this.logoutAccount();
    },
  },
};
</script>

<style scoped>
.custom-navbar {
  background-color: var(--primary-color);
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
  color: var(--navbar-hoverColor);
}

.activeLink.nav-link {
  color: var(--navbar-hoverColor);
}
</style>
