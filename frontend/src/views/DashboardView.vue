<template>
  <section class="calculatingHeightSectionBasic" style="overflow: hidden">
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
        <li class="nav-item" @click="activeTab = 'Comments'">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'Comments' }"
          >
            Comments
          </button>
        </li>
        <li class="nav-item" @click="activeTab = 'Ratings'">
          <button class="nav-link" :class="{ active: activeTab === 'Ratings' }">
            Ratings
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
        <div class="tab-pane fade" :class="controlActiveTab('Comments')">
          <!-- Dashboard comments -->
          <DashboardComments activeTable="comment" />
        </div>

        <div class="tab-pane fade" :class="controlActiveTab('Ratings')">
          <!-- Dashboard ratings -->
          <DashboardRatings />
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
import DashboardComments from "@/components/dashboard/DashboardComments.vue";
import DashboardRatings from "../components/dashboard/DashboardRatings.vue";
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
    DashboardComments,
    DashboardRatings,
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
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
