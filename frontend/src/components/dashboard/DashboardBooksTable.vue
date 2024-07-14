<template>
  <!-- Table -->
  <div class="row mb-4">
    <div class="col table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Page</th>
            <th class="text-center">Edit</th>
            <th class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody style="position: relative">
          <tr v-for="(book, index) in books" :key="index">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td class="bookDesc">
              {{ book.description }}
            </td>
            <td>{{ book.page }}</td>
            <td class="text-center">
              <font-awesome-icon
                :icon="['far', 'pen-to-square']"
                class="text-warning"
                style="cursor: pointer"
                @click="showModal('Edit', book)"
              />
            </td>
            <td class="text-center">
              <font-awesome-icon
                :icon="['fas', 'trash']"
                class="text-danger"
                style="cursor: pointer"
                @click="removeABook(book._id, book.title)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useBookStore } from "@/stores/bookStore.js";
import { mapActions } from "pinia";
import { warningAction } from "@/utility/index.js";
export default {
  name: "DashboardBooksTable",
  data() {
    return {};
  },
  props: {
    books: {
      type: Array,
      default: () => [],
    },
    showModal: {
      type: Function,
      required: true,
    },
  },
  methods: {
    ...mapActions(useBookStore, [
      "deleteABook",
      "fetchBooksByUploader",
      "controlRequest",
    ]),

    async removeABook(bookId, bookTitle) {
      try {
        await this.deleteABook(bookId);
        warningAction(`${bookTitle} deleted successfully !`);
        this.controlRequest();
        await this.fetchBooksByUploader();
      } catch (errorData) {
        console.error("Error occurred when book was deleted !", errorData);
      }
    },
  },
};
</script>

<style scoped>
th,
td {
  padding: 20px 16px;
}

.bookDesc {
  max-width: 250px;
  text-align: justify;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bookDesc:hover {
  white-space: wrap;
  overflow: visible;
}
</style>
