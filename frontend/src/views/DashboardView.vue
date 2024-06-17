<template>
  <div>
    <h1>{{ user.userName }}</h1>
    <h4>{{ user.email }}</h4>
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/authStore.js";
import { mapState } from "pinia";
export default {
  name: "DashboardView",
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
};
</script>

<style scoped></style>
