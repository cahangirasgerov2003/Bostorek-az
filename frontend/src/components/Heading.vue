<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <h2 class="fw-bold mb-2">
      {{ title }}
    </h2>
    <p>
      {{ desc }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Heading",
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
