<template>
  <div class="position-relative w-100">
    <Transition name="fade" mode="out-in">
      <div :key="currentItem.imageUrl" class="position-relative">
        <img
          :alt="currentItem.subtitle"
          :src="currentItem.imageUrl"
          :style="{ width: '100%', height: height, objectFit: 'cover' }"
        />
        <div
          class="custom-item-caption position-absolute top-0 start-0 end-0 bottom-0"
        >
          <div class="container text-light">
            <h4
              class="fw-bold text-uppercase"
              style="color: var(--secondary-color); font-size: 20px"
            >
              {{ currentItem.subtitle }}
            </h4>
            <h5 class="mb-3" style="font-size: 46px">
              {{ currentItem.title }}
            </h5>
            <p class="lead">{{ currentItem.description }}</p>
          </div>
        </div>
      </div>
    </Transition>
    <div class="custom-carusel-control">
      <button type="button" @click="goPrevItem">
        <span class="carousel-control-prev-icon"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button type="button" @click="goNextItem">
        <span class="carousel-control-next-icon"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div class="custom-carusel-control custom-carusel-control2">
      <button type="button" v-if="!autoPlay" @click="autoPlayControl">
        <font-awesome-icon icon="play" fade class="text-light" />
        <span class="visually-hidden">Play</span>
      </button>
      <button type="button" v-else @click="stopControl">
        <font-awesome-icon icon="pause" fade class="text-light" />
        <span class="visually-hidden">Stop</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheCarusel",
  data() {
    return {
      currentIndex: 0,
      currentItem: null,
      autoPlay: null,
      autoPlayInterval: null,
    };
  },
  created() {
    this.currentItem = this.caruselItems[0];
    this.autoPlay = false;
  },
  props: {
    caruselItems: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
      default: "100%",
    },
  },
  methods: {
    goNextItem() {
      this.currentIndex = (this.currentIndex + 1) % this.caruselItems.length;
      this.currentItem = this.caruselItems[this.currentIndex];
    },
    goPrevItem() {
      if (this.currentIndex === 0)
        this.currentIndex = this.caruselItems.length - 1;
      this.currentIndex = this.currentIndex - 1;

      this.currentItem = this.caruselItems[this.currentIndex];
    },
    autoPlayControl() {
      this.autoPlay = !this.autoPlay;
      this.startAutoPlay();
    },
    stopControl() {
      this.autoPlay = !this.autoPlay;
      clearInterval(this.autoPlayInterval);
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.caruselItems.length;
        this.currentItem = this.caruselItems[this.currentIndex];
      }, 2000);
    },
  },
};
</script>

<style scoped>
.custom-item-caption {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
}

.custom-carusel-control {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(5%, 50%);
  display: flex;
  gap: 6px;
}

.custom-carusel-control2 {
  left: 100%;
  transform: translate(-105%, 50%);
}

.custom-carusel-control button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background-color: var(--secondary-color);
  width: 50px;
  height: 50px;
  transition: all 0.2s ease-in;
}

.custom-carusel-control button:hover {
  background-color: var(--primary-color);
  transform: scale(1.03);
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 18px;
  height: 18px;
}

.fade-enter-from {
  opacity: 0.9;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 0.5s linear;
}
</style>
