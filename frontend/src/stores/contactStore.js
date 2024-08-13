import { defineStore } from "pinia";

import axios from "axios";

export const useContactStore = defineStore("contactStore", {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    async sendMessage(formData) {
      try {
        this.isLoading = true;
        const response = await axios.post(
          "http://localhost:3000/api/v1/contact",
          formData
        );
        return response;
      } catch (error) {
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
