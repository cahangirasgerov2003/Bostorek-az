<template>
  <div>
    <section class="calculatingHeightSection" v-if="!loading">
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
    <section class="mb-5 calculatingHeightSection" v-else>
      <div
        class="container pt-5 d-flex justify-content-center align-items-center loadingStyle"
      >
        <font-awesome-icon icon="spinner" spin-pulse style="font-size: 40px" />
      </div>
    </section>
  </div>
</template>

<script>
import TheHeading from "@/components/TheHeading.vue";
import BookList from "@/components/BookList.vue";
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
      books: [],
      current: 1,
      perPage: 8,
      loading: true,
    };
  },
  // Computed props
  computed: {
    calculateNumberOfPages() {
      return Math.ceil(this.books.length / this.perPage);
    },
    limitBooks() {
      const startBookNumber = this.current * this.perPage - this.perPage;
      const endBookNumber = startBookNumber + this.perPage;
      return this.books.slice(startBookNumber, endBookNumber);
    },
  },

  // Methods
  methods: {
    updatePage(page) {
      this.current = page;
    },

    async fetchBooks() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/books");
        const data = await response.json();
        this.loading = false;
        this.books = data.books;
      } catch (error) {
        console.error("An error occurred while fetching books", error);
      }
    },
  },

  created() {
    this.fetchBooks();
  },
};
</script>

<style scoped></style>
