<template>
  <div class="w-full flex flex-col gap-6">
    <div
      class="w-20.5 h-20.5 border border-gray-300 bg-[#f8f8f8] rounded-full grid place-items-center font-semibold text-3xl mb-3"
    >
      И
    </div>
    <div class="flex gap-4 justify-between">
      <label class="flex flex-col gap-3 text-sm font-medium w-full">
        Имя и фамилия
        <input
          type="text"
          placeholder="Имя и фамилия"
          class="border-gray-300 border rounded-md py-3 px-4 focus:outline-none"
        />
      </label>
      <label class="flex flex-col gap-3 text-sm font-medium w-full">
        Телефон
        <input
          type="text"
          placeholder="+998(xx)xxx-xx-xx"
          class="border-gray-300 border rounded-md py-3 px-4 focus:outline-none"
        />
      </label>
      <label class="flex flex-col gap-3 text-sm font-medium w-full">
        E-mail
        <input
          type="text"
          placeholder="email@example.com"
          class="border-gray-300 border rounded-md py-3 px-4 focus:outline-none"
        />
      </label>
    </div>
    <button
      class="bg-black self-end text-white py-3 px-6 rounded-full hover:bg-gray-800 duration-200 focus:outline-none mt-4"
    >
      Сохранить
    </button>
  </div>
</template>

<script setup></script>

<style scoped></style>
