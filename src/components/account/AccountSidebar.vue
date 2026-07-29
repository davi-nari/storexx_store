<template>
  <aside class="max-w-sm w-full self-start">
    <h1 class="mb-6 text-3xl font-semibold">Личные данные</h1>

    <nav>
      <ul class="flex flex-col max-w-[85%] gap-6">
        <li
          v-for="item in visibleMenuItems"
          :key="item.label"
          class="-translate-x-4"
        >
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
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.js";

import { UserPen, ClipboardCheck, MapPin, Key, LogOut } from "@lucide/vue";

const router = useRouter();
const authStore = useAuthStore();

const menuItems = [
  {
    label: "Панель управления",
    to: "/admin",
    icon: Key,
    adminOnly: true,
  },
  {
    label: "Личные данные",
    to: { name: "account-details" },
    icon: UserPen,
  },
  {
    label: "Заказы",
    to: { name: "account-orders" },
    icon: ClipboardCheck,
  },
  {
    label: "Адреса",
    to: { name: "account-addresses" },
    icon: MapPin,
  },
];

const visibleMenuItems = computed(() =>
  menuItems.filter((item) => {
    if (item.adminOnly) {
      return authStore.isAdmin;
    }

    return true;
  })
);

async function handleLogout() {
  authStore.logout();
  await router.replace("/auth");
}
</script>

<style scoped>
svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}
</style>
