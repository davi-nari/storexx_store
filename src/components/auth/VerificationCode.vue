<template>
  <div class="flex flex-col gap-4 w-full max-w-xl">
    <h1 class="text-3xl text-center font-semibold">
      Введите 8-значный код, отправленный на почту
    </h1>
    <p class="text-gray-500 mb-6 text-center">
      Если код долго не приходит, проверьте папку «Спам» или
      <router-link
        to="/auth"
        class="underline hover:text-black transition-colors"
      >
        правильность ввода почты</router-link
      >.
    </p>
    <form class="flex flex-col gap-4" @submit.prevent>
      <div class="relative">
        <input
          id="code"
          type="text"
          inputmode="numeric"
          maxlength="8"
          placeholder=" "
          class="peer w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none tracking-[0.5em]"
        />

        <label
          for="text"
          class="absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
        >
          8-значный код
        </label>
      </div>

      <button class="underline text-gray-500">Отправить код повторно</button>
      <RouterLink to="/auth" class="underline text-gray-500 m-auto"
        >Изменить почту</RouterLink
      >
      <!-- Временное решение до подключения бэка -->
      <button
        type="submit"
        @click="pushRouter"
        class="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 duration-200 w-full focus:outline-none mt-4"
      >
        Подвердить
      </button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const pushRouter = () => {
  router.push("/profile");
};
</script>


<style scoped>
</style>