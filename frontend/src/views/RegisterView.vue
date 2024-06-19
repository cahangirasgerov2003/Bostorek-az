<template>
  <section class="calculatingHeightSection">
    <div class="container">
      <div class="d-flex justify-content-center mb-3">
        <h2 class="fw-bold">Register</h2>
      </div>
      <form @submit.prevent="submitForm">
        <!-- Username -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <label for="userName" class="form-label labelElement"
              >Username</label
            >
            <input
              type="text"
              class="form-control"
              id="userName"
              v-model.trim="userData.userName"
              placeholder="Ali"
              autocomplete="off"
              required
            />
          </div>
        </div>

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
              autocomplete="off"
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
              v-model.trim="userData.password"
              placeholder="Ali2005%))"
              required
            />
          </div>
        </div>

        <!-- Gender -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <h4 class="labelElement">Gender</h4>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="redio1"
                @change="updateGender('Male', $event)"
                required
              />
              <label class="form-check-label" for="redio1"> Male </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="redio2"
                @change="updateGender('Female', $event)"
                required
              />
              <label class="form-check-label" for="redio2"> Female </label>
            </div>
          </div>
        </div>

        <!-- Types of books you like -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <h4 class="labelElement">Choose the types of books you like</h4>
            <div class="form-check form-switch form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="fantasy"
                value="Fantasy"
                v-model="userData.bookGenres"
              />
              <label class="form-check-label" for="fantasy">Fantasy</label>
            </div>
            <div class="form-check form-switch form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="horror"
                value="Horror"
                v-model="userData.bookGenres"
              />
              <label class="form-check-label" for="horror">Horror</label>
            </div>
            <div class="form-check form-switch form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="myStery"
                value="Mystery"
                v-model="userData.bookGenres"
              />
              <label class="form-check-label" for="myStery">Mystery</label>
            </div>
            <div class="form-check form-switch form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="history"
                value="History"
                v-model="userData.bookGenres"
              />
              <label class="form-check-label" for="history">History</label>
            </div>
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
  name: "RegisterView",
  data() {
    return {
      userData: {
        userName: "",
        email: "",
        password: "",
        gender: "",
        bookGenres: ["Horror"],
      },
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["beRegister"]),
    async submitForm() {
      try {
        await this.beRegister(this.userData);
        this.$router.push("/login");
      } catch (error) {
        console.error("Error occurred when new user was created !", error);
      }
    },

    updateGender(gender) {
      this.userData.gender = gender;
    },
  },

  computed: {
    ...mapState(useAuthStore, ["isLoading"]),
  },
};
</script>

<style scoped>
.form-control {
  background-color: #f1f1f1;
  height: 50px;
  border: none;
  border-radius: 25px;
  padding-left: 25px;
  color: #101010;
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem #44b89d75;
}

.btn-primary {
  height: 50px;
  border-radius: 25px;
  background-color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
  transition: all 0.4s;
}

.btn-primary:hover {
  background-color: white;
  color: var(--secondary-color);
}
</style>
