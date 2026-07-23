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
    {
      path: '/account',
      component: () => import('@/Pages/account/AccountPage.vue'), // Компонент с боковым меню
      children: [
        {
          path: '', // Сработает при переходе на /account
          redirect: { name: 'account-details' },
        },
        {
          path: 'details', // Путь будет: /account/details
          name: 'account-details',
          component: () => import('@/Pages/account/DetailsPage.vue'), // Сама форма с инпутами из макета
        },
        // {
        //   path: 'orders', // Путь будет: /account/orders
        //   name: 'account-orders',
        //   component: () => import('@/Pages/account/OrdersPage.vue'),
        // },
        // {
        //   path: 'addresses', // Путь будет: /account/addresses
        //   name: 'account-addresses',
        //   component: () => import('@/Pages/account/AddressesPage.vue'),
        // },
      ],
    },
  ],
})
