<template>
  <section class="calculatingHeightSection">
    <div class="container my-3">
      <div class="d-flex justify-content-center mb-3">
        <h2 class="fw-bold">Register</h2>
      </div>
      <form @submit.prevent="submitForm">
        <!-- Username -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <label for="userName" class="form-label labelElement"
              >Username
              <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="userName"
              v-model.trim="userData.userName"
              placeholder="Ali"
              autocomplete="off"
              :class="{
                'is-valid': isUserNameValid,
                'is-invalid': !isUserNameValid && errors.userName.error,
              }"
              @focus="
                () => {
                  errors.userName.error = true;
                  errors.userName.focusedPassword = true;
                }
              "
              @blur="errors.userName.focusedPassword = false"
              required
            />
            <small
              v-if="errors.userName.error && !isUserNameValid"
              class="text-danger ms-3"
              >{{ errors.userName.errorMessage }}</small
            >
            <small
              v-if="isUserNameValid"
              class="text-success ms-3"
              :style="
                errors.userName.focusedPassword
                  ? 'font-weight:800'
                  : 'font-weight:600'
              "
              >{{ errors.userName.successMessage }}</small
            >
          </div>
        </div>

        <!-- Email -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <label for="email" class="form-label labelElement"
              >Email
              <span class="text-danger">*</span>
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model.trim="userData.email"
              placeholder="Ali2005@gmail.com"
              autocomplete="off"
              :class="{
                'is-valid': isEmailValid,
                'is-invalid': !isEmailValid && errors.email.error,
              }"
              @focus="
                () => {
                  errors.email.error = true;
                  errors.email.focusedPassword = true;
                }
              "
              @blur="errors.email.focusedPassword = false"
              required
            />
            <small
              v-if="errors.email.error && !isEmailValid"
              class="text-danger ms-3"
              >{{ errors.email.errorMessage }}</small
            >
            <small
              v-if="isEmailValid"
              class="text-success ms-3"
              :style="
                errors.email.focusedPassword
                  ? 'font-weight:800'
                  : 'font-weight:600'
              "
              >{{ errors.email.successMessage }}</small
            >
          </div>
        </div>

        <!-- Password -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <label for="password" class="form-label labelElement"
              >Password
              <span class="text-danger">*</span>
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model.trim="userData.password"
              placeholder="Ali2005%))"
              :class="{
                'is-valid': isPasswordValid,
                'is-invalid': !isPasswordValid && errors.password.error,
              }"
              @focus="
                () => {
                  errors.password.error = true;
                  errors.password.focusedPassword = true;
                }
              "
              @blur="errors.password.focusedPassword = false"
              required
            />
            <small
              v-if="errors.password.error && !isPasswordValid"
              class="text-danger ms-3"
              >{{ errors.password.errorMessage }}</small
            >
            <small
              v-if="isPasswordValid"
              class="text-success ms-3"
              :style="
                errors.password.focusedPassword
                  ? 'font-weight:800'
                  : 'font-weight:600'
              "
              >{{ errors.password.successMessage }}</small
            >
          </div>
        </div>

        <!-- Gender -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-md-6 col-12">
            <h4 class="labelElement">
              Gender
              <span class="text-danger">*</span>
            </h4>
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
        <div
          class="row justify-content-center styleInputTypes"
          style="margin-bottom: 8px"
        >
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
        <div class="row justify-content-center mb-2">
          <div class="col-md-6 col-12">
            <span class="text-danger ms-2" style="font-weight: 500"
              >* Please complete all of the required fields !</span
            >
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

      errors: {
        userName: {
          error: false,
          errorMessage: "Username must be between 3 and 9 characters !",
          successMessage: "Looks good !",
          focusedUserName: false,
        },
        email: {
          error: false,
          errorMessage: "Please provide a valid email !",
          successMessage: "Looks good !",
          focusedEmail: false,
        },
        password: {
          error: false,
          errorMessage: "Password must be between 4 and 10 characters !",
          successMessage: "Looks good !",
          focusedPassword: false,
        },
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

    isUserNameValid() {
      const userNameLength = this.userData.userName.length;
      return userNameLength >= 3 && userNameLength <= 9;
    },

    isEmailValid() {
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        this.userData.email
      );
    },

    isPasswordValid() {
      const passwordLength = this.userData.password.length;
      return passwordLength >= 4 && passwordLength <= 10;
    },

    isGenderValid() {
      return this.userData.gender;
    },
  },
};
</script>

<style scoped>
.form-control {
  background-color: #f1f1f1;
  height: 50px;
  border-radius: 25px;
  padding-left: 25px;
  color: #101010;
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

.form-control:focus {
  box-shadow: inset 0 0 0 1px #be1809;
}

.form-control.is-valid:focus {
  box-shadow: inset 0 0 0 1px rgb(25, 135, 84);
}
</style>
