<template>
  <div class="commentsSection">
    <h3 class="my-3 ps-1" style="color: var(--primary-color); font-weight: 400">
      Comments
    </h3>
    <div
      id="carouselExampleAutoplaying"
      class="carousel slide"
      data-bs-ride="carousel"
      style="width: 90%; margin: auto"
      v-if="!isLoading && commentsForBook.length !== 0"
    >
      <div class="carousel-inner">
        <div
          class="carousel-item"
          :class="{ active: index === 0 }"
          v-for="(comment, index) in commentsForBook"
          :key="index"
        >
          <div class="card">
            <div class="card-header fst-italic fw-bold">
              {{ comment.commentedBy.userName }}
            </div>
            <div class="card-body">
              <p class="card-text">
                {{ comment.content }}
              </p>
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <strong class="mr-2">Upvote?</strong>
                </div>
                <div>
                  <font-awesome-icon icon="fa-regular fa-thumbs-up" size="lg" />
                  <strong class="ms-2">8</strong>

                  <!-- <font-awesome-icon
                            :icon="['fas', 'thumbs-up']"
                            style="color: var(--secondary-color)"
                            size="lg"
                          />
                          <strong class="ms-2">12</strong> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
        style="height: 32px; width: 20px"
      >
        <font-awesome-icon
          icon="angle-left"
          style="color: black"
          size="2xl"
          aria-hidden="true"
        />
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
        style="height: 32px; width: 20px"
      >
        <font-awesome-icon
          icon="angle-right"
          style="color: black"
          size="2xl"
          aria-hidden="true"
        />
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div
      class="d-flex justify-content-center align-items-center"
      style="height: 209px"
      v-if="isLoading"
    >
      <font-awesome-icon
        icon="fa-solid fa-spinner"
        spin
        size="2xl"
        style="color: var(--primary-color)"
      />
    </div>
    <div
      class="alert alert-danger py-3 ms-1"
      v-if="!isLoading && commentsForBook.length === 0"
    >
      No comment yet !
    </div>
  </div>
</template>

<script>
import { useCommentStore } from "@/stores/commentStore";
import { mapState } from "pinia";

export default {
  name: "CommentCarusel",
  data() {
    return {};
  },
  computed: {
    ...mapState(useCommentStore, ["commentsForBook", "isLoading"]),
  },
};
</script>

<style scoped>
.card-text {
  /* max-height: 96px; */
  height: 96px;
  overflow-y: auto;
  text-align: justify;
  padding-right: 8px;
}

.carousel-control-prev {
  top: 50%;
  left: calc(-1% - 20px);
}

.carousel-control-next {
  top: 50%;
  left: 101%;
}
@media only screen and (max-width: 991px) {
  .commentsSection {
    margin-top: 25px;
  }
}
</style>
