import { defineStore } from "pinia";
import axios from "axios";

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
        const response = await axios.get(
          "http://localhost:3000/api/v1/comments"
        );

        console.log("Fetch all comments result:", response.data.comments);

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
          "http://localhost:3000/api/v1/comments",
          newComment
        );

        console.log("result", response);

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

    async fetchCommentsByUser(userId) {
      try {
        if (this.requestCommentsByUser === false) {
          this.isLoading = true;
          const response = await axios.get(
            `http://localhost:3000/api/v1/comments/user/${userId}`
          );

          console.log("result", response);
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
        await axios.delete(
          `http://localhost:3000/api/v1/comments/${commentId}`
        );

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
          `http://localhost:3000/api/v1/comments/${commentId}`,
          commentData
        );

        console.log(response, "response:::");

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
          `http://localhost:3000/api/v1/comments/${commentId}/upvote`
        );

        console.log("result upvote", response);

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
          `http://localhost:3000/api/v1/comments/${commentId}/cancelUpvote`
        );

        console.log("result cancel upvote", response);

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
