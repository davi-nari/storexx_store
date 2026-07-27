<template>
  <div class="flex flex-col gap-6 w-full max-w-xl">
    <h1 class="text-3xl text-center font-semibold mb-6">
      Укажите электронную почту, <br />
      чтобы войти или зарегистрироваться
    </h1>

    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <div class="relative">
        <input
          id="email"
          v-model.trim="email"
          type="email"
          autocomplete="email"
          placeholder=" "
          :disabled="authStore.isLoading"
          class="peer w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none disabled:opacity-60"
        />

        <label
          for="email"
          class="absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
        >
          Электронная почта
        </label>
      </div>

      <p v-if="localError" class="text-sm text-red-600">
        {{ localError }}
      </p>

      <p class="text-gray-500">
        Авторизуясь, вы соглашаетесь с
        <RouterLink to="/privacy-policy" class="underline">
          Политикой конфиденциальности
        </RouterLink>
      </p>

      <button
        type="submit"
        :disabled="authStore.isLoading"
        class="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 duration-200 w-full focus:outline-none mt-4 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ authStore.isLoading ? "Отправляем..." : "Отправить код" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

const email = ref(authStore.otpEmail);
const localError = ref("");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function submit() {
  localError.value = "";

  const normalizedEmail = email.value.trim().toLowerCase();

  if (!emailPattern.test(normalizedEmail)) {
    localError.value = "Введите корректный адрес электронной почты";
    return;
  }

  try {
    await authStore.requestOtp(normalizedEmail);
    await router.push("/auth/verify");
  } catch {
    localError.value =
      authStore.error || "Не удалось отправить код. Попробуйте ещё раз";
  }
}
</script>