<template>
  <section>
    <div class="container pt-5">
      <Heading :title="title" :desc="desc" />
      <BookList :books="limitBooks" />
      <Pagination :current="current" :pages="calculateNumberOfPages" />
    </div>
  </section>
</template>

<script>
import Heading from "@/components/Heading.vue";
import BookList from "@/components/BookList.vue";
import books from "@/data/db.js";
import Pagination from "@/components/Pagination.vue";
export default {
  name: "BooksView",
  components: {
    Heading,
    BookList,
    Pagination,
  },
  data() {
    return {
      title: "Books Categories",
      desc: " There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
      books,
      current: 1,
      perPage: 4,
    };
  },
  // Computed props
  computed: {
    calculateNumberOfPages() {
      return Math.ceil(books.length / this.perPage);
    },
    limitBooks() {
      const startBookNumber = this.current * this.perPage - this.perPage;
      const endBookNumber = startBookNumber + this.perPage;
      return books.slice(startBookNumber, endBookNumber);
    },
  },
};
</script>

<style scoped></style>
