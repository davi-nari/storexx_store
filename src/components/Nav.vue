<template>
  <nav class="container flex items-center justify-between pt-6!">
    <a href="#">
      <Logo />
    </a>

    <ul class="flex items-center gap-12">
      <li v-for="item in navigation" :key="item.label">
        <RouterLink
          :to="item.to"
          class="font-semibold cursor-pointer relative after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
          :class="{ 'text-red-600': item.isSale }"
        >
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>

    <form
      class="bg-gray-100 rounded-full flex items-center gap-4 border border-gray-200 w-full max-w-100"
    >
      <input
        type="text"
        placeholder="Поиск по товарам..."
        class="pl-6 py-3 focus:outline-none w-full"
      />

      <button class="pr-6 pl-2 py-3">
        <Search />
      </button>
    </form>

    <ul class="flex items-center gap-4">
      <li
        v-for="action in actions"
        :key="action.to"
        class="p-4 cursor-pointer rounded-full transition-colors duration-200 hover:bg-gray-100"
      >
        <RouterLink :to="action.to">
          <component :is="action.icon" :size="28" />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import Logo from "@/assets/icons/logo.svg";
import { Search } from "@lucide/vue";
import { User } from "@lucide/vue";
import { ShoppingBag } from "@lucide/vue";

const navigation = [
  {
    label: "Мужчины",
    to: "/mens",
  },
  {
    label: "Женщины",
    to: "/womens",
  },
  {
    label: "Дети",
    to: "/kids",
  },
  {
    label: "Бренды",
    to: "/brands",
  },
  {
    label: "SALE",
    to: "/sale",
    isSale: true,
  },
];

const actions = [
  {
    to: "/auth",
    icon: User,
  },
  {
    to: "/cart",
    icon: ShoppingBag,
  },
];
</script>