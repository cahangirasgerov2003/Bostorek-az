import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@/assets/styles/main.css";

import { createApp } from "vue";

import { createPinia } from "pinia";

import { useBookStore } from "./stores/bookStore.js";

import App from "@/App.vue";

import router from "@/router/index.js";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faAngleLeft,
  faAngleRight,
  faLeftLong,
  faThumbsUp,
  faSpinner,
  faPlay,
  faPause,
  faCircleNotch
);

const pinia = createPinia();

// Burda pinia yazmasaq useBookStore hissesinde store use olmadan stordan
// useBookStore() oxumaqa calisdigimiz ucun hata alicaz
const bookStore = useBookStore(pinia);

bookStore
  .fetchBooks()
  .then(() => {
    createApp(App)
      .use(pinia)
      .component("font-awesome-icon", FontAwesomeIcon)
      .use(router)
      .mount("#app");
  })
  .catch((error) => {
    console.error("An error occurred while fetching books", error);
  });
