<template>
  <!-- <div> -->
  <section :class="{ calculatingHeightSection: !book, 'mb-5 mt-3': book }">
    <div class="container pt-5" v-if="book">
      <TheHeading :title="title" :desc="desc + ' ' + book.title" />
      <RouterLink
        to="/books"
        class="btn px-4 mt-3 mb-5 text-white btn-left-arrow"
      >
        <font-awesome-icon icon="left-long" size="xl" />
      </RouterLink>
      <div class="row">
        <div class="col-lg-6">
          <img
            src="@/assets/images/joker.jpg"
            alt="Best book"
            class="editImage"
          />
        </div>
        <div class="col-lg-6">
          <div class="textOverflow" style="margin-bottom: 30px">
            <p class="lead bookDetailDesc">
              {{ book.description }}
            </p>
          </div>

          <!-- About book table -->
          <AboutBookTable :book="book" />

          <!-- Comment carusel -->
          <CommentsCarusel />
        </div>

        <div v-if="isLoggedIn">
          <!-- Rate section -->
          <RateSection :getParamsId="getParamsId" />

          <div class="my-3">
            <hr style="color: var(--primary-color)" />
          </div>

          <!-- Comment section -->
          <AddCommentSection :getParamsId="getParamsId" />
        </div>
        <div class="col-6 mt-4" v-else>
          <router-link to="/login">
            <div class="alert alert-info py-3">
              You must be logged in to add comments and ratings about the book !
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="w-100 d-flex justify-content-center" v-else>
      <img alt="notFound" src="@/assets/images/notFound.avif" />
    </div>
  </section>
</template>

<script>
import TheHeading from "@/components/TheHeading.vue";
import AddCommentSection from "@/components/bookDetail/AddCommentSection.vue";
import RateSection from "@/components/bookDetail/RateSection.vue";
import AboutBookTable from "@/components/bookDetail/AboutBookTable.vue";
import CommentsCarusel from "@/components/bookDetail/CommentsCarusel.vue";
import { RouterLink } from "vue-router";
import { useBookStore } from "../stores/bookStore.js";
import { useAuthStore } from "../stores/authStore.js";
import { useCommentStore } from "../stores/commentStore.js";
import { useRatingStore } from "../stores/ratingStore.js";
import { mapState, mapActions } from "pinia";
export default {
  name: "BookDetailView",
  data() {
    return {
      title: "Book Detail",
      desc: "About the book of",
      book: null,
    };
  },
  components: {
    TheHeading,
    RouterLink,
    AddCommentSection,
    RateSection,
    AboutBookTable,
    CommentsCarusel,
  },
  created() {
    const bookId = this.getParamsId;

    this.book = this.selectABook(bookId);

    this.fetchCommentsForBook(bookId);

    this.fetchRatingsForBook(bookId);
  },
  methods: {
    ...mapActions(useCommentStore, ["fetchCommentsForBook"]),
    ...mapActions(useRatingStore, ["fetchRatingsForBook"]),
  },
  computed: {
    ...mapState(useBookStore, ["selectABook"]),
    ...mapState(useAuthStore, ["isLoggedIn"]),

    getParamsId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped>
.editImage {
  width: 100%;
  height: 745px;
  object-fit: cover;
  border-radius: 5px;
}

.textOverflow {
  max-height: 190px;
  overflow-y: auto;
}

.bookDetailDesc {
  text-align: justify;
  margin-bottom: 0;
  padding-right: 16px;
}

.btn-left-arrow {
  background-color: var(--primary-color);
  transition: all 0.4s;
}
.btn-left-arrow:hover {
  background-color: var(--secondary-color);
}

@media only screen and (max-width: 991px) {
  .bookDetailDesc {
    margin-top: 10px;
    padding-right: 0;
    text-align: center;
  }
  .editImage {
    max-height: 600px;
    width: 100%;
    object-fit: contain;
    margin-bottom: 15px;
  }
}

@media only screen and (max-width: 485px) {
  .editImage {
    max-height: 450px;
  }
}
</style>
