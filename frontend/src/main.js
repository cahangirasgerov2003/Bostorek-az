import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@/assets/styles/main.css";

import { createApp } from "vue";

import { createPinia } from "pinia";

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

/* add icons to the library */
library.add(
  faAngleLeft,
  faAngleRight,
  faLeftLong,
  faThumbsUp,
  faSpinner,
  faPlay,
  faPause
);

createApp(App)
  .use(createPinia())
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
