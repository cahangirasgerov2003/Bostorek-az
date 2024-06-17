import { defineStore } from "pinia";

import axios from "axios";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    isLoading: false,
  }),

  getters: {},

  actions: {
    async beRegister(newUser) {
      try {
        this.isLoading = true;
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/register",
          newUser
        );
        this.user = response.data.user;
      } catch (error) {
        console.error("Error occurred when new user was created !", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
