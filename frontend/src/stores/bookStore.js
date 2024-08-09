import { defineStore } from "pinia";
import axios from "axios";
import { useRatingStore } from "./ratingStore.js";
import { useCommentStore } from "./commentStore.js";

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
        return response;
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
        this.userUploadedBooks.push(response.data.book);
        return response;
      } catch (error) {
        console.error("An error occurred while creating a new book", error);
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },

    async editTheBook(bookInfo, bookId) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/books/${bookId}`,
          bookInfo
        );

        this.books = this.books.map((book) =>
          book._id === bookId ? response.data.book : book
        );

        this.userUploadedBooks = this.userUploadedBooks.map((book) =>
          book._id === bookId ? response.data.book : book
        );

        return response;
      } catch (error) {
        console.error("An error occurred while editing a book", error);
        throw error.response.data;
      }
    },

    async deleteABook(bookId) {
      const commentStore = useCommentStore();
      const ratingStore = useRatingStore();
      try {
        await axios.delete(`http://localhost:3000/api/v1/books/${bookId}`);
        this.books = this.books.filter((book) => book._id !== bookId);
        this.userUploadedBooks = this.userUploadedBooks.filter(
          (book) => book._id !== bookId
        );

        commentStore.comments = commentStore.comments.filter(
          (comment) => comment.reviewedBook._id !== bookId
        );

        commentStore.commentsByUser = commentStore.commentsByUser.filter(
          (comment) => comment.reviewedBook._id !== bookId
        );
        ratingStore.ratingsByUser = ratingStore.ratingsByUser.filter(
          (rating) => rating.book._id !== bookId
        );
      } catch (error) {
        console.error("An error occurred while deleting a book", error);
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
          return response;
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
