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
            <input
              type="text"
              class="form-control form-control-custom2 mailText"
              name="email"
              placeholder="Email"
              autocomplete="off"
              required
            />
            <textarea
              class="form-control form-control-custom2 mailText"
              rows="6"
              placeholder="Message"
              autocomplete="off"
              maxlength="100"
              required
            ></textarea>

            <button class="btn mt-5 fw-bold sendButton text-uppercase">
              Send
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

<script>
export default {
  name: "ContactUsForm",
  data() {
    return {};
  },
};
</script>

<style scoped>
.blackBg {
  background-image: url("../../assets/images/blackBg.png");
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
  color: #989999;
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
