import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Auth',
      path: '/auth',
      component: () => import('@/Pages/AuthPage.vue'),
    },
    {
      name: 'AuthVerify',
      path: '/auth/verify',
      component: () => import('@/Pages/VerifyEmailPage.vue'),
    },
  ],
})
