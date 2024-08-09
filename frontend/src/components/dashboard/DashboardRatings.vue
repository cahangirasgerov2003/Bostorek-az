<template>
  <div>
    <div class="d-flex justify-content-center mt-5" v-if="isLoading">
      <font-awesome-icon icon="spinner" spin-pulse style="font-size: 40px" />
    </div>

    <div class="row mb-4" v-if="ratingsByUser.length !== 0">
      <div class="col table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Book name</th>
              <th>Content</th>
              <th class="text-center">Edit</th>
              <th class="text-center">Delete</th>
            </tr>
          </thead>
          <tbody
            style="position: relative"
            v-for="(item, index) in limitBooks"
            :key="index"
          >
            <tr>
              <td>{{ item.book.title }}</td>
              <td class="bookDesc">
                {{ item.rating }}
              </td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['far', 'pen-to-square']"
                  class="text-warning"
                  style="cursor: pointer"
                  @click="showModal(item._id, item.rating)"
                />
              </td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  class="text-danger"
                  style="cursor: pointer"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="d-flex justify-content-center mb-5"
      v-if="ratingsByUser.length === 0 && !isLoading"
    >
      <img
        alt="Not comments"
        src="@/assets/images/notBooks.jpg"
        class="trashStyle"
      />
    </div>

    <ThePagination
      :current="current"
      :pages="calculateNumberOfPages"
      @changePage="updatePage"
    />

    <!-- Edit modal -->
    <div class="modal fade" tabindex="-1" ref="editRating">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between">
            <h5 class="modal-title">Edit</h5>
            <font-awesome-icon
              icon="xmark"
              size="xl"
              class="closeIcon"
              @click="hideModal()"
            />
          </div>
          <div class="modal-body mx-5">
            <div
              class="col d-flex justify-content-center mb-3"
              v-if="errorContent"
            >
              <div class="text-center">
                <span class="text-danger" style="font-weight: 800">{{
                  errorContent
                }}</span>
              </div>
            </div>
            <div class="col">
              <label for="rating" class="form-label mb-0"
                >Rating
                <span class="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control ratingInput"
                autocomplete="off"
                v-model="ratingData.rating"
                placeholder="Edit your rating"
                min="1"
                max="10"
                required
              />
              <small v-if="errors.rating.errorMessage" class="text-danger">{{
                errors.rating.errorMessage
              }}</small>
            </div>

            <div
              class="row d-flex justify-content-end"
              style="padding: 0px 10px; margin-top: 30px"
            >
              <button
                type="button"
                class="btn btn-warning col-sm-4"
                @click="hideModal()"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-success col-sm-4 saveButton"
                @click="editARating()"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { Modal } from "bootstrap";
import { useRatingStore } from "@/stores/ratingStore";
import { useAuthStore } from "@/stores/authStore";
import { warningAction, successAction } from "@/utility";
import { calculateNumberOfPages, limitBooks } from "@/utility/index.js";
import ThePagination from "@/components/ThePagination.vue";
export default {
  name: "DashboardRatings",
  data() {
    return {
      ratingData: {
        rating: null,
      },
      ratingId: null,
      current: 1,
      perPage: 6,
      errorContent: "",
      errors: {
        rating: {
          errorMessage: "",
        },
      },
    };
  },
  components: {
    ThePagination,
  },
  computed: {
    ...mapState(useRatingStore, ["isLoading", "ratingsByUser"]),
    ...mapState(useAuthStore, ["user"]),
    returnUploadedRatings() {
      return this.ratingsByUser.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
    calculateNumberOfPages() {
      return calculateNumberOfPages(this.ratingsByUser, this.perPage);
    },
    limitBooks() {
      return limitBooks(this.current, this.perPage, this.returnUploadedRatings);
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.editRating);
  },
  created() {
    this.fetchRatingsByUser(this.user._id);
  },
  methods: {
    ...mapActions(useRatingStore, ["fetchRatingsByUser", "editTheRating"]),

    showModal(ratingId, rating) {
      this.modal.show();
      this.ratingData.rating = rating;
      this.ratingId = ratingId;
    },

    async editARating() {
      try {
        if (this.ratingData.rating > 10 || this.ratingData.rating < 1) {
          this.errors.rating.errorMessage =
            "The rating value can take values from 1 to 10 !";
          return;
        }
        const result = await this.editTheRating(this.ratingData, this.ratingId);
        console.log("response edit rating", result);
        successAction(result);
        this.modal.hide();
      } catch (errorData) {
        console.error("Error occurred when rating was edited !", errorData);
        this.errorContent =
          errorData.error || "Error occurred when rating was edited !";
      }
    },

    updatePage(page) {
      this.current = page;
    },
    hideModal() {
      this.modal.hide();
      this.errors.rating.errorMessage = "";
    },
  },
};
</script>

<style scoped>
th,
td {
  padding: 20px 10px;
  white-space: nowrap;
}

.ratingInput {
  margin-top: 20px;
}

.modal-body {
  padding-bottom: 28px;
}
</style>
