<template>
  <div class="max-w-3xl p-6 mx-auto bg-white shadow-md rounded-xl">
    <h2 class="mb-4 text-2xl font-bold">Создать новую запись</h2>

    <form @submit.prevent="submitRecord" class="space-y-4">
      <div>
        <label class="block mb-1">Касса</label>
        <select v-model="form.cashbox_id" class="w-full p-2 border rounded">
          <option disabled value="">Выберите кассу</option>
          <option v-for="cashbox in cashboxes" :key="cashbox.id" :value="cashbox.id">
            {{ cashbox.title }}
          </option>
        </select>
      </div>

      <div>
        <label class="block mb-1">Тип</label>
        <select v-model="form.type" class="w-full p-2 border rounded">
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
      </div>

      <div>
        <label class="block mb-1">Сумма</label>
        <input v-model="form.original_amount" type="number" step="0.01" class="w-full p-2 border rounded" />
      </div>

      <div>
        <label class="block mb-1">Валюта</label>
        <select v-model="form.original_currency" class="w-full p-2 border rounded">
          <option disabled value="">Выберите валюту</option>
          <option v-for="cur in currencies" :key="cur.code" :value="cur.code">
            {{ cur.code }} - {{ cur.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block mb-1">Дата</label>
        <input v-model="form.date" type="date" class="w-full p-2 border rounded" />
      </div>

      <div>
        <label class="block mb-1">Описание</label>
        <input v-model="form.article_description" type="text" class="w-full p-2 border rounded" />
      </div>

      <button type="submit" class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
        Сохранить
      </button>
    </form>
  </div>
</template>

<script>
import axios from '@/api/api'

export default {
  data() {
    return {
      currencies: [],
      cashboxes: [],
      form: {
        cashbox_id: '',
        type: 'income',
        original_amount: '',
        original_currency: '',
        date: new Date().toISOString().split('T')[0],
        article_description: '',
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
  },
  methods: {
    async submitRecord() {
      try {
        await axios.post('/records', this.form)
        alert('Запись успешно добавлена!')
        this.$router.push('/records')
      } catch (e) {
        alert('Ошибка при сохранении')
        console.error(e)
      }
    },
  },
}
</script>
