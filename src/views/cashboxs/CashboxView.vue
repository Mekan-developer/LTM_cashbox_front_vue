<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-row items-center justify-between p-1 mb-2">
      <h1 class="mb-6 text-2xl font-bold text-blue-600">Кассы</h1>
      <button @click="showModal = true" class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Добавить кассу</button>
    </div>
    <CashboxTable :cashboxes="cashboxes" :onRefresh="fetchCashboxes" @edit="handleEdit"/>
    <CashboxForm 
      v-if="showModal"
      v-model:showModalProps="showModal"
      v-model:onRefresh="fetchCashboxes"
      
      :cashbox="selectedCashbox"
      v-model:is-edit-mode="isEditMode"
      @close="handleClose"
      /> 
    
  </div>
</template>

<script>

import axios from '@/api/api';
import CashboxTable from '@/components/cashbox/CashboxTable.vue';
import CashboxForm from '@/components/cashbox/CashboxForm.vue';

export default {
  name: 'CashboxesView',
  components:{
    CashboxTable,
    CashboxForm
  },
  data() {
    return {
      cashboxes: [],
      showModal: false,
      isEditMode: false,
      selectedCashbox: null,
    
    }
  },
    methods:{
      handleEdit(cashbox) {
        this.selectedCashbox = { ...cashbox }; // копия объекта
        this.showModal = true;
        this.isEditMode = true;
      },
      async fetchCashboxes() {
        const res = await axios.get('/cashboxes');
        this.cashboxes = res.data;
      },
      handleClose(){
        this.selectedCashbox = null;
        this.showModal = false;
        this.isEditMode = false;
      }
    },
    mounted(){
      this.fetchCashboxes()
    }
 
}
</script>

<style scoped>
</style>
