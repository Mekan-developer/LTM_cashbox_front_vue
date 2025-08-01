<template>
  <div class="w-full">
    <div class="flex flex-row items-center justify-between p-1 mb-2">
      <div>
        <h2 class="mb-6 text-2xl font-bold text-blue-600">📋 Список записей</h2>
      </div>       
        <button class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700" @click="showModal = true">Добавить record</button>
    </div>
    
    <div class="p-1">
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
       
        <form @submit.prevent="submitRecord" class="relative w-[400px] p-4 pl-6 pb-24 h-full overflow-y-scroll flex flex-col gap-2 ">
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
            <label>Валюта</label>
            <select v-model="form.original_currency" class="input">
              <option value="">-- Выбрать --</option>
              <option v-for="cur in currencies" :key="cur.code" :value="cur.code">{{ cur.name }}</option>
            </select>
          </div>

          <div>
            <label for="sum">Сумма</label>
            <input type="number" v-model="form.original_amount" class="input" id="sum" :disabled="!form.original_currency"/>
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
          <div class="flex justify-between gap-2">
            <div class="flex-1 text-center flex-col flex justify-center text-blue-500 h-[56px] rounded border-2 border-gray-400">
              <span>Валюта кассы</span>
              <span>{{ kassaCurrencyCode }}</span>
            </div>
            <div class="flex-1 text-center flex-col flex justify-center text-blue-500 h-[56px] rounded border-2 border-gray-400">
              <span>Сумма кассы</span>
              <span>{{ cashboxAmount }}</span>
            </div>
          </div>

          <div class="fixed bottom-0 w-full bg-white">
            <button type="submit" class=" w-[350px]  text-white mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
              Сохранить запись
            </button>
          </div>
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
        object: ''        
      },
      // dlya wichisleniye
      kassaCurrencyCode:'?',
      relativeCurrencyCode: 'USD',
      cashboxCurrencyRate:null,
      orginalAmount:null,
      orginalCurrencyCode:'',
      orginalExchangeRate: '',
      cashboxAmount:0
    }
  },

  async mounted() {
    const [currencyRes, cashboxRes] = await Promise.all([
      axios.get('/currencies'),
      axios.get('/cashboxes'),
    ])
    this.currencies = currencyRes.data
    this.cashboxes = cashboxRes.data
    console.log('currencies: ',this.currencies)
    console.log('cashboxes: ', this.cashboxes)
    this.loadRecords()
  },


  watch: {
    'form.cashbox_id'(newCashboxId) {
      const selectedBox = this.cashboxes.find(box => box.id === newCashboxId);
      if (selectedBox && selectedBox.currency_id) {
        const selectedCurrency = this.currencies.find(currency => currency.id === selectedBox.currency_id);
        this.cashboxCurrencyRate = selectedCurrency.exchange_rates[0].rate
        this.kassaCurrencyCode = selectedCurrency.code;
      } else {
        this.kassaCurrencyCode = '?'
      }
    },
    'form.original_currency'(selectedOriginalCurrencyCode){
      const currency = this.currencies.find(currency => currency.code === selectedOriginalCurrencyCode)
      this.orginalExchangeRate = currency.exchange_rates[0].rate
      this.orginalCurrencyCode = selectedOriginalCurrencyCode
    },

    'form.original_amount'(orginalAmount){

        this.orginalAmount = orginalAmount;

        if(this.orginalCurrencyCode === this.kassaCurrencyCode){
          this.cashboxAmount = this.orginalAmount
        }else if(this.kassaCurrencyCode === this.relativeCurrencyCode){
          this.cashboxAmount = this.orginalAmount / this.orginalExchangeRate
          }else{
            this.cashboxAmount = (this.cashboxCurrencyRate / this.orginalExchangeRate) * this.orginalAmount
          }
        },
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
        this.showModal = false
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
  label{margin:0;}
</style>
