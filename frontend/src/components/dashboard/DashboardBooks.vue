<template>
  <div>
    <!-- Button -->
    <div class="row mb-4 mt-1 d-flex justify-content-end">
      <div class="col-lg-2 col-5">
        <button
          type="button"
          class="btn btn-primary btn-primary-custom w-100"
          @click="modal.show()"
        >
          Add Book
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="d-flex justify-content-center mt-5" v-if="isLoading">
      <font-awesome-icon icon="spinner" spin-pulse style="font-size: 40px" />
    </div>
    <DashboardBooksTable
      :books="limitBooks"
      v-if="userUploadedBooks.length !== 0"
    />
    <div
      class="d-flex justify-content-center mb-5"
      v-if="userUploadedBooks.length === 0 && !isLoading"
    >
      <img
        alt="Not books"
        src="@/assets/images/notBooks.jpg"
        style="width: 800px"
      />
    </div>

    <ThePagination
      :current="current"
      :pages="calculateNumberOfPages"
      @changePage="updatePage"
    />

    <!-- Modal -->
    <div class="modal fade" tabindex="-1" ref="addEditBook">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between">
            <h5 class="modal-title">Add Book</h5>
            <font-awesome-icon
              icon="xmark"
              size="xl"
              @click="modalHide()"
              class="closeIcon"
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
            <div class="col mb-3">
              <label for="title" class="form-label"
                >Title
                <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model.trim="bookData.title"
                autocomplete="off"
                required
              />
              <small v-if="errors.title.errorMessage" class="text-danger">{{
                errors.title.errorMessage
              }}</small>
            </div>
            <div class="col mb-3">
              <label for="author" class="form-label"
                >Author
                <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="author"
                autocomplete="off"
                v-model.trim="bookData.author"
                required
              />
              <small v-if="errors.author.errorMessage" class="text-danger">{{
                errors.author.errorMessage
              }}</small>
            </div>
            <div class="col mb-3">
              <label for="description" class="form-label"
                >Description
                <span class="text-danger">*</span>
              </label>
              <textarea
                id="description"
                class="form-control"
                rows="6"
                v-model.trim="bookData.description"
                autocomplete="off"
                maxlength="100"
                required
              ></textarea>
              <small
                v-if="errors.description.errorMessage"
                class="text-danger"
                >{{ errors.description.errorMessage }}</small
              >
            </div>
            <div class="col mb-3">
              <label for="numOfPages" class="form-label"
                >Number of Pages
                <span class="text-danger">*</span>
              </label>
              <input
                type="number"
                class="form-control"
                id="numOfPages"
                v-model.trim="bookData.page"
                autocomplete="off"
                min="1"
                required
              />
              <small v-if="errors.page.errorMessage" class="text-danger">{{
                errors.page.errorMessage
              }}</small>
            </div>
            <div
              class="row d-flex justify-content-end"
              style="padding: 0px 10px"
            >
              <button
                type="button"
                class="btn btn-warning col-sm-4"
                @click="modalHide()"
              >
                Close
              </button>
              <button
                @click="saveBookDetails"
                type="button"
                class="btn btn-success col-sm-4 saveButton"
                v-if="!isLoading"
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-success col-sm-4 saveButton"
                v-else
              >
                <font-awesome-icon
                  icon="circle-notch"
                  spin-pulse
                  style="font-size: 20px"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardBooksTable from "./DashboardBooksTable.vue";
import { Modal } from "bootstrap";
import { useBookStore } from "@/stores/bookStore.js";
import { mapActions, mapState } from "pinia";
import { successAction } from "@/utility/index.js";
import ThePagination from "@/components/ThePagination.vue";
import { calculateNumberOfPages, limitBooks } from "@/utility/index.js";
export default {
  name: "DashboardBooks",
  data() {
    return {
      modal: null,
      current: 1,
      perPage: 6,
      bookData: {
        title: "",
        author: "",
        description: "",
        page: "",
      },
      errors: {
        title: {
          errorMessage: "",
        },
        author: {
          errorMessage: "",
        },
        description: {
          errorMessage: "",
        },
        page: {
          errorMessage: "",
        },
      },
      errorCount: 0,
      errorContent: "",
    };
  },
  components: {
    DashboardBooksTable,
    ThePagination,
  },
  mounted() {
    this.modal = new Modal(this.$refs.addEditBook);
  },
  created() {
    this.fetchBooksByUploader();
  },
  methods: {
    ...mapActions(useBookStore, [
      "createNewBook",
      "fetchBooksByUploader",
      "controlRequest",
    ]),
    updatePage(page) {
      this.current = page;
    },
    async saveBookDetails() {
      this.errorCount = 0;
      try {
        for (let key in this.bookData) {
          if (this.bookData[key] === "" || this.bookData[key] <= 0) {
            this.errors[
              key
            ].errorMessage = `${key.toUpperCase()} is required !`;
            this.errorCount += 1;
          } else {
            this.errors[key].errorMessage
              ? (this.errors[key].errorMessage = "")
              : "";
          }
        }

        if (this.errorCount === 0) {
          const result = await this.createNewBook(this.bookData);
          console.log("response", result);
          successAction(result);
          this.modalHide();
          this.controlRequest();
          await this.fetchBooksByUploader();
        }

        return;
      } catch (errorData) {
        console.error("Error occurred when new book was created !", errorData);
        this.clearForm();
        this.errorContent =
          errorData.error || "Error occurred when new book was created !";
      }
    },
    clearForm() {
      for (let key in this.bookData) this.bookData[key] = "";
      for (let key in this.errors) this.errors[key].errorMessage = "";
      this.errorContent = "";
    },

    modalHide() {
      this.modal.hide();
      this.clearForm();
    },
  },
  computed: {
    ...mapState(useBookStore, ["isLoading", "userUploadedBooks"]),
    returnUploadedBooks() {
      return this.userUploadedBooks.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
    calculateNumberOfPages() {
      return calculateNumberOfPages(this.userUploadedBooks, this.perPage);
    },
    limitBooks() {
      return limitBooks(this.current, this.perPage, this.returnUploadedBooks);
    },
  },
};
</script>

<style scoped>
.modal-content {
  background-color: var(--secondary-color);
  border: 2px solid var(--secondary-color);
  color: var(--primary-color);
  font-weight: bold;
}

.closeIcon {
  cursor: pointer;
  color: var(--primary-color);
  transition: all 0.5s;
}

.closeIcon:hover {
  color: red;
}

.saveButton {
  margin-left: 12px;
}

@media only screen and (max-width: 575px) {
  .saveButton {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
