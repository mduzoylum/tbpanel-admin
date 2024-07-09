
<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div class="grid grid-cols-1">
      <img class="w-auto" src="/logo-dark.png" :alt="this.$config.public.APP_NAME" />
      <h1 class="mt-5 text-l text-white">{{ $t('auth.forgetPassword') }}</h1>
    </div>
    <div class="mt-8">
      <div class="mt-6">
        <AuthRecover></AuthRecover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      config : null
    }
  },
  methods : {

  },
  mounted(){

  },
  setup(){
    definePageMeta({
      layout: "auth",
    });
  }
}

</script>