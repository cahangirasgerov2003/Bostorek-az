<template>
  <div class="row mt-5">
    <div
      class="col-sm-6 col-md-4 col-xl-3 mb-5"
      v-for="(book, index) in books"
      :key="index"
    >
      <RouterLink v-bind:to="`/books/` + book.id" style="text-decoration: none">
        <Book :book="book" />
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import Book from "./Book.vue";
export default {
  name: "BookList",
  components: {
    Book,
    RouterLink,
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
