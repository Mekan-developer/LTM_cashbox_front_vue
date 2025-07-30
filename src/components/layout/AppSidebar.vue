<template>
  <aside class="w-[286px] h-screen space-y-4 bg-[#8a9cfa] shadow text-white flex flex-col justify-between">
    <div>
      <div class=" relative flex justify-center items-center h-[80px]">
        <div class="flex justify-center items-center h-[25px] aspect-square cursor-pointer bg-blue-500 rounded-full text-white absolute right-[-13px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        <h1 class="text-xl font-semibold">💰 Cash Management</h1>

      </div>
      <nav class="">
        <RouterLink to="/analytics" active-class ='font-bold text-white bg-blue-500' class="flex items-center pl-6 hover:bg-blue-500 hover:text-white h-[45px]">📈 Аналитика</RouterLink>
        <router-link to="/cashboxes" active-class='font-bold text-white bg-blue-500' class="flex items-center pl-6 hover:bg-blue-500 hover:text-white h-[45px]">🏦 Кассы</router-link>
        <RouterLink to="/currencies" active-class='font-bold text-white bg-blue-500' class="flex items-center pl-6 hover:bg-blue-500 hover:text-white h-[45px]">💱 Валюты</RouterLink>
        <RouterLink to="/records" active-class='font-bold text-white bg-blue-500' class="flex items-center pl-6 hover:bg-blue-500 hover:text-white h-[45px]">📊 Записи </RouterLink>
        <RouterLink to="/user" active-class='font-bold text-white bg-blue-500' class="flex items-center pl-6 hover:bg-blue-500 hover:text-white h-[45px]"> пользователи</RouterLink>
      </nav>
    </div>

    <div class="flex flex-row justify-between w-full gap-4">
      <div>
        <span v-if="user" class="flex flex-row items-center gap-2 font-bold text-white">{{ user.name }} {{ user.role }}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" 
              stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
            <path d="M20 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M4 21v-2a4 4 0 0 1 3-3.87"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </span>
      </div>

      <button class="flex items-center gap-2 px-4 py-1 text-white bg-blue-500 rounded cursor-pointer"  @click="logout">
        Выйти
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-log-out">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
   
  </aside>
</template>

<script>

import { useRoute } from 'vue-router'

export default {
  name: 'AppSidebar',

   setup() {
    const route = useRoute()

    const isActive = (path) => {
      return route.path.startsWith(path)
    }
    return { isActive }
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
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
  
}
</script>
