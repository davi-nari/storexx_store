<template>
  <form class="flex w-full flex-col gap-6" @submit.prevent="handleSubmit">
    <div class="mb-8 flex items-center gap-5">
      <div
        class="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-gray-300 bg-gray-50 text-2xl font-semibold"
      >
        {{ userInitial }}
      </div>

      <div>
        <h2 class="text-xl font-semibold">Основная информация</h2>

        <p class="mt-1 text-sm text-gray-500">
          Укажите данные, которые будут использоваться при оформлении заказов.
        </p>
      </div>
    </div>

    <p
      v-if="mustCompleteProfile"
      class="rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      Для продолжения заполните имя и номер телефона.
    </p>

    <div class="flex flex-col justify-between gap-4 lg:flex-row">
      <label class="flex w-full flex-col gap-3 text-sm font-medium">
        Имя и фамилия

        <div class="relative">
          <input
            v-model.trim="fullName"
            type="text"
            autocomplete="name"
            placeholder="Имя и фамилия"
            class="w-full rounded-md border border-gray-300 px-4 py-3 pr-11 focus:outline-none"
            :class="{ 'border-red-500': submitted && !fullName }"
          />

          <span
            v-if="fullName"
            class="absolute inset-y-0 right-4 grid place-items-center text-xl text-green-500"
            aria-label="Имя заполнено"
          >
            ✓
          </span>
        </div>
      </label>

      <label class="flex w-full flex-col gap-3 text-sm font-medium">
        Телефон

        <div class="relative">
          <input
            :value="phone"
            type="tel"
            inputmode="numeric"
            autocomplete="tel"
            placeholder="+998(xx)xxx-xx-xx"
            maxlength="17"
            class="w-full rounded-md border border-gray-300 px-4 py-3 pr-11 focus:outline-none"
            :class="{ 'border-red-500': submitted && !isPhoneValid }"
            @input="handlePhoneInput"
          />

          <span
            v-if="isPhoneValid"
            class="absolute inset-y-0 right-4 grid place-items-center text-xl text-green-500"
            aria-label="Телефон заполнен"
          >
            ✓
          </span>
        </div>
      </label>

      <label class="flex w-full flex-col gap-3 text-sm font-medium">
        E-mail

        <input
          :value="authStore.user?.email || ''"
          type="email"
          readonly
          aria-readonly="true"
          class="cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-gray-600 focus:outline-none"
        />
      </label>
    </div>

    <p v-if="errorMessage" class="text-sm text-red-600">
      {{ errorMessage }}
    </p>

    <button
      type="submit"
      class="mt-4 self-end rounded-full bg-black px-6 py-3 text-white duration-200 hover:bg-gray-800 focus:outline-none"
    >
      Сохранить
    </button>
  </form>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const fullName = ref(authStore.user?.full_name || "");
const phone = ref(formatPhone(authStore.user?.phone || ""));
const submitted = ref(false);
const errorMessage = ref("");

const mustCompleteProfile = computed(() => {
  return (
    route.query.completeProfile === "1" ||
    !authStore.user?.full_name?.trim() ||
    !authStore.user?.phone?.trim()
  );
});

const userInitial = computed(() => {
  const source = fullName.value || authStore.user?.email || "?";

  return source.trim().charAt(0).toUpperCase();
});

const isPhoneValid = computed(() => {
  return /^\+998\(\d{2}\)\d{3}-\d{2}-\d{2}$/.test(phone.value);
});

function formatPhone(value) {
  let digits = String(value).replace(/\D/g, "");

  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }

  digits = digits.slice(0, 9);

  let result = "+998";

  if (digits.length > 0) {
    result += `(${digits.slice(0, 2)}`;
  }

  if (digits.length >= 2) {
    result += ")";
  }

  if (digits.length > 2) {
    result += digits.slice(2, 5);
  }

  if (digits.length > 5) {
    result += `-${digits.slice(5, 7)}`;
  }

  if (digits.length > 7) {
    result += `-${digits.slice(7, 9)}`;
  }

  return result;
}

function handlePhoneInput(event) {
  phone.value = formatPhone(event.target.value);
  event.target.value = phone.value;
}

async function handleSubmit() {
  submitted.value = true;
  errorMessage.value = "";

  if (!fullName.value) {
    errorMessage.value = "Введите имя и фамилию.";
    return;
  }

  if (!isPhoneValid.value) {
    errorMessage.value =
      "Введите телефон полностью в формате +998(xx)xxx-xx-xx.";
    return;
  }

  const updatedUser = {
    ...authStore.user,
    full_name: fullName.value,
    phone: phone.value,
  };

  authStore.user = updatedUser;
  localStorage.setItem("auth_user", JSON.stringify(updatedUser));

  await router.replace({
    name: "account-details",
  });
}
</script>

<style scoped></style>

