<template>
  <footer style="background-color: var(--primary-color)">
    <div class="text-center py-3">
      <small class="text-white fw-bold copyRight"
        >&copy; {{ year }} No Copyright: Cahangir Əsgərov
      </small>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
const year = ref(new Date().getFullYear());
</script>

<style scoped>
.copyRight {
  font-size: 16px;
}

@media only screen and (max-width: 575px) {
  .copyRight {
    font-size: 14px;
  }
}
</style>
