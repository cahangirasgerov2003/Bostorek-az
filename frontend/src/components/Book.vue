<template>
  <div class="card border-0 shadow position-relative">
    <div class="position-relative">
      <img
        src="../../template/bostorek/images/b1.jpg"
        class="card-img-top"
        alt="Books"
      />
      <h4 class="book_author m-0">
        <span> {{ book.author }} </span>
      </h4>
    </div>
    <div class="card-body">
      <h5 class="card-title fw-bold">{{ book.name }}</h5>
      <p class="card-text text-justify">
        {{ book.description }}
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <a href="#" style="color: #44b89d; text-decoration: none">Read More</a>
        <span
          class="badge rounded-pill py-2 px-3"
          style="background-color: #063547; font-size: 14px"
          >{{ book.uploadDate }}</span
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
  },
};
</script>

<style scoped>
.book_author {
  position: absolute;
  bottom: 0;
  left: 25px;
  padding: 10px 25px;
  font-size: 18px;
  background-color: #063547;
  border: 3px solid white;
  color: white;
  transform: translateY(50%);
  border-radius: 45px;
}

.card-body {
  padding: 45px 25px 25px 25px;
}
</style>
