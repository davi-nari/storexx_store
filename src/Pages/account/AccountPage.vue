<!-- <template>
  <div class="container min-h-[40vh] h-full mt-13! flex items-center">
    <AccountSidebar />
    <RouterView />
  </div>
</template>

<script setup>
import AccountSidebar from "@/components/account/AccountSidebar.vue";
</script>

<style scoped></style> -->
<template>
  <main class="container py-12!">
    <div class="grid items-start gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
      <AccountSidebar />

      <section class="min-w-0">
        <RouterView />
      </section>
    </div>
  </main>
</template>

<script setup>
import AccountSidebar from "@/components/account/AccountSidebar.vue";
</script>