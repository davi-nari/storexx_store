<template>
  <div class="container min-h-[40vh] h-full mt-13! flex items-center">
    <AccountSidebar />
    <RouterView />
  </div>
</template>

<script setup>
import AccountSidebar from "@/components/account/AccountSidebar.vue";
</script>

<style scoped></style>
