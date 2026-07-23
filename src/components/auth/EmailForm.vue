<template>
  <div class="flex flex-col gap-6 w-full max-w-xl">
    <h1 class="text-3xl text-center font-semibold mb-6">
      Укажите электронную почту, <br />чтобы войти или зарегистрироваться
    </h1>
    <form class="flex flex-col gap-4" @submit.prevent>
      <div class="relative">
        <input
          id="email"
          type="email"
          placeholder=" "
          class="peer w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none"
        />

        <label
          for="email"
          class="absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
        >
          Электронная почта
        </label>
      </div>
      <p class="text-gray-500">
        Авторизуясь, вы соглашаетесь с
        <RouterLink to="/privacy-policy" class="underline"
          >Политикой конфиденциальности</RouterLink
        >
      </p>
      <!-- Временное решение до подключения бэка -->
      <button
        type="submit"
        @click="pushRouter"
        class="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 duration-200 w-full focus:outline-none mt-4"
      >
        Отправить код
      </button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const pushRouter = () => {
  router.push("/auth/verify");
};
</script>


<style scoped>
</style>