import { defineStore } from "pinia";
import axios from "axios";

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    commentsForBook: [],
    isLoading: false,
  }),
  actions: {
    async createNewComment(newComment) {
      try {
        this.isLoading = true;
        const response = await axios.post(
          "http://localhost:3000/api/v1/comments",
          newComment
        );

        console.log("result", response);

        this.commentsForBook.push(response.data.comment);
        return response;
      } catch (error) {
        console.error(
          "An error occurred while creating a new comment !",
          error
        );
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchCommentsForBook(bookId) {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `http://localhost:3000/api/v1/comments/book/${bookId}`
        );

        console.log("result", response);
        this.commentsForBook = response.data.comments;
        return response;
      } catch (error) {
        console.error(
          "An error occurred while fetching comments for book !",
          error
        );
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
