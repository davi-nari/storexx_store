```vue
<template>
  <div class="flex w-full max-w-xl flex-col gap-4">
    <h1 class="text-center text-3xl font-semibold">
      Введите 8-значный код, отправленный на почту
    </h1>

    <p v-if="authStore.otpEmail" class="text-center font-medium">
      {{ authStore.otpEmail }}
    </p>

    <p class="mb-6 text-center text-gray-500">
      Если код долго не приходит, проверьте папку «Спам» или
      <RouterLink
        to="/auth"
        class="underline transition-colors hover:text-black"
      >
        правильность ввода почты
      </RouterLink>.
    </p>

    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <div class="relative">
        <input
          ref="codeInput"
          v-model="code"
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="8"
          :disabled="authStore.isLoading"
          class="absolute inset-0 z-10 h-full w-full cursor-text opacity-0 disabled:cursor-not-allowed"
          aria-label="8-значный код подтверждения"
          @input="handleCodeInput"
          @focus="isCodeFocused = true"
          @blur="isCodeFocused = false"
        />

        <div
          class="mx-auto grid w-full max-w-lg grid-cols-8 gap-1.5 sm:gap-2"
          :class="{ 'opacity-60': authStore.isLoading }"
          @click="focusCodeInput"
        >
          <div
            v-for="(_, index) in 8"
            :key="index"
            class="grid aspect-square min-w-0 place-items-center rounded-lg border text-xl font-semibold transition-all sm:text-2xl"
            :class="getCodeBoxClass(index)"
          >
            {{ code[index] || "" }}
          </div>
        </div>
      </div>

      <p v-if="localError" class="text-center text-sm text-red-600">
        {{ localError }}
      </p>

      <button
        type="button"
        :disabled="authStore.isLoading || resendCooldown > 0"
        class="text-gray-500 underline transition-colors hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        @click="resendCode"
      >
        {{
          resendCooldown > 0
            ? `Отправить повторно через ${resendCooldown} сек.`
            : "Отправить код повторно"
        }}
      </button>

      <RouterLink
        to="/auth"
        class="m-auto text-gray-500 underline transition-colors hover:text-black"
      >
        Изменить почту
      </RouterLink>

      <button
        type="submit"
        :disabled="authStore.isLoading || code.length !== 8"
        class="mt-4 w-full rounded-full bg-black px-6 py-3 text-white duration-200 hover:bg-gray-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ authStore.isLoading ? "Проверяем..." : "Подтвердить" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

const codeInput = ref(null);
const code = ref("");
const localError = ref("");
const resendCooldown = ref(0);
const isCodeFocused = ref(false);

let cooldownTimer = null;

function focusCodeInput() {
  if (!authStore.isLoading) {
    codeInput.value?.focus();
  }
}

function handleCodeInput(event) {
  const sanitizedCode = event.target.value
    .replace(/\D/g, "")
    .slice(0, 8);

  code.value = sanitizedCode;
  event.target.value = sanitizedCode;
  localError.value = "";
}

function getCodeBoxClass(index) {
  const activeIndex =
    code.value.length === 8 ? 7 : code.value.length;

  if (localError.value) {
    return "border-red-500 bg-red-50 text-red-700";
  }

  if (isCodeFocused.value && index === activeIndex) {
    return "border-black bg-white ring-1 ring-black";
  }

  if (code.value[index]) {
    return "border-gray-400 bg-gray-50 text-black";
  }

  return "border-gray-300 bg-white";
}

function startCooldown(seconds = 60) {
  clearInterval(cooldownTimer);
  resendCooldown.value = seconds;

  cooldownTimer = setInterval(() => {
    resendCooldown.value -= 1;

    if (resendCooldown.value <= 0) {
      clearInterval(cooldownTimer);
      cooldownTimer = null;
    }
  }, 1000);
}

async function submit() {
  localError.value = "";

  if (!/^\d{8}$/.test(code.value)) {
    localError.value = "Код должен состоять ровно из 8 цифр";
    focusCodeInput();
    return;
  }

  try {
    await authStore.verifyOtp(code.value);
    await router.replace("/account/details");
  } catch {
    localError.value =
      authStore.error || "Неверный или просроченный код";

    code.value = "";

    await nextTick();
    focusCodeInput();
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

    code.value = "";
    startCooldown();

    await nextTick();
    focusCodeInput();
  } catch {
    localError.value =
      authStore.error || "Не удалось повторно отправить код";
  }
}

onMounted(async () => {
  if (!authStore.otpEmail) {
    await router.replace("/auth");
    return;
  }

  startCooldown();

  await nextTick();
  focusCodeInput();
});

onBeforeUnmount(() => {
  clearInterval(cooldownTimer);
});
</script>
```
