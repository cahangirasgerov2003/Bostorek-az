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
        console.log("response", response);
      } catch (error) {
        console.error("Error occurred when new user was created !", error);
      } finally {
        this.isLoading = false;
      }
    },

    async beLogin(loginData) {
      try {
        this.isLoading = true;
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/login",
          loginData
        );
        console.log("response", response);
        this.user = response.data.user;
      } catch (error) {
        console.error("An error occurred when logging in !", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
