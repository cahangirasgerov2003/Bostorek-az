import { createRouter, createWebHistory } from "vue-router";

import BooksView from "@/views/BooksView.vue";
import ContactView from "@/views/ContactView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BookDetailView from "@/views/BookDetailView.vue";
import DashboardView from "@/views/DashboardView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/books",
      name: "books",
      component: BooksView,
    },
    {
      path: "/books/:id",
      name: "bookDetail",
      component: BookDetailView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
  ],
  linkActiveClass: "activeLink",
});

router.beforeEach((to, from, next) => {
  // to.matched - bu /dashboard/userInfo kimi url olduqda hemin url-ni ['/', '/dashboard', '/dashboard/userInfo']
  // seklinde 3 yere ayirir some ise hamsi uzerinde qacir ve hansindasa requiresAuth var ya yox ona baxir
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);

  const isLoggedIn = localStorage.getItem("user");

  if (requiresAuth && !isLoggedIn) {
    next({ name: "login" });
  } else if (isLoggedIn && (to.name === "login" || to.name === "register")) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
