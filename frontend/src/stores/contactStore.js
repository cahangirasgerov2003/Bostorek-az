import { defineStore } from "pinia";
import { returnUrl } from "@/utility/url.js";

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
          `${returnUrl}/api/v1/contact`,
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
