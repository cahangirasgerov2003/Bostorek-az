<template>
  <section
    :class="
      !dashboard ? 'calculatingHeightSection' : 'calculatingHeightSectionBasic'
    "
  >
    <div class="container my-3">
      <div class="d-flex justify-content-center mb-3">
        <h2 class="fw-bold">
          {{ dashboard ? "User Information" : "Register" }}
        </h2>
      </div>
      <form @submit.prevent="!dashboard && submitForm()">
        <div class="row justify-content-center mb-3" v-if="requestError">
          <div class="text-center" :class="dashboard ? 'col-12' : 'col-lg-6'">
            <span class="text-danger ms-2" style="font-weight: 500"
              >A problem occurred, please try again later !</span
            >
          </div>
        </div>
        <div
          class="row justify-content-center mb-3"
          v-if="!requestError && otherError"
        >
          <div class="text-center" :class="dashboard ? 'col-12' : 'col-lg-6'">
            <span class="text-danger ms-2" style="font-weight: 500">{{
              otherError
            }}</span>
          </div>
        </div>
        <!-- Username -->
        <div class="row justify-content-center styleInputTypes">
          <div :class="dashboard ? 'col-12' : 'col-lg-6'">
            <label for="userName" class="form-label labelElement"
              >Username
              <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control form-control-custom"
              id="userName"
              :disabled="dashboard && !editMode"
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
          <div :class="dashboard ? 'col-12' : 'col-lg-6'">
            <label for="email" class="form-label labelElement"
              >Email
              <span class="text-danger">*</span>
            </label>
            <input
              type="email"
              class="form-control form-control-custom"
              id="email"
              :disabled="dashboard && !editMode"
              v-model.trim="userData.email"
              placeholder="Ali2005@gmail.com"
              autocomplete="off"
              :class="{
                'is-valid': isEmailValid,
                'is-invalid':
                  (!isEmailValid && errors.email.error) ||
                  existingEmail === userData.email,
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
              v-if="isEmailValid && existingEmail !== userData.email"
              class="text-success ms-3"
              :style="
                errors.email.focusedPassword
                  ? 'font-weight:800'
                  : 'font-weight:600'
              "
              >{{ errors.email.successMessage }}</small
            >

            <small
              v-if="existingEmail === userData.email"
              class="text-danger ms-3"
              >The user already exists !</small
            >
          </div>
        </div>

        <!-- Password -->
        <div class="row justify-content-center styleInputTypes">
          <div :class="dashboard ? 'col-12' : 'col-lg-6'">
            <label for="password" class="form-label labelElement"
              >Password
              <span class="text-danger">*</span>
            </label>
            <input
              type="password"
              class="form-control form-control-custom"
              id="password"
              :disabled="dashboard && !editMode"
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
        <div
          class="row justify-content-center styleInputTypes"
          v-if="!dashboard"
        >
          <div class="col-lg-6">
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
          <div :class="dashboard ? 'col-12' : 'col-lg-6'">
            <h4 class="labelElement">Choose the types of books you like</h4>
            <div class="form-check form-switch form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="fantasy"
                value="Fantasy"
                v-model="userData.bookGenres"
                :disabled="dashboard && !editMode"
              />
              <label class="form-check-label" for="fantasy">Fantasy</label>
            </div>
            <div class="form-check form-switch form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="horror"
                :disabled="dashboard && !editMode"
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
                :disabled="dashboard && !editMode"
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
                :disabled="dashboard && !editMode"
                value="History"
                v-model="userData.bookGenres"
              />
              <label class="form-check-label" for="history">History</label>
            </div>
          </div>
        </div>
        <div
          class="row styleInputTypes"
          :class="{ 'justify-content-center': !dashboard }"
          style="margin-bottom: 8px"
        >
          <div :class="dashboard ? 'col-md-4' : 'col-lg-6'">
            <button
              :disabled="
                (!formIsValid && !dashboard) ||
                (!formIsValid && dashboard && editMode)
              "
              :type="
                !dashboard || (dashboard && editMode) ? 'submit' : 'button'
              "
              class="btn btn-primary btn-primary-custom w-100 py-2"
              @click="toggleEditMode"
              v-if="!authStore.isLoading"
            >
              {{ !dashboard ? "Submit" : editMode ? "Save" : "Edit" }}
            </button>
            <button
              type="button"
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
          <div class="col-md-4" v-if="dashboard && editMode">
            <button
              type="button"
              class="btn btn-warning btn-warning-custom w-100 py-2 forMedium"
              @click="clearUpdatedUserData"
            >
              Cancel
            </button>
          </div>
        </div>
        <div
          class="row justify-content-center mb-2"
          v-if="
            dashboard
              ? !formIsValid && editMode && submitButton
              : !formIsValid && submitButton
          "
        >
          <div :class="dashboard ? 'col-12' : 'col-lg-6'">
            <span class="text-danger ms-2" style="font-weight: 500"
              >* Please complete all of the required fields !</span
            >
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore.js";
import { useUserStore } from "@/stores/userStore.js";
import { successAction } from "@/utility/index.js";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();
const props = defineProps({
  dashboard: {
    type: Boolean,
    default: () => false,
  },
  userInfo: {
    type: Object,
    default: () => ({
      userName: "",
      email: "",
      password: "",
      gender: "",
      bookGenres: ["Horror"],
    }),
  },
});
let userData = reactive({
  userName: "",
  email: "",
  password: "",
  gender: "",
  bookGenres: ["Horror"],
});
let errors = reactive({
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
});

