<template>
  <section style="padding-top: 90px; padding-bottom: 90px">
    <div class="d-flex align-items-center justify-content-center w-100">
      <h1 class="text-align" v-bind:style="{ fontSize: fontSize + 'px' }">
        {{ title }}
      </h1>
    </div>
  </section>
</template>

<script>
export default {
  name: "Title",
  data() {
    return {
      fontSize: 50,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
