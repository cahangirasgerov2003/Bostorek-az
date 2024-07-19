import { defineStore } from "pinia";
import axios from "axios";

export const useRatingStore = defineStore("ratingStore", {
  state: () => ({
    ratingsForBook: [],
    ratingsByUser: [],
    isLoading: false,
    requestRatingsByUser: false,
  }),
  actions: {
    async createNewRating(newRating) {
      try {
        this.isLoading = true;
        const response = await axios.post(
          "http://localhost:3000/api/v1/ratings",
          newRating
        );

        console.log("result", response);

        this.ratingsForBook.push(response.data.rating);
        this.ratingsByUser.push(response.data.rating);
        return response;
      } catch (error) {
        console.error("An error occurred while creating a new rating !", error);
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchRatingsForBook(bookId) {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `http://localhost:3000/api/v1/ratings/book/${bookId}`
        );

        console.log("result", response);
        this.ratingsForBook = response.data.ratings;
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

    async fetchRatingsByUser(userId) {
      try {
        if (this.requestRatingsByUser === false) {
          this.isLoading = true;
          const response = await axios.get(
            `http://localhost:3000/api/v1/ratings/user/${userId}`
          );

          console.log("result", response);
          this.ratingsByUser = response.data.ratings;
          this.requestRatingsByUser = true;
          return response;
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching ratings by user !",
          error
        );
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteARating(ratingId) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/ratings/${ratingId}`);
        this.ratingsByUser = this.ratingsByUser.filter(
          (rating) => rating._id !== ratingId
        );
      } catch (error) {
        console.error("An error occurred while deleting a rating", error);
        throw error.response.data;
      }
    },

    async editTheRating(ratingData, ratingId) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/ratings/${ratingId}`,
          ratingData
        );

        console.log(response, "response:::");

        this.ratingsByUser = this.ratingsByUser.map((item) =>
          item._id === ratingId ? { ...item, rating: ratingData.rating } : item
        );

        return response;
      } catch (error) {
        console.error("An error occurred while editing a rating", error);
        throw error.response.data;
      }
    },
  },
});
