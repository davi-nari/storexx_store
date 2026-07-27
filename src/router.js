import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      name: "Auth",
      path: "/auth",
      component: () => import("@/Pages/AuthPage.vue"),
      meta: {
        guestOnly: true,
      },
    },
    {
      name: "AuthVerify",
      path: "/auth/verify",
      component: () => import("@/Pages/VerifyEmailPage.vue"),
      meta: {
        guestOnly: true,
      },
    },
    {
      path: "/account",
      component: () => import("@/Pages/account/AccountPage.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          redirect: { name: "account-details" },
        },
        {
          path: "details",
          name: "account-details",
          component: () => import("@/Pages/account/DetailsPage.vue"),
        },
        {
          path: "orders",
          name: "account-orders",
          component: () => import("@/Pages/account/OrdersPage.vue"),
        },
        {
          path: "addresses",
          name: "account-addresses",
          component: () => import("@/Pages/account/AddressesPage.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: "Auth",
      query: {
        redirect: to.fullPath,
      },
    };
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return {
      name: "account-details",
    };
  }

  return true;
});