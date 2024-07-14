<template>
  <section style="min-height: calc(100vh - 130px); overflow: hidden">
    <div class="container">
      <ul class="nav nav-tabs my-4">
        <li class="nav-item" @click="activeTab = 'General'">
          <button class="nav-link" :class="{ active: activeTab === 'General' }">
            General
          </button>
        </li>
        <li class="nav-item" @click="activeTab = 'Books'">
          <button class="nav-link" :class="{ active: activeTab === 'Books' }">
            Books
          </button>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane fade" :class="controlActiveTab('General')">
          <div class="row">
            <div class="col-lg-6">
              <RegisterView :dashboard="true" :userInfo="user" />
            </div>
            <div class="col-lg-6"></div>
          </div>
        </div>
        <div class="tab-pane fade" :class="controlActiveTab('Books')">
          <DashboardBooks />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { useAuthStore } from "@/stores/authStore.js";
import { mapState } from "pinia";
import RegisterView from "./RegisterView.vue";
import DashboardBooks from "@/components/dashboard/DashboardBooks.vue";
export default {
  name: "DashboardView",
  data() {
    return {
      activeTab: "Books",
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
  components: {
    RegisterView,
    DashboardBooks,
  },
};
</script>

<style scoped>
.nav-link {
  color: var(--secondary-color);
  font-weight: bold;
  transition: all 0.5s;
}
.nav-link:hover {
  border-color: transparent;
  border-bottom-color: var(--secondary-color);
  background-color: #44b89d4a;
  color: #063547b1;
}
.nav-link.active {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: var(--primary-color);
}
.nav-tabs {
  border-color: var(--secondary-color);
}
</style>
