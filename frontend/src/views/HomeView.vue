<template>
  <div class="calculatingHeightSectionBasic">
    <section>
      <TheCarusel
        v-bind:caruselItems="carouselItems"
        height="400px"
      ></TheCarusel>
    </section>
    <section class="my-5">
      <div class="container">
        <TheHeading :desc="desc" :title="title" />
        <div class="row mt-5">
          <div class="col-md-4">
            <FeaturedListGroup
              :filterType="filterType"
              @changeType="changeFilterType"
            />
          </div>
          <div class="col-md-8" :style="isLoading ? 'min-height:350px' : ''">
            <FeaturedAccordion :filterBooks="filterBooks" v-if="!isLoading" />
            <div
              v-else
              class="w-100 h-100 d-flex align-items-center justify-content-center"
            >
              <font-awesome-icon
                icon="spinner"
                spin-pulse
                style="font-size: 40px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5" style="background-color: #f5f6f9">
      <HomeComments />
    </section>
  </div>
</template>

<script>
import hero_1 from "@/assets/images/hero-1.jpg";
import hero_2 from "@/assets/images/hero-2.jpg";
import hero_3 from "@/assets/images/hero-3.jpg";
import TheHeading from "../components/TheHeading.vue";
import TheCarusel from "../components/widgets/TheCarusel.vue";
import FeaturedListGroup from "../components/widgets/FeaturedListGroup.vue";
import FeaturedAccordion from "../components/widgets/FeaturedAccordion.vue";
import HomeComments from "../components/widgets/HomeComments.vue";
import { useBookStore } from "@/stores/bookStore.js";
// Biz burada butun storu yox sadece books-i isteyirik
// o zaman yalniz onu istifade edek
import { mapState, mapActions } from "pinia";
import { addRatingsForBook } from "@/utility/index.js";
import { useRatingStore } from "@/stores/ratingStore";
export default {
  name: "HomeView",
  components: {
    TheCarusel,
    TheHeading,
    FeaturedListGroup,
    FeaturedAccordion,
    HomeComments,
  },
  data() {
    return {
      carouselItems: [
        {
          imageUrl: hero_1,
          subtitle: "Liberte",
          title: "Lorem Ipsum Dolor Sit Amet",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          imageUrl: hero_2,
          subtitle: "Egalite",
          title: "Excepteur Sint Occaecat Cupidatat",
          description:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          imageUrl: hero_3,
          subtitle: "Fraternite",
          title: "Neque Porro Quisquam Est",
          description:
            "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
        },
      ],
      title: "Featured books",
      desc: "After the title and the book cover, your description is the most important",
      // store adi vermek daha meksede uygundur
      // books: [],
      filterType: "Latest",
      bookStore: useBookStore(),
    };
  },
  methods: {
    ...mapActions(useRatingStore, ["fetchRatings"]),
    changeFilterType(type) {
      console.log(this.bookStore);
      this.filterType = type;
    },

    async fetchRatingsForBook() {
      try {
        await this.fetchRatings();
      } catch (error) {
        console.error("An error occurred while fetching ratings", error);
      }
    },
  },

  computed: {
    ...mapState(useBookStore, ["books", "isLoading"]),
    ...mapState(useRatingStore, ["requestRatings", "ratings"]),
    filterBooks() {
      const booksToFilter = [...this.books];
      if (this.filterType === "Latest") {
        return booksToFilter
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
      } else if (this.filterType === "TopRated") {
        return booksToFilter.sort((a, b) => b.rating - a.rating).slice(0, 3);
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

  created() {
    this.fetchRatingsForBook();
  },
};
</script>

<style scoped></style>
