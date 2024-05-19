<template>
  <div class="row mt-5">
    <div
      class="col-sm-6 col-md-4 col-xl-3 mb-5"
      v-for="(book, index) in books"
      :key="index"
    >
      <Book :book="book" />
    </div>
  </div>
</template>

<script>
import Book from "./Book.vue";
export default {
  name: "BookList",
  components: {
    Book,
  },
  props: {
    books: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
