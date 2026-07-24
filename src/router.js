import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      name: "Auth",
      path: "/auth",
      component: () => import("@/Pages/AuthPage.vue"),
    },
    {
      name: "AuthVerify",
      path: "/auth/verify",
      component: () => import("@/Pages/VerifyEmailPage.vue"),
    },
    {
      path: "/account",
      component: () => import("@/Pages/account/AccountPage.vue"),

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