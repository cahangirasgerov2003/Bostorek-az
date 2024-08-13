<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <h2 class="fw-bold mb-3">
      {{ title }}
    </h2>
    <p style="font-size: 18px; margin-bottom: 4px" class="bookDescription">
      {{ desc }}
    </p>
  </div>
</template>

<script>
export default {
  name: "TheHeading",
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

<style scoped>
@media only screen and (max-width: 767px) {
  .bookDescription {
    text-align: center;
  }
}
</style>
