<template>
  <div class="d-flex justify-content-center">
    <p class="text-success fs-5">Mouse position is x : {{ x }}, y : {{ y }}</p>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";

let x = ref(0);

let y = ref(0);

function updateCoordinates(event) {
  x.value = event.pageX;
  y.value = event.pageY;
}

onMounted(() => window.addEventListener("mousemove", updateCoordinates));

onUnmounted(() => window.removeEventListener("mousemove", updateCoordinates));
</script>

<style scoped></style>
