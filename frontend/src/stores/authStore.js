import { defineStore } from "pinia";

import axios from "axios";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    isLoading: false,
  }),

  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
  },

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
        // Bu islem erroru donderir ve sonraki islemleri durdurur
        // Bu frontend terefde errorlarin islenmesi zamani kullanislidir
        throw error.response.data;
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
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    logoutAccount() {
      this.user = null;
      localStorage.removeItem("user");
      location.reload();
    },
  },
});
