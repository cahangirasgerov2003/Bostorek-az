import { defineStore } from "pinia";
import axios from "axios";
import { returnUrl } from "@/utility/url.js";

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    commentsForBook: [],
    commentsByUser: [],
    isLoading: false,
    requestCommentsByUser: false,
    comments: [],
  }),
  actions: {
    async fetchComments() {
      try {
        this.isLoading = true;
        const response = await axios.get(`${returnUrl}/api/v1/comments`);
        this.comments = response.data.comments;
        return response;
      } catch (error) {
        console.error("An error occurred while fetching comments", error);
      } finally {
        this.isLoading = false;
      }
    },
    async createNewComment(newComment) {
      try {
        this.isLoading = true;
        const response = await axios.post(
          `${returnUrl}/api/v1/comments`,
          newComment
        );
        this.commentsForBook.push(response.data.comment);
        this.commentsByUser.push(response.data.comment);
        this.comments.push(response.data.comment);
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
          `${returnUrl}/api/v1/comments/book/${bookId}`
        );
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

    async fetchCommentsByUser(userId) {
      try {
        if (this.requestCommentsByUser === false) {
          this.isLoading = true;
          const response = await axios.get(
            `${returnUrl}/api/v1/comments/user/${userId}`
          );
          this.commentsByUser = response.data.comments;
          this.requestCommentsByUser = true;
          return response;
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching comments by user !",
          error
        );
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteAComment(commentId) {
      try {
        await axios.delete(`${returnUrl}/api/v1/comments/${commentId}`);

        this.comments = this.comments.filter(
          (comment) => comment._id !== commentId
        );

        this.commentsByUser = this.commentsByUser.filter(
          (comment) => comment._id !== commentId
        );
      } catch (error) {
        console.error("An error occurred while deleting a comment", error);
        throw error.response.data;
      }
    },

    async editTheComment(commentData, commentId) {
      try {
        const response = await axios.put(
          `${returnUrl}/api/v1/comments/${commentId}`,
          commentData
        );
        this.commentsByUser = this.commentsByUser.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: commentData.content }
            : comment
        );

        this.comments = this.comments.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: commentData.content }
            : comment
        );

        return response;
      } catch (error) {
        console.error("An error occurred while editing a comment", error);
        throw error.response.data;
      }
    },

    async upvoteCommentAction(commentId) {
      try {
        const response = await axios.post(
          `${returnUrl}/api/v1/comments/${commentId}/upvote`
        );
        const updatedComment = response.data.comment;

        const commentIndex = this.commentsForBook.findIndex(
          (item) => item._id === updatedComment._id
        );

        if (commentIndex !== -1) {
          this.commentsForBook[commentIndex] = updatedComment;
        } else {
          console.error(
            `Comment with id : ${updatedComment._id} was not found!`
          );
        }

        return response;
      } catch (error) {
        console.error("Error occurred when upvoting !", error);
        throw error.response.data;
      }
    },

    async cancelUpvoteAction(commentId) {
      try {
        const response = await axios.post(
          `${returnUrl}/api/v1/comments/${commentId}/cancelUpvote`
        );

        const updatedComment = response.data.comment;

        const commentIndex = this.commentsForBook.findIndex(
          (item) => item._id === updatedComment._id
        );

        if (commentIndex !== -1) {
          this.commentsForBook[commentIndex] = updatedComment;
        } else {
          console.error(
            `Comment with id : ${updatedComment._id} was not found!`
          );
        }

        return response;
      } catch (error) {
        console.error("Error occurred when cancel upvoting !", error);
        throw error.response.data;
      }
    },
  },
});
