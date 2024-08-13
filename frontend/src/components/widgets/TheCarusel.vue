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
            <h5 class="mb-3 caruselTitle">
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

<script setup>
import { ref } from "vue";
const props = defineProps({
  caruselItems: {
    type: Array,
    required: true,
  },
  height: {
    type: String,
    default: "100%",
  },
});
const currentIndex = ref(0);
const currentItem = ref(null);
const autoPlay = ref(null);
const autoPlayInterval = ref(null);
currentItem.value = props.caruselItems[0];
autoPlay.value = false;

const goNextItem = () => {
  currentIndex.value = (currentIndex.value + 1) % props.caruselItems.length;
  currentItem.value = props.caruselItems[currentIndex.value];
};

const goPrevItem = () => {
  if (currentIndex.value === 0)
    currentIndex.value = props.caruselItems.length - 1;
  currentIndex.value = currentIndex.value - 1;

  currentItem.value = props.caruselItems[currentIndex.value];
};

const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.caruselItems.length;
    currentItem.value = props.caruselItems[currentIndex.value];
  }, 2000);
};

const autoPlayControl = () => {
  autoPlay.value = !autoPlay.value;
  startAutoPlay();
};

const stopControl = () => {
  autoPlay.value = !autoPlay.value;
  clearInterval(autoPlayInterval.value);
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

.caruselTitle {
  font-size: 46px;
}

@media only screen and (max-width: 575px) {
  .caruselTitle {
    font-size: 35px;
  }
}
</style>
