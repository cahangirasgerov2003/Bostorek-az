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
      :books="limitBooksFunc"
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
      :pages="calculatePages"
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

<script setup>
import DashboardBooksTable from "./DashboardBooksTable.vue";
import DashboardModal from "./DashboardModal.vue";
import { Modal } from "bootstrap";
import { useBookStore } from "@/stores/bookStore.js";
import { successAction } from "@/utility/index.js";
import ThePagination from "@/components/ThePagination.vue";
import { calculateNumberOfPages, limitBooks } from "@/utility/index.js";
import { ref, computed, reactive, onMounted } from "vue";

const addEditBook = ref(null);
const modalTitle = ref("");
const current = ref(1);
const perPage = 6;
let bookData = reactive({
  title: "",
  author: "",
  description: "",
  page: "",
});
const errors = reactive({
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
});
const errorContent = ref("");
const errorCount = ref(0);
const editedBookId = ref(null);
const bookStore = useBookStore();
const modalInstance = ref(null);

onMounted(() => {
  return (
    addEditBook.value && (modalInstance.value = new Modal(addEditBook.value))
  );
});

const updatePage = (page) => {
  current.value = page;
};

const saveBookDetails = () => {
  errorCount.value = 0;
  for (let key in bookData) {
    if (bookData[key] === "" || bookData[key] <= 0) {
      errors[key].errorMessage = `${key.toUpperCase()} is required !`;
      errorCount.value += 1;
    } else {
      errors[key].errorMessage ? (errors[key].errorMessage = "") : "";
    }
  }

  if (errorCount.value === 0) {
    if (modalTitle.value === "Add Book") {
      addABook();
    } else if (modalTitle.value === "Edit Book") {
      editABook();
    }
  }
};

const clearForm = () => {
  for (let key in errors) errors[key].errorMessage = "";
  errorContent.value = "";
};

const addABook = async () => {
  try {
    const result = await bookStore.createNewBook(bookData);
    console.log("response add book", result);
    current.value = 1;
    successAction(result);
    modalHide();
  } catch (errorData) {
    console.error("Error occurred when new book was created !", errorData);
    clearForm();
    errorContent.value =
      errorData.error || "Error occurred when new book was created !";
  }
};

const editABook = async () => {
  try {
    const result = await bookStore.editTheBook(bookData, editedBookId.value);
    console.log("response edit book", result);
    successAction(result);

    modalInstance.value && modalInstance.value.hide();
  } catch (errorData) {
    console.error("Error occurred when book was edited !", errorData);
    errorContent.value =
      errorData.error || "Error occurred when book was edited !";
  }
};

const isLoading = computed(() => bookStore.isLoading);

const userUploadedBooks = computed(() => bookStore.userUploadedBooks);

const returnUploadedBooks = computed(() =>
  userUploadedBooks.value.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
);

const calculatePages = computed(() =>
  calculateNumberOfPages(userUploadedBooks.value, perPage)
);

const limitBooksFunc = computed(() =>
  limitBooks(current.value, perPage, returnUploadedBooks.value)
);

const modalHide = () => {
  modalInstance.value && modalInstance.value.hide();
  clearForm();
};

const showModal = (typeAction, editedBook) => {
  if (typeAction === "Edit") {
    modalTitle.value = "Edit Book";
    bookData = {
      title: editedBook.title,
      author: editedBook.author,
      description: editedBook.description,
      page: editedBook.page,
    };
    editedBookId.value = editedBook._id;
  } else {
    modalTitle.value = "Add Book";
    bookData = {
      title: "",
      author: "",
      description: "",
      page: "",
    };
  }
  modalInstance.value && modalInstance.value.show();
};

bookStore.fetchBooksByUploader();
</script>

<style scoped></style>
