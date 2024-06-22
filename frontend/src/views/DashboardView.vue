<template>
  <section class="calculatingHeightSection">
    <div class="container">
      <ul class="nav nav-tabs">
        <li class="nav-item" @click="activeTab = 'General'">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'General' }"
            type="button"
          >
            General
          </button>
        </li>
        <li class="nav-item" @click="activeTab = 'Books'">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'Books' }"
            type="button"
          >
            Books
          </button>
        </li>
      </ul>
      <div class="tab-content" id="dashboardTabContent">
        <div
          class="tab-pane fade"
          :class="controlActiveTab('General')"
          tabindex="0"
        >
          Details
        </div>
        <div
          class="tab-pane fade"
          :class="controlActiveTab('Books')"
          tabindex="0"
        >
          Books
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { useAuthStore } from "@/stores/authStore.js";
import { mapState } from "pinia";
export default {
  name: "DashboardView",
  data() {
    return {
      activeTab: "General",
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
  methods: {
    controlActiveTab(tabName) {
      if (this.activeTab === tabName) return "show active";
    },
  },
};
</script>

<style scoped></style>
