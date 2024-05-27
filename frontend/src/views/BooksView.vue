<template>
  <section class="calculatingHeightSection">
    <div class="container pt-5">
      <TheHeading :title="title" :desc="desc" />
      <BookList :books="limitBooks" />
      <ThePagination
        :current="current"
        :pages="calculateNumberOfPages"
        @changePage="updatePage"
      />
    </div>
  </section>
</template>

<script>
import TheHeading from "@/components/TheHeading.vue";
import BookList from "@/components/BookList.vue";
import books from "@/data/db.js";
import ThePagination from "@/components/ThePagination.vue";
export default {
  name: "BooksView",
  components: {
    TheHeading,
    BookList,
    ThePagination,
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

  // Methods
  methods: {
    updatePage(page) {
      this.current = page;
    },
  },
};
</script>

<style scoped></style>