<!-- <template>
  <form
    class="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
    @submit.prevent="handleSubmit"
  >
    <div class="mb-8 flex items-center gap-5">
      <div
        class="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-gray-300 bg-gray-50 text-2xl font-semibold"
      >
        {{ userInitial }}
      </div>

      <div>
        <h2 class="text-xl font-semibold">Основная информация</h2>

        <p class="mt-1 text-sm text-gray-500">
          Укажите данные, которые будут использоваться при оформлении заказов.
        </p>
      </div>
    </div>

    <div
      v-if="mustCompleteProfile"
      class="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      Для продолжения заполните имя и номер телефона.
    </div>

    <div class="grid gap-5 md:grid-cols-2">
      <label class="flex flex-col gap-2 text-sm font-medium">
        Имя и фамилия

        <div class="relative">
          <input
            v-model.trim="fullName"
            type="text"
            autocomplete="name"
            placeholder="Имя и фамилия"
            class="w-full rounded-lg border px-4 py-3 pr-11 outline-none transition"
            :class="
              submitted && !fullName
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-black'
            "
          />

          <span
            v-if="fullName"
            class="absolute inset-y-0 right-4 grid place-items-center text-lg text-green-500"
            aria-label="Имя заполнено"
          >
            ✓
          </span>
        </div>
      </label>

      <label class="flex flex-col gap-2 text-sm font-medium">
        Телефон

        <div class="relative">
          <input
            :value="phone"
            type="tel"
            inputmode="numeric"
            autocomplete="tel"
            placeholder="+998(xx)xxx-xx-xx"
            maxlength="17"
            class="w-full rounded-lg border px-4 py-3 pr-11 outline-none transition"
            :class="
              submitted && !isPhoneValid
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-black'
            "
            @input="handlePhoneInput"
          />

          <span
            v-if="isPhoneValid"
            class="absolute inset-y-0 right-4 grid place-items-center text-lg text-green-500"
            aria-label="Телефон заполнен"
          >
            ✓
          </span>
        </div>
      </label>

      <label class="flex flex-col gap-2 text-sm font-medium md:col-span-2">
        E-mail

        <input
          :value="authStore.user?.email || ''"
          type="email"
          readonly
          aria-readonly="true"
          class="cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500 outline-none"
        />

        <span class="text-xs font-normal text-gray-400">
          Адрес электронной почты привязан к аккаунту и не может быть изменён.
        </span>
      </label>
    </div>

    <div class="mt-6 min-h-5">
      <p v-if="errorMessage" class="text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <p v-else-if="successMessage" class="text-sm text-green-600">
        {{ successMessage }}
      </p>
    </div>

    <div class="mt-4 flex justify-end">
      <button
        type="submit"
        class="rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="isSaving"
      >
        {{ isSaving ? "Сохранение..." : "Сохранить" }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const fullName = ref(authStore.user?.full_name || "");
const phone = ref(formatPhone(authStore.user?.phone || ""));

const submitted = ref(false);
const isSaving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const mustCompleteProfile = computed(() => {
  return (
    route.query.completeProfile === "1" ||
    !authStore.user?.full_name?.trim() ||
    !authStore.user?.phone?.trim()
  );
});

const userInitial = computed(() => {
  const source = fullName.value || authStore.user?.email || "?";

  return source.trim().charAt(0).toUpperCase();
});

const isPhoneValid = computed(() => {
  return /^\+998\(\d{2}\)\d{3}-\d{2}-\d{2}$/.test(phone.value);
});

function formatPhone(value) {
  let digits = String(value).replace(/\D/g, "");

  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }

  digits = digits.slice(0, 9);

  let result = "+998";

  if (digits.length > 0) {
    result += `(${digits.slice(0, 2)}`;
  }

  if (digits.length >= 2) {
    result += ")";
  }

  if (digits.length > 2) {
    result += digits.slice(2, 5);
  }

  if (digits.length > 5) {
    result += `-${digits.slice(5, 7)}`;
  }

  if (digits.length > 7) {
    result += `-${digits.slice(7, 9)}`;
  }

  return result;
}

function handlePhoneInput(event) {
  phone.value = formatPhone(event.target.value);
  event.target.value = phone.value;
}

async function handleSubmit() {
  submitted.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  if (!fullName.value) {
    errorMessage.value = "Введите имя и фамилию.";
    return;
  }

  if (!isPhoneValid.value) {
    errorMessage.value =
      "Введите телефон полностью в формате +998(xx)xxx-xx-xx.";
    return;
  }

  isSaving.value = true;

  try {
    const updatedUser = {
      ...authStore.user,
      full_name: fullName.value,
      phone: phone.value,
    };

    authStore.user = updatedUser;
    localStorage.setItem("auth_user", JSON.stringify(updatedUser));

    successMessage.value = "Данные успешно сохранены.";

    await router.replace({
      name: "account-details",
    });
  } finally {
    isSaving.value = false;
  }
}
</script> -->