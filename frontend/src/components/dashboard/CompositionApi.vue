<template>
  <div class="d-flex justify-content-center gap-4">
    <button @click="increment()" class="btn btn-success">Increment</button>
    <p class="d-flex align-items-center mb-0">{{ count }}</p>
    <button @click="decrement()" class="btn btn-danger">Decrement</button>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    let count = ref(0);

    const increment = () => {
      count.value = count.value + 1;
    };

    const decrement = () => {
      count.value--;
    };

    return {
      count,
      increment,
      decrement,
    };
  },
};
</script>

<style scoped></style>
