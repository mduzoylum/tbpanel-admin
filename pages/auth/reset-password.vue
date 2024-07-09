
<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div class="grid grid-cols-1">
      <img class="w-auto" src="/logo-dark.png" :alt="this.$config.public.APP_NAME" />
      <h2 class="mt-5 text-l text-white underline decoration-blue-600">{{ $t('auth.resetPassword') }}</h2>
    </div>
    <div class="mt-8">
      <div class="mt-6">
        <AuthReset></AuthReset>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});
</script>