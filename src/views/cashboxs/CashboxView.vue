<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-row items-center justify-between p-1 mb-2">
      <h1 class="mb-6 text-2xl font-bold text-blue-600">Кассы</h1>
      <button @click="showModal = true" class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Добавить кассу</button>
    </div>
    <CashboxTable :cashboxes="cashboxes" :onRefresh="fetchCashboxes"/>
    <StoreModal v-model:showModalProps="showModal" v-model:onRefresh="fetchCashboxes"/> 
    
  </div>
</template>

<script>

import axios from '@/api/api';
import CashboxTable from '@/components/cashbox/CashboxTable.vue'
import StoreModal from '@/components/cashbox/StoreModal.vue'

export default {
  name: 'CashboxesView',
  components:{
    CashboxTable,
    StoreModal
  },
  data() {
    return {
      cashboxes: [],
      showModal: false,
    
    }
  },
    methods:{
      async fetchCashboxes() {
        const res = await axios.get('/cashboxes');
        this.cashboxes = res.data;
      },
    },
    mounted(){
      this.fetchCashboxes()
    }
 
}
</script>

<style scoped>
</style>