const existingEmail = ref(null);
const requestError = ref(false);
const submitButton = ref(true);
const editMode = ref(false);
const otherError = ref(false);

const submitForm = async () => {
  try {
    const result = await authStore.beRegister(userData);
    successAction(result);
    submitButton.value = false;
    setTimeout(() => {
      router.push("/login");
    }, 3500);
  } catch (errorData) {
    console.error("Error occurred when new user was created !", errorData);
    if (errorData.error == "The user already exists !") {
      existingEmail.value = userData.email;
    } else {
      requestError.value = true;
      userData = {
        userName: "",
        email: "",
        password: "",
        gender: "",
        bookGenres: [],
      };
      errors.userName.error = false;
      errors.email.error = false;
      errors.password.error = false;
    }
  }
};

const updateGender = (gender) => {
  userData.gender = gender;
};

const saveUpdatedUserData = async () => {
  try {
    const result = await userStore.updateUserData(userData);
    successAction(result);
    submitButton.value = false;
    setTimeout(() => {
      authStore.logoutAccount();
    }, 3500);
  } catch (errorData) {
    console.error("Error occurred when user details were updated !", errorData);

    if (errorData.error == "Internal Server Error") {
      requestError.value = true;
    } else {
      otherError.value = errorData.error;
    }

    userData = {
      userName: "",
      email: "",
      password: "",
      gender: "",
      bookGenres: [],
    };
    errors.userName.error = false;
    errors.email.error = false;
    errors.password.error = false;
  }
};

const toggleEditMode = () => {
  props.dashboard
    ? !editMode.value
      ? (editMode.value = !editMode.value)
      : saveUpdatedUserData()
    : "";
};

const clearUpdatedUserData = () => {
  editMode.value = false;
  userData.userName = props.userInfo.userName;
  userData.email = props.userInfo.email;
  userData.password = "";
  userData.bookGenres = props.userInfo.bookGenres;
  errors.password.error = false;
};

userData.userName = props.userInfo.userName;
userData.email = props.userInfo.email;
userData.bookGenres = props.userInfo.bookGenres;
userData.gender = props.userInfo.gender;

const isUserNameValid = computed(() => {
  const userNameLength = userData.userName.length;
  return userNameLength >= 3 && userNameLength <= 9;
});

const isEmailValid = computed(() =>
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    userData.email
  )
);

const isPasswordValid = computed(() => {
  const passwordLength = userData.password?.length;
  return passwordLength >= 4 && passwordLength <= 10;
});

const isGenderValid = computed(() => userData.gender);

const formIsValid = computed(
  () =>
    isEmailValid &&
    isGenderValid &&
    isPasswordValid &&
    isUserNameValid &&
    submitButton.value
);
</script>

<style scoped>
.forMedium {
  margin-left: 2px;
}

@media only screen and (max-width: 767px) {
  .forMedium {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
