<template>
  <div class="w-full">
    <div class="flex flex-row items-center justify-between p-4 mb-6">
      <div>
        <h2 class="mb-6 text-2xl font-bold text-blue-600">📋 Список записей</h2>
      </div>       
        <button class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700" @click="showModal = true">Добавить record</button>
    </div>
    
    <div class="p-4">
      <RecordTable />
    </div>
  
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-end bg-[#000000e1] text-[14px]">
      <div class="relative h-full pb-6 bg-gray-50">
        <div class="absolute top-0 left-0 flex justify-center items-center w-[40px] rounded-full aspect-square border-[1px] cursor-pointer border-gray-300" @click="showModal = false">
          
            <svg width="24" height="24" class="text-red-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>

        <div class=" flex justify-center items-center border-b-2 border-b-gray-300 w-full h-[40px]">
          <span class="text-blue-500">создать запись</span>
        </div>
       
        <form @submit.prevent="submitRecord" class="w-[400px] p-4 h-full overflow-y-scroll flex flex-col gap-2 ">
          <div>
            <label for="kassa">Касса</label>
            <select v-model="form.cashbox_id" class="input" id="kassa">
              <option value="">-- Выбрать --</option>
              <option v-for="box in cashboxes" :key="box.id" :value="box.id">{{ box.title }}</option>
            </select>
          </div>
  
          <div>
            <label>Тип записи</label>
            <select v-model="form.type" class="input">
              <option value="1">Доход</option>
              <option value="0">Расход</option>
            </select>
          </div>
  
          <div>
            <label for="sum">Сумма</label>
            <input type="number" v-model="form.original_amount" class="input" id="sum" />
          </div>
  
          <div>
            <label>Валюта</label>
            <select v-model="form.original_currency" class="input">
              <option value="">-- Выбрать --</option>
              <option v-for="cur in currencies" :key="cur.code" :value="cur.code">{{ cur.name }}</option>
            </select>
          </div>
  
          <div>
            <label>Дата</label>
            <input type="date" v-model="form.date" class="input" />
          </div>
  
          <div>
            <label>Описание статьи</label>
            <input type="text" v-model="form.article_description" class="input" />
          </div>
  
          <!-- ✅ Новый чекбокс -->
          <div class="flex items-center space-x-2">
            <input type="checkbox" v-model="form.is_debt" id="is_debt" />
            <label for="is_debt">Записать как долг</label>
          </div>
  
          <!-- ✅ Новые поля: ссылка и объект -->
          <div>
            <label>Ссылка</label>
            <input type="text" v-model="form.link" class="input" />
          </div>
  
          <div>
            <label>Объект</label>
            <input type="text" v-model="form.object" class="input" />
          </div>
  
          <button type="submit" class="text-white w-full mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
            Сохранить запись
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/api'
import RecordTable from '@/components/RecordTable.vue'

export default {
  components:{
    RecordTable
  },
  data() {
    return {    
      records: [],
      loading: true,
      showModal: false,
// for create record
      currencies: [],
      cashboxes: [],
      form: {
        cashbox_id: '',
        type: 1,
        original_amount: '',
        original_currency: '',
        date: new Date().toISOString().split('T')[0],
        article_description: '',
        is_debt: false,
        link: '',
        object: '',
      },
    }
  },

  async mounted() {
    const [currencyRes, cashboxRes] = await Promise.all([
      axios.get('/currencies'),
      axios.get('/cashboxes'),
    ])
    this.currencies = currencyRes.data
    this.cashboxes = cashboxRes.data
    this.loadRecords()
  },


  methods: {
    async loadRecords() {
      const res = await axios.get('/records')
      this.records = res.data
      this.loading = false
    },

   async submitRecord() {
      try {
        console.log(this.form);
        await axios.post('/records', this.form)
        alert('Запись успешно добавлена!')
        this.$router.push('/records')
      } catch (e) {
        alert('Ошибка при сохранении')
        console.error(e)
      }
    }
  },
}




</script>
<style scoped>
label{
  margin:0;
}
</style>
