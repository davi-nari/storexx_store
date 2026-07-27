<template>
  <div class="flex flex-col gap-4 w-full max-w-xl">
    <h1 class="text-3xl text-center font-semibold">
      Введите 8-значный код, отправленный на почту
    </h1>

    <p v-if="authStore.otpEmail" class="text-center font-medium">
      {{ authStore.otpEmail }}
    </p>

    <p class="text-gray-500 mb-6 text-center">
      Если код долго не приходит, проверьте папку «Спам» или
      <RouterLink
        to="/auth"
        class="underline hover:text-black transition-colors"
      >
        правильность ввода почты
      </RouterLink>.
    </p>

    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <div class="relative">
        <input
          id="code"
          v-model="code"
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="8"
          placeholder=" "
          :disabled="authStore.isLoading"
          class="peer w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none tracking-[0.5em] disabled:opacity-60"
          @input="handleCodeInput"
        />

        <label
          for="code"
          class="absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
        >
          8-значный код
        </label>
      </div>

      <p v-if="localError" class="text-sm text-red-600">
        {{ localError }}
      </p>

      <button
        type="button"
        :disabled="authStore.isLoading || resendCooldown > 0"
        class="underline text-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
        @click="resendCode"
      >
        {{
          resendCooldown > 0
            ? `Отправить повторно через ${resendCooldown} сек.`
            : "Отправить код повторно"
        }}
      </button>

      <RouterLink to="/auth" class="underline text-gray-500 m-auto">
        Изменить почту
      </RouterLink>

      <button
        type="submit"
        :disabled="authStore.isLoading || code.length !== 8"
        class="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 duration-200 w-full focus:outline-none mt-4 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ authStore.isLoading ? "Проверяем..." : "Подтвердить" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

const code = ref("");
const localError = ref("");
const resendCooldown = ref(0);

let cooldownTimer = null;

function handleCodeInput(event) {
  code.value = event.target.value.replace(/\D/g, "").slice(0, 8);
}

function startCooldown(seconds = 60) {
  clearInterval(cooldownTimer);
  resendCooldown.value = seconds;

  cooldownTimer = setInterval(() => {
    resendCooldown.value -= 1;

    if (resendCooldown.value <= 0) {
      clearInterval(cooldownTimer);
    }
  }, 1000);
}

async function submit() {
  localError.value = "";

  if (!/^\d{8}$/.test(code.value)) {
    localError.value = "Код должен состоять ровно из 8 цифр";
    return;
  }

  try {
    await authStore.verifyOtp(code.value);
    await router.replace("/account/details");
  } catch {
    localError.value =
      authStore.error || "Неверный или просроченный код";
  }
}

async function resendCode() {
  localError.value = "";

  if (!authStore.otpEmail) {
    await router.replace("/auth");
    return;
  }

  try {
    await authStore.requestOtp(authStore.otpEmail);
    startCooldown();
  } catch {
    localError.value =
      authStore.error || "Не удалось повторно отправить код";
  }
}

onMounted(() => {
  if (!authStore.otpEmail) {
    router.replace("/auth");
  }
});

onBeforeUnmount(() => {
  clearInterval(cooldownTimer);
});
</script>