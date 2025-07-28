<template>
  <aside class="w-64 h-screen space-y-4 bg-[#a5b4fc]">
    <nav class="">
      <RouterLink to="/analytics" active-class ='font-bold text-white bg-blue-500' class="flex items-center pl-6 hover:bg-blue-500 hover:text-white h-[45px]">📈 Аналитика</RouterLink>
      <router-link to="/cashboxes" active-class='font-bold text-white bg-blue-500' class="flex items-center pl-6 hover:bg-blue-500 hover:text-white h-[45px]">🏦 Кассы</router-link>
      <RouterLink to="/currencies" active-class='font-bold text-white bg-blue-500' class="flex items-center pl-6 hover:bg-blue-500 hover:text-white h-[45px]">💱 Валюты</RouterLink>
      <RouterLink to="/records" active-class='font-bold text-white bg-blue-500' class="flex items-center pl-6 hover:bg-blue-500 hover:text-white h-[45px]">📊 Записи</RouterLink>
    </nav>
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
  
}
</script>
