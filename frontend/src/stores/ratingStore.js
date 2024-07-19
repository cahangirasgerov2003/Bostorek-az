import { defineStore } from "pinia";
import axios from "axios";

export const useRatingStore = defineStore("ratingStore", {
  state: () => ({
    ratingsForBook: [],
    isLoading: false,
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
  },
});
