<template>
  <Title v-bind:title="title" />
</template>

<script>
import Title from "@/components/Title.vue";
export default {
  name: "ContactView",
  components: {
    Title,
  },
  data() {
    return {
      title: "Contact us",
    };
  },
};
</script>

<style scoped></style>
