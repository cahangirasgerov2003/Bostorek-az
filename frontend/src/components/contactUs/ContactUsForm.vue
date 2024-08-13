<template>
  <div class="blackBg">
    <div class="container mb-5">
      <div class="row d-flex align-items-center">
        <div class="col-6">
          <h1 class="titleContent text-uppercase mb-0 fw-bold">Get In Touch</h1>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 d-flex flex-column align-items-end">
          <div class="mailBox">
            <div class="row justify-content-center mb-3" v-if="requestError">
              <div class="col-lg-6 text-center">
                <span class="text-danger ms-2" style="font-weight: 500">{{
                  requestError
                }}</span>
              </div>
            </div>
            <input
              type="text"
              class="form-control form-control-custom2 mailText"
              name="email"
              placeholder="Email"
              autocomplete="off"
              required
              v-model.trim="formData.email"
            />
            <textarea
              class="form-control form-control-custom2 mailText"
              rows="6"
              placeholder="Message"
              autocomplete="off"
              maxlength="100"
              required
              v-model.trim="formData.message"
            ></textarea>

            <div class="mt-3 ms-1" v-if="errorForm">
              <small style="color: rgb(209, 85, 85); font-size: 16px">{{
                errorForm
              }}</small>
            </div>

            <button
              :class="errorForm ? 'mt-4' : 'mt-5'"
              class="btn fw-bold sendButton text-uppercase"
              @click="sendMessage()"
              v-if="!isLoading"
            >
              Send
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
        <div class="col-md-6 mapBox">
          <div class="h-100 d-flex align-items-center">
            <img alt="map" src="@/assets/images/map.png" class="mapImage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useContactStore } from "@/stores/contactStore.js";
import { successAction } from "@/utility/index.js";
const formData = reactive({
  email: "",
  message: "",
});

const errorForm = ref(null);
const contactStore = useContactStore();
const requestError = ref(null);

const isEmailValid = () => {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    formData.email
  );
};

const isMessageValid = () => {
  return formData.message.length <= 100;
};

const isLoading = computed(() => contactStore.isLoading);

const sendMessage = async () => {
  if (isEmailValid() && isMessageValid()) {
    errorForm.value = null;

    // REQUEST
    try {
      const result = await contactStore.sendMessage(formData);
      successAction(result);
    } catch (errorData) {
      console.error("An error occurred while sending the message !", errorData);
      requestError.value = errorData.error;
    }

    formData.email = "";
    formData.message = "";
  } else {
    errorForm.value = "Check the form and try again !";
  }
};
</script>

<style scoped>
.blackBg {
  background-image: url("@/assets/images/blackBg.png");
  padding: 90px 0;
  color: #f1f0ef;
}
.titleContent {
  font-size: 40px;
}
.line {
  height: 2px;
  width: 50%;
  background-color: #f1f0ef;
}

.mailText {
  color: #524f4f;
  padding: 20px;
}

textarea.mailText {
  height: auto;
  border-radius: 5px;
  margin-top: 30px;
}

.mailBox {
  width: 84%;
}

.col-md-6 {
  padding: 0px 15px;
}

.mapBox {
  padding-right: 0px;
}

.sendButton {
  background-color: #a40514;
  color: #e1e7d8;
  padding: 10px 40px;
  font-size: 16px;
  border-radius: 40px;
  border: 2px solid white;
}

.sendButton:hover {
  background-color: transparent;
}

.mapImage {
  width: 100%;
}

@media only screen and (max-width: 991px) {
  .titleContent {
    font-size: 30px;
  }
}

@media only screen and (max-width: 767px) {
  .mailBox {
    width: 100%;
  }

  .mapBox {
    margin-top: 70px;
  }
}

@media only screen and (max-width: 575px) {
  .titleContent {
    font-size: 20px;
  }
}
</style>
