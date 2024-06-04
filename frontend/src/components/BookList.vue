<template>
  <div class="row mt-5">
    <div
      class="col-sm-6 col-md-4 col-xl-3 mb-5"
      v-for="(book, index) in books"
      :key="index"
    >
      <RouterLink v-bind:to="`/books/` + book._id">
        <BookItem :book="book" />
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import BookItem from "./BookItem.vue";
export default {
  name: "BookList",
  components: {
    BookItem,
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
