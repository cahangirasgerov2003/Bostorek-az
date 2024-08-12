<template>
  <div>
    <NavBar />
    <RouterView />
    <TheFooter />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<style></style>
