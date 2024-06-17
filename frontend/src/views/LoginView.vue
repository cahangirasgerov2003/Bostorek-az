<template>
  <section class="calculatingHeightSection">
    <div class="container">
      <div class="d-flex justify-content-center mb-3">
        <h2 class="fw-bold">Login</h2>
      </div>
      <form @submit.prevent="submitForm">
        <!-- Email -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <label for="email" class="form-label labelElement">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model.trim="userData.email"
              placeholder="Ali2005@gmail.com"
              required
            />
          </div>
        </div>

        <!-- Password -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <label for="password" class="form-label labelElement"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="userData.password"
              placeholder="Ali2005%))"
              required
            />
          </div>
        </div>

        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <button
              type="submit"
              class="btn btn-primary w-100 py-2"
              v-if="!isLoading"
            >
              Submit
            </button>
            <button type="submit" class="btn btn-primary w-100 py-2" v-else>
              <font-awesome-icon
                icon="circle-notch"
                spin-pulse
                style="font-size: 20px"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";
import { mapState, mapActions } from "pinia";
export default {
  name: "LoginView",
  data() {
    return {
      userData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["beLogin"]),
    async submitForm() {
      try {
        await this.beLogin(this.userData);
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("An error occurred when logging in !", error);
      }
    },
  },

  computed: {
    ...mapState(useAuthStore, ["isLoading"]),
  },
};
</script>

<style scoped></style>
