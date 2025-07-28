// AppHeader.vue
<template>
  <header class="flex items-center justify-between p-4 bg-[#8a9cfa] shadow text-white">
    <h1 class="text-xl font-semibold">💰 Cash Management</h1>
    <div class="flex flex-row gap-4">
       <span v-if="user" class="flex flex-row items-center gap-2 font-bold text-white">{{ user.name }} {{ user.role }} 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" 
              stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
            <path d="M20 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M4 21v-2a4 4 0 0 1 3-3.87"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </span>

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
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
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