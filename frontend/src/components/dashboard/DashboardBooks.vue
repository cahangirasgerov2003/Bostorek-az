<template>
  <div>
    <!-- Button -->
    <div class="row mb-4 mt-1 d-flex justify-content-end">
      <div class="col-lg-2 col-5">
        <button
          type="button"
          class="btn btn-primary btn-primary-custom w-100"
          @click="showModal()"
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
      :showModal="showModal"
    />
    <div
      class="d-flex justify-content-center mb-5"
      v-if="userUploadedBooks.length === 0 && !isLoading"
    >
      <img
        alt="Not books"
        src="@/assets/images/notBooks.jpg"
        class="trashStyle"
      />
    </div>

    <ThePagination
      :current="current"
      :pages="calculateNumberOfPages"
      @changePage="updatePage"
    />

    <!-- Modal -->
    <div class="modal fade" tabindex="-1" ref="addEditBook">
      <DashboardModal
        :bookData="bookData"
        :errorContent="errorContent"
        :modalHide="modalHide"
        :errors="errors"
        :isLoading="isLoading"
        :saveBookDetails="saveBookDetails"
        :modalTitle="modalTitle"
      />
    </div>
  </div>
</template>

<script>
import DashboardBooksTable from "./DashboardBooksTable.vue";
import DashboardModal from "./DashboardModal.vue";
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
      modalTitle: "",
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
      editedBookId: null,
    };
  },
  components: {
    DashboardBooksTable,
    ThePagination,
    DashboardModal,
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
      "editTheBook",
    ]),
    showModal(typeAction, editedBook) {
      if (typeAction === "Edit") {
        this.modalTitle = "Edit Book";
        this.bookData = {
          title: editedBook.title,
          author: editedBook.author,
          description: editedBook.description,
          page: editedBook.page,
        };
        this.editedBookId = editedBook._id;
      } else {
        this.modalTitle = "Add Book";
        this.bookData = {
          title: "",
          author: "",
          description: "",
          page: "",
        };
      }
      this.modal.show();
    },
    updatePage(page) {
      this.current = page;
    },
    saveBookDetails() {
      this.errorCount = 0;
      for (let key in this.bookData) {
        if (this.bookData[key] === "" || this.bookData[key] <= 0) {
          this.errors[key].errorMessage = `${key.toUpperCase()} is required !`;
          this.errorCount += 1;
        } else {
          this.errors[key].errorMessage
            ? (this.errors[key].errorMessage = "")
            : "";
        }
      }

      if (this.errorCount === 0) {
        if (this.modalTitle === "Add Book") {
          this.addABook();
        } else if (this.modalTitle === "Edit Book") {
          this.editABook();
        }
      }
    },
    clearForm() {
      for (let key in this.errors) this.errors[key].errorMessage = "";
      this.errorContent = "";
    },

    modalHide() {
      this.modal.hide();
      this.clearForm();
    },

    async addABook() {
      try {
        const result = await this.createNewBook(this.bookData);
        console.log("response add book", result);
        this.current = 1;
        successAction(result);
        this.modalHide();
      } catch (errorData) {
        console.error("Error occurred when new book was created !", errorData);
        this.clearForm();
        this.errorContent =
          errorData.error || "Error occurred when new book was created !";
      }
    },

    async editABook() {
      try {
        const result = await this.editTheBook(this.bookData, this.editedBookId);
        console.log("response edit book", result);
        successAction(result);
        this.modal.hide();
      } catch (errorData) {
        console.error("Error occurred when book was edited !", errorData);
        this.errorContent =
          errorData.error || "Error occurred when new book was created !";
      }
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
.trashStyle {
  width: 50%;
}

@media only screen and (max-width: 991px) {
  .trashStyle {
    width: 80%;
  }
}

@media only screen and (max-width: 575px) {
  .trashStyle {
    width: 100%;
  }
}
</style>
