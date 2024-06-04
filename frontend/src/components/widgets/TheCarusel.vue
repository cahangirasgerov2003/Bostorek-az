<template>
  <div class="position-relative w-100">
    <div v-for="(item, index) in caruselItems" :key="index">
      <div class="position-relative" v-if="currentIndex === index">
        <img
          :alt="item.subtitle"
          :src="item.imageUrl"
          :style="{ width: '100%', objectFit: 'cover' }"
        />
        <div
          class="custom-item-caption position-absolute top-0 start-0 end-0 bottom-0"
        >
          <div class="container text-light">
            <h4
              class="fw-bold text-uppercase"
              style="color: rgb(54, 156, 54); font-size: 20px"
            >
              {{ item.subtitle }}
            </h4>
            <h5 class="mb-3" style="font-size: 46px">{{ item.title }}</h5>
            <p class="lead">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="custom-carusel-control">
      <button
        type="button"
        class="carousel-control-prev-icon"
        @click="goPrevItem"
      ></button>
      <button
        type="button"
        class="carousel-control-next-icon"
        @click="goNextItem"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheCarusel",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    caruselItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goNextItem() {
      this.currentIndex = (this.currentIndex + 1) % this.caruselItems.length;
    },
    goPrevItem() {
      if (this.currentIndex === 0)
        this.currentIndex = this.caruselItems.length - 1;
      this.currentIndex = this.currentIndex - 1;
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
</style>
