<template>
  <div>
    <section class="calculatingHeightSection" v-if="!isLoading">
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
import { useBookStore } from "@/stores/bookStore";
import { mapActions, mapState } from "pinia";
import {
  calculateNumberOfPages,
  limitBooks,
  addRatingsForBook,
} from "@/utility/index.js";
import { useRatingStore } from "@/stores/ratingStore";
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
      current: 1,
      perPage: 4,
    };
  },
  // Computed props
  computed: {
    ...mapState(useBookStore, ["books", "isLoading"]),
    ...mapState(useRatingStore, ["ratings", "requestRatings"]),
    calculateNumberOfPages() {
      return calculateNumberOfPages(this.books, this.perPage);
    },
    limitBooks() {
      return limitBooks(this.current, this.perPage, this.returnSortedBooks);
    },
    returnSortedBooks() {
      return this.books.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
  },

  created() {
    this.fetchRatingsForBook();
  },

  // Methods
  methods: {
    ...mapActions(useRatingStore, ["fetchRatings"]),
    updatePage(page) {
      this.current = page;
    },
    async fetchRatingsForBook() {
      try {
        await this.fetchRatings();
      } catch (error) {
        console.error("An error occurred while fetching ratings", error);
      }
    },
  },

  watch: {
    ratings: {
      handler(newVal) {
        addRatingsForBook(this.books, newVal);
      },
      deep: true,
      immediate: true, // İlk dəfə komponent mount olunanda işə düşməsi üçün
    },
  },
};
</script>

<style scoped></style>
