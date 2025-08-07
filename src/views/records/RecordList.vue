<template>
  <div class="w-full">
    <div class="flex flex-row items-center justify-between p-1 mb-2">
      <div>
        <h2 class="mb-6 text-2xl font-bold text-blue-600">📋 Список записей</h2>
      </div>       
        <button class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700" @click="showModal = true">Добавить record</button>
    </div>
    
    <div class="p-1">
      <RecordTable :records="records" @getRecords = "getRecords" @edit="handleEdit"/>
    </div>  
    <StoreModal v-if="showModal" 
    @close="handleClose" :getRecords="getRecords"
    :record="selectedRecord"
    v-model:is-edit-mode="isEditMode" />

  </div>
</template>

<script>
import axios from '@/services/api'
import StoreModal from '@/components/record/RecordForm.vue'
import RecordTable from '@/components/record/RecordTable.vue'

export default {
  components:{
    RecordTable, StoreModal
  },
  data() {
    return {    
      records: [],
      showModal: false,
// for create record
      currencies: [],
      cashboxes: [],
      //for edit
      isEditMode: false,
      selectedRecord:null
    }
  },

  async mounted() {
    this.getRecords()
  },
  methods: {
    handleEdit(record) {
      this.selectedRecord = { ...record }; // копия объекта
      this.showModal = true;
      this.isEditMode = true;
    },
    handleClose(){
      this.showModal = false;
      this.selectedRecord = null;
      this.isEditMode = false;
      this.getRecords()

    },
     async getRecords(){
      const res = await axios.get('/records')
      this.records = res.data
    },

  },
}
</script>

