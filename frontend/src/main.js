import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@/assets/styles/main.css";

import { createApp } from "vue";

import { createPinia } from "pinia";

import { useBookStore } from "@/stores/bookStore.js";
import { useAuthStore } from "@/stores/authStore.js";

import App from "@/App.vue";

import router from "@/router/index.js";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faAngleLeft,
  faAngleRight,
  faLeftLong,
  faSpinner,
  faPlay,
  faPause,
  faCircleNotch,
  faTrash,
  faXmark,
  faThumbsUp,
  faLocationDot,
  faEnvelopeOpenText,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as farThumbsUp,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
// Toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// Axios
import axios from "axios";
import { errorAction } from "./utility/index.js";

/* add icons to the library */
library.add(
  faAngleLeft,
  faAngleRight,
  faLeftLong,
  faThumbsUp,
  faSpinner,
  faPlay,
  faPause,
  faCircleNotch,
  faPenToSquare,
  faTrash,
  faXmark,
  farThumbsUp,
  faLocationDot,
  faEnvelopeOpenText,
  faPhone
);

const pinia = createPinia();

const app = createApp(App);

// Burda pinia yazmasaq useBookStore hissesinde store use olmadan stordan
// useBookStore() oxumaqa calisdigimiz ucun hata alicaz
const bookStore = useBookStore(pinia);

const authStore = useAuthStore(pinia);

const userData = JSON.parse(localStorage.getItem("user"));

// Interceptors middleware

axios.interceptors.response.use(
  (response) => {
    // İsteğin başarılı olması durumunda buraya düşeriz
    console.log("Response received:", response.data);
    return response;
  },
  (error) => {
    console.log("error.response", error.response);
    // İsteğin başarısız olması durumunda buraya düşeriz
    if (error.response && error.response.status === 401) {
      //  401 type error time toast message
      errorAction("Your token has expired, forwarding login page !");

      setTimeout(() => {
        authStore.logoutAccount();
        router.push("/login");
      }, 3500);
    }
  }
);

if (userData) {
  authStore.user = userData.user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
}

bookStore
  .fetchBooks()
  .then(() => {
    app
      .use(pinia)
      .component("font-awesome-icon", FontAwesomeIcon)
      .use(router)
      .use(Toast)
      .mount("#app");
  })
  .catch((error) => {
    console.error("An error occurred while fetching books", error);
  });
