<template>

  <aside class="w-[286px] h-screen space-y-4 bg-gray-800 shadow text-white flex flex-col justify-between">
    <div>
      <div class=" relative flex justify-center items-center h-[80px]">
        
        <h1 class="flex gap-2 text-xl font-semibold border-b-2 border-gray-300"><Signal /> Cash Management</h1>

      </div>
      <nav class="">
        <RouterLink to="/analytics" active-class ='font-bold text-gray-100 bg-gray-700' class="flex items-center gap-2 text-center text-gray-300 pl-6 hover:bg-gray-700 hover:text-gray-100 h-[45px]"><ChartNoAxesCombined /> Аналитика</RouterLink>
        <router-link to="/cashboxes" active-class ='font-bold text-gray-100 bg-gray-700' class="flex items-center gap-2 text-center text-gray-300 pl-6 hover:bg-gray-700 hover:text-gray-100 h-[45px]"><Coins /> Кассы</router-link>
        <RouterLink to="/currencies" active-class ='font-bold text-gray-100 bg-gray-700' class="flex items-center gap-2 text-center text-gray-300 pl-6 hover:bg-gray-700 hover:text-gray-100 h-[45px]"><ChartCandlestick /> Валюты</RouterLink>
        <RouterLink to="/records" active-class ='font-bold text-gray-100 bg-gray-700' class="flex items-center gap-2 text-center text-gray-300 pl-6 hover:bg-gray-700 hover:text-gray-100 h-[45px]"><ArchiveRestore /> Записи </RouterLink>
        <RouterLink to="/user" active-class ='font-bold text-gray-100 bg-gray-700' class="flex items-center gap-2 text-center text-gray-300 pl-6 hover:bg-gray-700 hover:text-gray-100 h-[45px]"><UserCog /> пользователи</RouterLink>
      </nav>
    </div>

    <div class="flex flex-col items-center justify-between w-full gap-4 bg-[#08094627] border-t-2 shadow border-gray-800">
      <!-- <div class="flex justify-center w-full gap-6">
        <span v-if="user" class="flex flex-row items-center gap-2 font-bold text-white">{{ user.name }} {{ user.role }}
        </span>
        <UserRound />
      </div> -->

      <button class="flex items-center justify-center gap-4 w-full text-[16px] px-4 py-4 text-white bg-gray-700 rounded cursor-pointer"  @click="logout">
        Выйти
        <LogOut />
      </button>
    </div>
   
  </aside>
</template>

<script>

import { useRoute } from 'vue-router'

export default {
  name: 'AppSidebar',

   data() {
    return {
      route: useRoute()
    };
  },
  computed: {
    user() {
      // Обычно данные пользователя хранят в store или localStorage
      try {
        return JSON.parse(localStorage.getItem('user'));
      } catch {
        return null;
      }
    }
  },
  methods: {
    isActive(path) {
      return this.route.path.startsWith(path);
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
  
}
</script>
<script setup>
import { ArchiveRestore, ChartCandlestick, ChartNoAxesCombined, Coins, LogOut, Signal, UserCog } from 'lucide-vue-next';

</script>
