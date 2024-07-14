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
import { useBookStore } from "../stores/bookStore";
import { mapState } from "pinia";
import { calculateNumberOfPages, limitBooks } from "@/utility/index.js";
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
      perPage: 8,
    };
  },
  // Computed props
  computed: {
    ...mapState(useBookStore, ["books", "isLoading"]),
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

  // Burda bir xeta olacaq cunki biz home-da fetch atiriq burda yox amma bir basa biz books
  // Seyfesine kecdiyimizde o zaman burda actions olmadigi ucun ve home-a girmediyimiz ucun |
  // Kitablari elde ede bilmeyeceyik bunun yerine actions-i main.js de proje acilan zaman calisdirsaq daha
  // Yaxsi olacaq bizim ucun

  // Methods
  methods: {
    updatePage(page) {
      this.current = page;
    },
  },
};
</script>

<style scoped></style>
