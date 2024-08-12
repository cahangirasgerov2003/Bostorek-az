<template>
  <div class="card border-0 shadow position-relative">
    <div class="position-relative">
      <img src="@/assets/images/b1.jpg" class="card-img-top" alt="Books" />
      <h4 class="book_author m-0">
        <span> {{ book.author }} </span>
      </h4>
    </div>
    <div class="card-body">
      <h5 class="card-title fw-bold">{{ book.title }}</h5>
      <p class="card-text text-justify descContent">
        {{ formattedText }}
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <RouterLink :to="`/books/` + book._id" style="color: #44b89d"
          >Read More</RouterLink
        >
        <span
          class="badge rounded-pill py-2 px-3"
          style="background-color: var(--primary-color); font-size: 14px"
          >11.02.11</span
        >
      </div>
    </div>
    <span
      :class="compareRatingsFunc"
      class="position-absolute top-0 start-100 translate-middle ratingStyle"
      v-if="!ratingStore.isLoading"
    >
      {{ averageRatingsFunc }}
    </span>
    <span
      class="position-absolute top-0 start-100 translate-middle ratingStyle"
      style="background-color: white"
      v-else
    >
      <font-awesome-icon
        icon="fa-solid fa-spinner"
        spin
        size="xl"
        style="color: rgb(152, 37, 37)"
      />
    </span>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useRatingStore } from "@/stores/ratingStore";
import { averageRatings, compareRatings } from "@/utility/index.js";
import { computed } from "vue";
const ratingStore = useRatingStore();
const props = defineProps({
  book: {
    type: Object,
    default: () => {},
  },
});

const averageRatingsFunc = computed(() => averageRatings(props.book));

const compareRatingsFunc = computed(() => compareRatings(props.book));

const formattedText = computed(() =>
  props.book.description.length > 80
    ? props.book.description.slice(0, 77) + "..."
    : props.book.description
);
</script>
<style scoped>
.book_author {
  position: absolute;
  bottom: 0;
  left: 25px;
  padding: 10px 25px;
  font-size: 18px;
  background-color: var(--primary-color);
  border: 3px solid white;
  color: white;
  transform: translateY(50%);
  border-radius: 45px;
}

.card-body {
  padding: 45px 25px 25px 25px;
}

.descContent {
  min-height: 100px;
}

.ratingStyle {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 4px solid white;
  border-radius: 50%;
}

.card-title {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

@media only screen and (max-width: 991px) {
  .book_author {
    left: 8px;
  }
}
</style>
