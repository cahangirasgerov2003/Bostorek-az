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
          >{{ book.updatedAt.slice(11, 19) }}</span
        >
      </div>
    </div>
    <span
      :class="compareRatings"
      class="position-absolute top-0 start-100 translate-middle p-2 border border-2 border-white rounded-circle text-white"
    >
      {{ book.rating }}
    </span>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "Book",
  props: {
    book: {
      type: Object,
      default: () => {},
    },
  },
  // CAMPUTED PROPS
  computed: {
    compareRatings() {
      if (this.book.rating > 6.6) {
        return "bg-success";
      } else if (this.book.rating > 3.3) {
        return "bg-warning";
      }
      return "bg-danger";
    },

    formattedText() {
      return this.book.description.length > 80
        ? this.book.description.slice(0, 77) + "..."
        : this.book.description;
    },
  },
  components: { RouterLink },
};
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
  min-height: 72px;
}
</style>
