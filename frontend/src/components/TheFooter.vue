<template>
  <footer style="background-color: var(--primary-color)">
    <div class="text-center py-3">
      <small class="text-white fw-bold" style="font-size: 16px"
        >&copy; {{ year }} No Copyright: Cahangir Əsgərov
      </small>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
const year = ref(new Date().getFullYear());
</script>

<style scoped></style>
