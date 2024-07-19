<template>
  <div class="mt-4">
    <h3 class="mb-3 ps-1" style="color: var(--primary-color); font-weight: 400">
      Rate section
    </h3>
    <div class="boxStyle" v-if="!userAlreadyRated && !isLoading">
      <form @submit.prevent="addNewRating()">
        <!-- Rating Input -->
        <div class="mb-3">
          <label
            for="rating"
            style="color: var(--primary-color)"
            class="form-label labelStyle"
            >Rate The Book</label
          >
          <input
            type="number"
            id="rating"
            class="form-control form-control-custom rateInput"
            placeholder="Rate (1-10)"
            autocomplete="off"
            v-model="rating"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="btn btn-primary btn-primary-custom buttonStyle"
        >
          Rate
        </button>
      </form>
    </div>

    <div v-if="!isLoading && userAlreadyRated" class="boxStyle col-lg-6">
      <div class="fs-5 fw-bold">Your rate</div>
      <div class="ms-1 mt-2">{{ userRate }}</div>
    </div>

    <div
      v-if="isLoading"
      class="boxStyle col-lg-6 d-flex align-items-center justify-content-center"
    >
      <font-awesome-icon
        icon="fa-solid fa-spinner"
        spin
        size="lg"
        style="color: var(--primary-color)"
      />
    </div>
  </div>
</template>

<script>
import { successAction } from "@/utility/index.js";
import { mapActions, mapState } from "pinia";
import { useRatingStore } from "@/stores/ratingStore.js";
import { useAuthStore } from "@/stores/authStore.js";

export default {
  name: "RateSection",
  data() {
    return {
      rating: null,
      rateError: "",
    };
  },
  props: {
    getParamsId: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(useRatingStore, ["createNewRating"]),
    async addNewRating() {
      try {
        if (this.rating > 10 || this.rating < 1) {
          this.rateError = "The rating value can take values from 1 to 10 !";
          return;
        }
        this.rateError = "";

        const result = await this.createNewRating({
          rating: this.rating,
          ratedBy: this.user._id,
          book: this.getParamsId,
        });
        successAction(result);
      } catch (errorData) {
        console.error(
          "Error occurred when new rating was created !",
          errorData
        );

        this.rateError =
          errorData.error || "Error occurred when new rating was created !";
      } finally {
        this.rating = null;
      }
    },
  },

  computed: {
    ...mapState(useAuthStore, ["user"]),
    ...mapState(useRatingStore, ["ratingsForBook", "isLoading"]),

    userAlreadyRated() {
      if (!this.user) {
        return false;
      }

      return this.ratingsForBook.some(
        (item) => item.ratedBy._id === this.user._id
      );
    },

    userRate() {
      const userRateObj = this.ratingsForBook.find(
        (item) => item.ratedBy._id === this.user._id
      );

      return userRateObj.rating;
    },
  },
};
</script>

<style scoped>
.form-control:focus {
  box-shadow: none;
  border: 1px solid #dee2e6;
}
</style>
