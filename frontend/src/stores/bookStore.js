import { defineStore } from "pinia";
import axios from "axios";

export const useBookStore = defineStore("bookStore", {
  state: () => ({
    books: [],
    isLoading: false,
  }),
  actions: {
    async fetchBooks() {
      try {
        this.isLoading = true;
        const response = await axios.get("http://localhost:3000/api/v1/books");
        this.books = response.data.books;
      } catch (error) {
        console.error("An error occurred while fetching books", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
