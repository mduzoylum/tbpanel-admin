<template>
  <div class="flex h-screen bg-gray-50 dark:bg-slate-900">
    <div class="w-1/3 border-r dark:border-slate-700 p-4 bg-white dark:bg-slate-800 overflow-y-auto">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mesajlar</h2>

      <div v-if="isUsersLoading" class="flex justify-center items-center h-full">
        <svg class="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      </div>

      <ul v-else>
        <li v-for="user in users" :key="user.id"
            @click="selectUser(user.user)"
            class="cursor-pointer p-2 mb-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
          <div class="flex items-center">
            <img class="h-10 w-10 rounded-full" src="https://via.placeholder.com/150" alt="User Avatar">
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user.user.name }} {{ user.user.surname }}</p>
              <p class="text-sm text-gray-500 dark:text-slate-400">{{ user.last_message_time }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="flex-1 p-4 bg-white dark:bg-slate-800 flex flex-col">
      <!-- Seçilen Kullanıcıyla Mesajlaşma Ekranı -->
      <div ref="messageContainer" v-if="selectedUser" class="flex-1 p-4 overflow-y-auto space-y-4">
        <div v-for="message in messages" :key="message.id">
          <div v-if="message.user_type == 'customer'" class="flex items-end space-x-3">
            <img class="h-8 w-8 rounded-full" src="https://via.placeholder.com/150" alt="User Avatar">
            <div class="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-sm text-gray-900 dark:text-white">
              {{ message.message }}
            </div>
          </div>
          <div v-else class="flex justify-end">
            <div class="bg-indigo-500 text-white p-3 rounded-lg shadow-sm">
              {{ message.message }}
            </div>
          </div>
        </div>

        <div v-if="isLoading" class="fixed bottom-0 left-0 w-full flex justify-center items-center py-2">
          <svg class="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        </div>
      </div>

      <div v-else class="flex-1 flex items-center justify-center text-gray-500 dark:text-slate-400">
        Bir kullanıcı seçin...
      </div>

      <div v-if="selectedUser" class="border-t dark:border-slate-700 p-4 bg-white dark:bg-slate-800 flex items-center space-x-3">
        <input type="text" placeholder="Bir mesaj yaz..." v-model="message" @keyup.enter="sendMessage"
               class="flex-1 p-2 border rounded-lg focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
        <button class="p-2 bg-indigo-500 text-white rounded-full" @click="sendMessage" :disabled="isLoading">
          <PaperAirplaneIcon class="h-6 w-6 transform rotate-90"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { PaperAirplaneIcon } from '@heroicons/vue/outline';
import { nextTick } from 'vue';

export default {
  components: {
    PaperAirplaneIcon,
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      messages: [],
      message: '',
      isLoading: false,
      isUsersLoading: false,
    };
  },
  methods: {
    getUsers() {
      this.isUsersLoading = true;
      this.$apiFetch('messages/user-list', {
        method: 'GET',
      }).then((response) => {
        this.users = response;
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        this.isUsersLoading = false;
      });
    },
    selectUser(user) {
      this.selectedUser = user;
      this.getMessages();
    },
    getMessages() {
      if (!this.selectedUser) return;

      this.isLoading = true;
      this.$apiFetch(`messages/get/${this.selectedUser.id}`, {
        method: 'GET',
      }).then((response) => {
        this.messages = response;
        this.scrollToBottom();
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        this.isLoading = false;
      });
    },
    sendMessage() {
      if (this.message.trim() === '' || !this.selectedUser) return;

      this.isLoading = true;
      this.$apiFetch('messages/set/' + this.selectedUser.id, {
        method: 'POST',
        body: {
          message: this.message,
        },
      }).then(() => {
        this.getMessages();
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        this.message = '';
      });
    },
    scrollToBottom() {
      nextTick(() => {
        const container = this.$refs.messageContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  },
  mounted() {
    this.getUsers();
  },
  updated() {
    this.scrollToBottom();
  }
};
</script>
