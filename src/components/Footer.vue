<template>
  <footer class="bg-[#F8F8F8] w-full h-full py-13 mt-13">
    <div class="container flex flex-col">
      <div class="flex items-start gap-6 justify-between">
        <div>
          <h2 class="text-lg font-bold mb-8">Контакты</h2>
          <ul class="flex flex-col gap-6">
            <li>
              <RouterLink to="" class="font-medium flex items-center gap-6"
                ><Phone />+998 71 235 11 99</RouterLink
              >
            </li>
            <li>
              <RouterLink to="" class="font-medium flex items-center gap-6"
                ><Mail />info@storexx.uz</RouterLink
              >
            </li>
            <li>
              <RouterLink to="" class="font-medium flex items-center gap-6"
                ><MapPin />Узбекистан, Ташкент ул. Амира Темура 60</RouterLink
              >
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-lg font-bold mb-8">Покупателям</h2>
          <ul class="flex flex-col gap-6">
            <li>
              <RouterLink to="" class="font-medium">Каталог</RouterLink>
            </li>
            <li>
              <RouterLink to="" class="font-medium"
                >Доставка и оплата</RouterLink
              >
            </li>
            <li>
              <RouterLink to="" class="font-medium">Обмен и возврат</RouterLink>
            </li>
            <li>
              <RouterLink to="" class="font-medium"
                >Sale (Товары со скидками)</RouterLink
              >
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-lg font-bold mb-8">О компании</h2>
          <ul class="flex flex-col gap-6">
            <li>
              <RouterLink to="" class="font-medium">О нас</RouterLink>
            </li>
            <li>
              <RouterLink to="" class="font-medium">Наши магазины</RouterLink>
            </li>
            <li>
              <RouterLink to="" class="font-medium"
                >Публичная оферта</RouterLink
              >
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-lg font-bold mb-8">Мы в соцсетях</h2>
          <ul class="flex items-center gap-8">
            <li>
              <RouterLink to="" class="font-medium"><Telegram /></RouterLink>
            </li>
            <li>
              <RouterLink to="" class="font-medium"><Instagram /></RouterLink>
            </li>
            <li>
              <RouterLink to="" class="font-medium"><Facebook /></RouterLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="flex items-center gap-6 justify-between border-t-2 border-gray-300 pt-10 mt-13"
      >
        <p class="text-sm text-gray-600">2026 STORE XX. Все права защищены.</p>
        <ul class="flex items-center gap-6">
          <li>
            <RouterLink to="" class="text-sm text-gray-600"
              >Политика конфиденциальности</RouterLink
            >
          </li>
          <li>
            <RouterLink to="" class="text-sm text-gray-600"
              >Условия соглашения</RouterLink
            >
          </li>
          <li>
            <RouterLink to="" class="text-sm text-gray-600"
              >Карта сайта</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { MapPin, Phone, Mail } from "@lucide/vue";
import Instagram from "@/assets/icons/instagram.svg";
import Telegram from "@/assets/icons/telegram.svg";
import Facebook from "@/assets/icons/facebook.svg";
</script>

<style scoped>
</style>