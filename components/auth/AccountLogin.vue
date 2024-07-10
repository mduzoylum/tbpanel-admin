<template>
  <div class="w-full">

    <form @submit.prevent="login">
      <div class="space-y-6">

        <div>
          <label for="email" class="block text-sm font-medium text-white"> {{ $t('auth.email') }} </label>
          <div class="mt-1">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required=""
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
          </div>
        </div>
        <div class="space-y-1">
          <label for="password" class="block text-sm font-medium text-white"> {{ $t('auth.password') }} </label>
          <div class="mt-1">
            <input v-model="password" id="password" name="password" type="password"
                   autocomplete="current-password" required=""
                   class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <!--                <div class="flex items-center">-->
          <!--                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />-->
          <!--                  <label for="remember-me" class="ml-2 block text-sm text-gray-900"> {{ $t('auth.rememberMe') }} </label>-->
          <!--                </div>-->
          <div>
            <button type="submit" :disabled='saving'
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700">
              <UiSpinner v-if="saving"></UiSpinner>
              {{ $t('auth.login') }}
            </button>
          </div>

          <NuxtLink to="/auth/recover?type=accounts" class="text-sm font-medium text-white hover:text-green-500">
            {{ $t('auth.forgotPassword') }}
          </NuxtLink>
          <NuxtLink v-if="isRegisterPageActive" to="/auth/register" class="text-sm font-medium text-white hover:text-green-500">
            {{ $t('connective.or') }} {{ $t('auth.register') }}
          </NuxtLink>
        </div>
      </div>
    </form>
    <UiNotification ref="notification"></UiNotification>
  </div>
</template>

<script>

export default {
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
    }
  },

  methods: {
    setUserDataToLocalStorage(data) {
      window.localStorage.setItem('account-token', data.token);
      window.localStorage.setItem('name', data.name)
      window.localStorage.setItem('surname', data.surname)
      window.localStorage.setItem('email', JSON.stringify(data.email))
      window.localStorage.setItem('loginDate', data.token_iat)
      window.localStorage.setItem('tokenExp', data.token_exp)
    },
    login() {
      let self = this;
      self.saving = true;

      this.$apiFetch('/accounts/login', {
        method: "POST",
        body: {
          email: this.email,
          password: this.password,
          processType: 'login'
        }
      }).then(function (response) {

        self.setUserDataToLocalStorage(response.data);
        self.$refs.notification.success(self.$t('success_login'));
        setTimeout(() => {
          window.location.reload();
        }, 200)

      }).catch(err => {
        self.$refs.notification.error(err.data.message);
      }).finally(() => {
        self.saving = false;
      });

    }
  },
  mounted() {

  },

};
</script>