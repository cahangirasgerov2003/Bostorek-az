<template>
  <section class="calculatingHeightSection">
    <div class="container my-3">
      <div class="d-flex justify-content-center mb-3">
        <h2 class="fw-bold">Login</h2>
      </div>
      <form @submit.prevent="submitForm">
        <div class="row justify-content-center mb-3" v-if="requestError">
          <div class="col-lg-6 text-center">
            <span class="text-danger ms-2" style="font-weight: 500"
              >A problem occurred, please try again later !</span
            >
          </div>
        </div>
        <!-- Email -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-lg-6">
            <label for="email" class="form-label labelElement"
              >Email
              <span class="text-danger">*</span>
            </label>
            <input
              type="email"
              class="form-control form-control-custom"
              id="email"
              v-model.trim="userData.email"
              placeholder="Ali2005@gmail.com"
              autocomplete="off"
              :class="{
                'is-valid': isEmailValid,
                'is-invalid':
                  (!isEmailValid && errors.email.error) ||
                  inCorrectEmail === userData.email,
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
              v-if="isEmailValid && inCorrectEmail !== userData.email"
              class="text-success ms-3"
              :style="
                errors.email.focusedPassword
                  ? 'font-weight:800'
                  : 'font-weight:600'
              "
              >{{ errors.email.successMessage }}</small
            >
            <small
              v-if="inCorrectEmail === userData.email"
              class="text-danger ms-3"
              >No users with this email were found !</small
            >
          </div>
        </div>

        <!-- Password -->
        <div class="row justify-content-center styleInputTypes">
          <div class="col-lg-6">
            <label for="password" class="form-label labelElement"
              >Password
              <span class="text-danger">*</span>
            </label>
            <input
              type="password"
              class="form-control form-control-custom"
              id="password"
              v-model="userData.password"
              placeholder="Ali2005%))"
              :class="{
                'is-valid': isPasswordValid,
                'is-invalid':
                  (!isPasswordValid && errors.password.error) ||
                  wrongPasswordEntered,
              }"
              @focus="
                () => {
                  errors.password.error = true;
                  errors.password.focusedPassword = true;
                }
              "
              @blur="errors.password.focusedPassword = false"
              @input="wrongPasswordEntered = false"
              required
            />
            <small
              v-if="errors.password.error && !isPasswordValid"
              class="text-danger ms-3"
              >{{ errors.password.errorMessage }}</small
            >
            <small
              v-if="isPasswordValid && !wrongPasswordEntered"
              class="text-success ms-3"
              :style="
                errors.password.focusedPassword
                  ? 'font-weight:800'
                  : 'font-weight:600'
              "
              >{{ errors.password.successMessage }}</small
            >
            <small v-if="wrongPasswordEntered" class="text-danger ms-3"
              >The password you entered is not correct !</small
            >
          </div>
        </div>

        <div
          class="row justify-content-center styleInputTypes"
          style="margin-bottom: 8px"
        >
          <div class="col-lg-6">
            <button
              :disabled="!formIsValid"
              type="submit"
              class="btn btn-primary btn-primary-custom w-100 py-2"
              v-if="!isLoading"
            >
              Submit
            </button>
            <button
              type="submit"
              class="btn btn-primary btn-primary-custom w-100 py-2"
              v-else
            >
              <font-awesome-icon
                icon="circle-notch"
                spin-pulse
                style="font-size: 20px"
              />
            </button>
          </div>
        </div>
        <div
          class="row justify-content-center mb-2"
          v-if="!formIsValid && submitButton"
        >
          <div class="col-lg-6">
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
import { successAction } from "@/utility/index.js";
export default {
  name: "LoginView",
  data() {
    return {
      userData: {
        email: "",
        password: "",
      },
      errors: {
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
      inCorrectEmail: null,
      wrongPasswordEntered: false,
      requestError: false,
      submitButton: true,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["beLogin"]),
    async submitForm() {
      try {
        const result = await this.beLogin(this.userData);
        console.log("response", result);
        successAction(result);
        this.submitButton = false;
        setTimeout(() => {
          this.$router.push("/dashboard");
        }, 3500);
      } catch (errorData) {
        console.error("An error occurred when logging in !", errorData);
        if (errorData.error === "User not found !") {
          this.inCorrectEmail = this.userData.email;
        } else if (
          errorData.error === "The password you entered is not correct !"
        ) {
          this.wrongPasswordEntered = true;
        } else {
          this.requestError = true;
          this.userData = {
            email: "",
            password: "",
          };
          this.errors.email.error = false;
          this.errors.password.error = false;
        }
      }
    },
  },

  computed: {
    ...mapState(useAuthStore, ["isLoading"]),
    isEmailValid() {
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        this.userData.email
      );
    },

    isPasswordValid() {
      const passwordLength = this.userData.password.length;
      return passwordLength >= 4 && passwordLength <= 10;
    },

    formIsValid() {
      return this.isEmailValid && this.isPasswordValid && this.submitButton;
    },
  },
};
</script>

<style scoped></style>
