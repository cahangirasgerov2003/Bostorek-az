<template>
  <div class="bg-black">
    <div class="followBg">
      <div class="container">
        <div class="row">
          <div class="col-12 mb-4">
            <h3 class="followText text-center text-uppercase">FOLLOW NOW</h3>
          </div>
          <div class="col-12 socialIcon d-flex justify-content-center">
            <ul class="d-flex">
              <li>
                <a
                  href="https://www.linkedin.com/in/cahangir-asgerov-07258a252/"
                  title="Linkedin"
                  target="_blank"
                  ><img alt="linkedin" src="@/assets/images/linkedin.webp"
                /></a>
              </li>
              <li>
                <a
                  href="https://github.com/cahangirasgerov2003"
                  title="Github"
                  target="_blank"
                  ><img alt="gitHub" src="@/assets/images/gitHub.png"
                /></a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/_cahangir.asgerov/"
                  title="Instagram"
                  target="_blank"
                  ><img alt="instagram" src="@/assets/images/instagram.webp"
                /></a>
              </li>
            </ul>
          </div>
          <div class="col-12 row mt-5">
            <div class="col-md-4 iconBox">
              <font-awesome-icon icon="fa-solid fa-location-dot" size="lg" />
              <p class="iconText">Baku city</p>
            </div>
            <div class="col-md-4 iconBox">
              <font-awesome-icon
                icon="fa-solid fa-envelope-open-text"
                size="lg"
              />
              <p class="iconText">cahangirsgrli46@gmail.com</p>
            </div>
            <div class="col-md-4 iconBox">
              <font-awesome-icon icon="fa-solid fa-phone" size="lg" />
              <p class="iconText">050 349 ** **</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUsFooter",
  data() {
    return {};
  },
};
</script>

<style scoped>
.followBg {
  background-image: url(@/assets/images/footerBg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 90px 0 80px 0;
}

.followText {
  color: #080807;
  font: bolder 24px "sans-serif";
}

.socialIcon ul li {
  margin: 0 10px;
}

.socialIcon ul li a img {
  width: 35px;
}

.iconBox {
  display: flex;
  justify-content: center;
}

.iconText {
  padding-left: 15px;
  margin-bottom: 0;
}

@media only screen and (max-width: 991px) {
  .followBg {
    background-image: none;
    background-color: white;
  }
}

@media only screen and (max-width: 767px) {
  .iconBox:not(:last-child) {
    margin-bottom: 15px;
  }
}
</style>
