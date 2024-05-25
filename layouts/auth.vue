<template>

  fdfd

  <div class=" font-barlow">
    <div class="  flex flex-col flex-1">

      <main class="flex-1 ">
        <slot/>
      </main>
      <div
          class="bg-indigo-500 text-indigo-500 bg-yellow-500 text-yellow-500 bg-blue-500 text-blue-500 bg-green-500 text-green-500 text-red-500 bg-red-500 "></div>
    </div>
  </div>
</template>

<script setup>

const {$isDarkMode} = useNuxtApp();

const { locale } = useI18n();

useHead({
  bodyAttrs: {
    class: 'h-full bg-white dark:bg-slate-800 dark:text-white'
  },
  htmlAttrs: {
    class: 'h-full' + ($isDarkMode == 1 ? ' dark' : ''),
    dir: locale.value === 'ar' ? 'rtl' : 'ltr'
  },
  title: 'ToptancımBurada Fabrika Paneli',
  link: []
})

</script>

<script>
export default {
  mounted() {
    try {
      const params = new URLSearchParams(window.location.search);
      const currentPage = this.$route.name;

      const message = {
        page: currentPage,
        params: Object.fromEntries(params.entries()),
      };

      console.log(message)
      window.parent.postMessage(message, '*');
    } catch (e) {

    }
  }
}
</script>