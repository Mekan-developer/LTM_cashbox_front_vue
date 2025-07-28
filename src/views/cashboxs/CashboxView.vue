<template>
  <div class="max-w-6xl p-6 mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Кассы</h1>
      <button @click="showModal = true" class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Добавить кассу</button>
    </div>

    <table class="w-full border border-gray-200 table-auto">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 text-left">#</th>
          <th class="p-2 text-left">Название</th>
          <th class="p-2 text-left">Валюта</th>
          <th class="p-2 text-left">Описание</th>
          <th class="p-2 text-left">actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cashbox,index) in cashboxes" :key="cashbox.id" class="border-b-2 border-gray-200">
          <td class="p-2">{{ index+1 }}</td>
          <td class="p-2">{{ cashbox.title }}</td>
          <td class="p-2">{{ cashbox.currency?.code }}</td>
          <td class="p-2">{{ cashbox.description }}</td>
          <td class="p-2">
            <button @click="editRate(rate)" class="mr-2 text-blue-600 hover:underline">
              ✏️
            </button>
            <button @click="deleteRate(rate.id)" class="text-red-600 hover:underline">
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div class="w-full max-w-md p-6 bg-white rounded-xl">
        <h2 class="mb-4 text-lg font-semibold">Новая касса</h2>
        <form @submit.prevent="createCashbox">
          <div class="mb-3">
            <label class="block mb-1">Название</label>
            <input v-model="form.title" class="w-full px-3 py-2 border rounded" required />
          </div>

          <div class="mb-3">
            <label class="block mb-1">Валюта</label>
            <select v-model="form.currency_id" class="w-full px-3 py-2 border rounded" required>
              <option v-for="currency in currencies" :value="currency.id" :key="currency.id">{{ currency.code }} - {{ currency.name }}</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="block mb-1">Описание</label>
            <textarea v-model="form.description" class="w-full px-3 py-2 border rounded"></textarea>
          </div>

          <div class="flex justify-end gap-2">
            <button type="button" @click="showModal = false" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Отмена</button>
            <button type="submit" class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/api';

export default {
  name: 'CashboxesView',
  data() {
    return {
      cashboxes: [],
      currencies: [],
      showModal: false,
      form: {
        title: '',
        currency_id: '',
        description: '',
      },
    };
  },
  mounted() {
    this.fetchCashboxes();
    this.fetchCurrencies();
  },
  methods: {
    async fetchCashboxes() {
      const res = await axios.get('/cashboxes');
      this.cashboxes = res.data;

    },
    async fetchCurrencies() {
      const res = await axios.get('/currencies');
      console.log('res: ' + res.data);
      this.currencies = res.data;
    },
    async createCashbox() {
      try {
        await axios.post('/cashboxes', this.form);
        this.showModal = false;
        this.form = { title: '', currency_id: '', description: '' };
        this.fetchCashboxes();
      } catch (e) {
        alert('Ошибка при создании :' + e);
      }
    },
  },
};
</script>

<style scoped>
</style>
