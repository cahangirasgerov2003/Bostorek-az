<template>
  <div class="bg-black">
    <div class="followBg">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-12 mb-5">
            <h3 class="followText text-center text-uppercase mb-0">
              FOLLOW NOW
            </h3>
          </div>
          <div class="col-12 socialIcon d-flex justify-content-center">
            <ul class="socialList">
              <li class="mx-3">
                <a
                  href="https://www.linkedin.com/in/cahangir-asgerov-07258a252/"
                  title="Linkedin"
                  target="_blank"
                  >Linkedin</a
                >
              </li>
              <li class="mx-5">
                <a
                  href="https://github.com/cahangirasgerov2003"
                  title="Github"
                  target="_blank"
                  >Github</a
                >
              </li>
              <li class="mx-3">
                <a
                  href="https://www.instagram.com/_cahangir.asgerov/"
                  title="Instagram"
                  target="_blank"
                  >Instagram</a
                >
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
              <p class="iconText">xxxxxxxxxxx@gmail.com</p>
            </div>
            <div class="col-md-4 iconBox">
              <font-awesome-icon icon="fa-solid fa-phone" size="lg" />
              <p class="iconText">*** *** ** **</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
.socialIcon ul li a {
  color: #063547;
  font-size: 18px;
  transition: color 0.5s;
}

.socialIcon ul li a:hover {
  color: var(--secondary-color);
}

.iconBox {
  display: flex;
  justify-content: center;
}

.iconText {
  padding-left: 15px;
  margin-bottom: 0;
}

.socialList {
  display: flex;
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

@media only screen and (max-width: 575px) {
  .socialList {
    flex-direction: column;
    align-items: center;
  }
  .socialIcon ul li:not(:last-child) {
    margin-bottom: 15px;
  }
}
</style>
