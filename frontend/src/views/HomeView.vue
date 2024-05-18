<template>
  <Title :title="title" />
</template>

<script>
import Title from "@/components/Title.vue";
export default {
  name: "HomeView",
  components: {
    Title,
  },
  data() {
    return {
      title: "Home",
    };
  },
};
</script>

<style scoped></style>
