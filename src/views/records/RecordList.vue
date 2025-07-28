<template>
  <div>
    
    <div class="flex items-center justify-between mb-6">
      <h2 class="mb-4 text-2xl font-bold">📊 Записи по кассе</h2>
      <button class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700" @click="showModal = true">Добавить record</button>
    </div>

    <div class="p-4 overflow-x-auto bg-white rounded shadow">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2">kassa</th>
            <th class="p-2">Тип(daxod/rashod)</th>
            <th class="p-2">Сумма</th>
            <th class="p-2">Валюта</th>
            <th class="p-2">Дата</th>
            <th class="p-2">Описание</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record.id" >
            <td class="p-2 text-center">{{ record.type }}</td>
            <td class="p-2 text-center">{{ record.amount }}</td>
            <td class="p-2 text-center">{{ record.currency }}</td>
            <td class="p-2 text-center">{{ record.date }}</td>
            <td class="p-2 text-center">{{ record.article_description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center h-full overflow-auto bg-black p-18 bg-opacity-40">
      <div class="relative w-full max-w-md mt-4 bg-white rounded-xl">
        <div class="absolute top-[15px] right-[15px] p-1 cursor-pointer" @click="showModal = false">
            <svg width="24" height="24" class="text-red-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
        <div class="max-w-3xl p-8 mx-auto bg-white shadow-md rounded-xl">
          <h2 class="mb-4 text-2xl font-semibold">Создать запись</h2>

          <form @submit.prevent="submitRecord">
            <div>
              <label class="block">Касса</label>
              <select v-model="form.cashbox_id" class="input">
                <option value="">-- Выбрать --</option>
                <option v-for="box in cashboxes" :key="box.id" :value="box.id">{{ box.title }}</option>
              </select>
            </div>

            <div>
              <label class="block">Тип записи</label>
              <select v-model="form.type" class="input">
                <option value="income">Доход</option>
                <option value="expense">Расход</option>
              </select>
            </div>

            <div>
              <label class="block">Сумма</label>
              <input type="number" v-model="form.original_amount" class="input" />
            </div>

            <div>
              <label class="block">Валюта</label>
              <select v-model="form.original_currency" class="input">
                <option value="">-- Выбрать --</option>
                <option v-for="cur in currencies" :key="cur.code" :value="cur.code">{{ cur.name }}</option>
              </select>
            </div>

            <div>
              <label class="block">Дата</label>
              <input type="date" v-model="form.date" class="input" />
            </div>

            <div>
              <label class="block">Описание статьи</label>
              <input type="text" v-model="form.article_description" class="input" />
            </div>

            <!-- ✅ Новый чекбокс -->
            <div class="flex items-center space-x-2">
              <input type="checkbox" v-model="form.is_debt" id="is_debt" />
              <label for="is_debt">Записать как долг</label>
            </div>

            <!-- ✅ Новые поля: ссылка и объект -->
            <div>
              <label class="block">Ссылка</label>
              <input type="text" v-model="form.link" class="input" />
            </div>

            <div>
              <label class="block">Объект</label>
              <input type="text" v-model="form.object" class="input" />
            </div>

            <button type="submit" class="px-4 py-2 mt-1 text-white bg-blue-600 rounded hover:bg-blue-700">
              Сохранить запись
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/api'

export default {
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
        type: 'income',
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
