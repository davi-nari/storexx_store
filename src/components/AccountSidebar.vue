<template>
  <aside class="max-w-sm">
    <h1 class="mb-6 text-3xl font-semibold">Личные данные</h1>

    <nav>
      <ul class="flex flex-col gap-4">
        <li v-for="item in menuItems" :key="item.label" class="-translate-x-4">
          <RouterLink
            :to="item.to"
            class="flex items-center gap-5 rounded-lg px-4 py-2 font-semibold transition-colors duration-200 hover:bg-gray-100 hover:text-black"
            active-class="bg-gray-100 text-black"
            exact-active-class="bg-gray-100 text-black"
          >
            <component :is="item.icon" />

            <span>{{ item.label }}</span>
          </RouterLink>
        </li>

        <li class="-translate-x-4">
          <button
            type="button"
            class="flex w-full items-center gap-5 rounded-lg px-4 py-2 font-semibold transition-colors duration-200 hover:bg-gray-100 hover:text-black"
            @click="handleLogout"
          >
            <LogOut />
            <span>Выйти</span>
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import User from "@/assets/icons/user.svg";
import Key from "@/assets/icons/key.svg";
import Order from "@/assets/icons/order.svg";
import Location from "@/assets/icons/location.svg";
import LogOut from "@/assets/icons/logout.svg";

const menuItems = [
  {
    label: "Панель управления",
    to: "/account",
    icon: Key,
  },
  {
    label: "Личные данные",
    to: { name: "account-details" },
    icon: User,
  },
  {
    label: "Заказы",
    to: { name: "account-orders" },
    icon: Order,
  },
  {
    label: "Адреса",
    to: { name: "account-addresses" },
    icon: Location,
  },
];

const handleLogout = () => {};
</script>

<style scoped>
svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}
</style>