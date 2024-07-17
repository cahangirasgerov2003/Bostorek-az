import { defineStore } from "pinia";
import axios from "axios";

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    comments: [],
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
        this.comments.push(response.data.comment);
        return response;
      } catch (error) {
        console.error("An error occurred while creating a new comment", error);
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
