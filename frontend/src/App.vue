<template>
  <div>
    <NavBar />
    <RouterView />
    <TheFooter />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import TheFooter from "./components/TheFooter.vue";
export default {
  name: "App",
  components: {
    NavBar,
    TheFooter,
  },
};
</script>

<style></style>
