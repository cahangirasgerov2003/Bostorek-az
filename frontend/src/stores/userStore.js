import { defineStore } from "pinia";

import axios from "axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    async updateUserData(updatedUserData) {
      try {
        this.isLoading = true;
        const response = await axios.put(
          "http://localhost:3000/api/v1/user/updateUser",
          updatedUserData
        );
        return response;
      } catch (error) {
        // Bu islem erroru donderir ve sonraki islemleri durdurur
        // Bu frontend terefde errorlarin islenmesi zamani kullanislidir
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
