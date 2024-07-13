import { defineStore } from "pinia";
import axios from "axios";

export const useBookStore = defineStore("bookStore", {
  state: () => ({
    books: [],
    isLoading: false,
    userUploadedBooks: [],
    requestUploadedBooks: false,
  }),
  getters: {
    selectABook(state) {
      return (id) => state.books.find((item) => item._id === id);
    },
  },
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

    async createNewBook(newBook) {
      try {
        this.isLoading = true;
        const response = await axios.post(
          "http://localhost:3000/api/v1/books",
          newBook
        );
        this.books.push(response.data.book);
        return response;
      } catch (error) {
        console.error("An error occurred while creating a new book", error);
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteABook(bookId) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/books/${bookId}`);
        this.books = this.books.filter((book) => book._id !== bookId);
      } catch (error) {
        console.error("An error occurred while deleting a new book", error);
        throw error.response.data;
      }
    },

    async fetchBooksByUploader() {
      try {
        if (this.requestUploadedBooks === false) {
          this.isLoading = true;
          const response = await axios.get(
            "http://localhost:3000/api/v1/books/uploader"
          );
          this.userUploadedBooks = response.data.books;
          this.requestUploadedBooks = true;
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching user uploaded books",
          error
        );
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },

    controlRequest() {
      this.requestUploadedBooks = false;
    },
  },
});
