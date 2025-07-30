<template>
  <div class="text-[13px]">
    <div class="flex">
      <AppSidebar v-if="showMenu" />

      <div :class="['main-content', { 'with-sidebar': showMenu }]" class="w-full h-[100vh] p-8 overflow-y-auto">
        <router-view />
      </div>

    </div>
    <AppFooter v-if="showMenu" />
  </div>
</template>

<script>
import AppSidebar from './components/layout/AppSidebar.vue'
import AppFooter from './components/layout/AppFooter.vue'

export default {
  components: { AppSidebar, AppFooter },
  computed: {
    showMenu() {
      return this.$route.path !== '/login';
    }
  }
}


</script>

<style>

</style>
