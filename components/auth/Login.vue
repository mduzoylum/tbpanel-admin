<template>
  <div class="w-full">

    <form @submit.prevent="login">
      <div class="space-y-6">

        <div>
          <label for="email" class="block text-sm font-medium text-white"> {{ $t('auth.email') }} </label>
          <div class="mt-1">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required=""
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
          </div>
        </div>
        <div class="space-y-1">
          <label for="password" class="block text-sm font-medium text-white"> {{ $t('auth.password') }} </label>
          <div class="mt-1">
            <input v-model="password" id="password" name="password" type="password"
                   autocomplete="current-password" required=""
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <button type="submit" :disabled='saving'
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
              <UiSpinner v-if="saving"></UiSpinner>
              {{ $t('auth.login') }}
            </button>
          </div>

          <NuxtLink to="/auth/recover" class="text-sm font-medium text-white hover:text-blue-600">
            {{ $t('auth.forgetPassword') }}
          </NuxtLink>
        </div>
      </div>

    </form>
    <UiNotification ref="notification"></UiNotification>
  </div>
</template>

<script>

export default {
  setup() {
  },
  data() {
    return {
      saving: false,
      email: "",
      password: ""
    };
  },
  watch: {
    email: function (val) {
      this.email = val.toLowerCase().split('').filter(char => char.match(/[a-z0-9@._]/)).join('');
    },
  },

  methods: {
    login() {
      let self = this;
      self.saving = true;

      this.$apiFetch('auth/login', {
        method: "POST",
        body: {
          email: this.email,
          password: this.password,
        }
      }).then(function (response) {
        self.$setSessionData(response.data);
        self.$refs.notification.success(self.$t('success_login'));
        setTimeout(() => {

          if (localStorage.getItem('last-page') != null)
            window.location.href = localStorage.getItem('last-page')
          else
            window.location.href = '/'
        }, 200)

      }).catch(err => {
        console.log(err)
        self.$refs.notification.error(err.data.message);
      }).finally(() => {
        self.saving = false;
      });
    },
  },
  mounted() {

  },

};
</script>