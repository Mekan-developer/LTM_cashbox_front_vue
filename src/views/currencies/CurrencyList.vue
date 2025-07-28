<template>
  <div>
    <div>
      <h2 class="mb-4 text-2xl font-bold">💱 Управление обменными курсами</h2>
      <!-- Создание или редактирование -->
      <div class="p-4 mb-6 rounded shadow bg-blue-50">
        <h3 class="mb-2 text-lg font-semibold">Добавить/Изменить курс</h3>
        <form @submit.prevent="saveRate">
          <div class="w-full">
            <div class="flex flex-row w-full gap-4">
              <div v-for="currency in currencies" :key="currency.id" class="flex-1">
                  <label class="block mb-1">{{currency.name}}</label>
                  <input
                    :value="currency.exchange_rates[0]?.rate" 
                    type="number"
                    step="0.0001"
                    class="w-full p-2 border rounded"
                    placeholder="Например: 3.67"
                  />           
              </div>
            </div>
          </div>

          <div class="mt-4 text-right md:col-span-2">
            <button
              type="submit"
              class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Сохранить курс
            </button>
          </div>
        </form>
      </div>
    </div>
    

    <div>
    <h2 class="mb-4 text-2xl font-bold">💱 Список валют</h2>
    <div class="p-4 bg-white rounded shadow">
      <table class="w-full table-auto">
        <thead>
          <tr class="text-left bg-gray-100">
            <th class="p-2">#</th>
            <th class="p-2">Код</th>
            <th class="p-2">Название</th>
            <th class="p-2">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(currency, index) in currencies" :key="currency.id" class="border-b-2 border-b-gray-200">
            <td class="p-2">{{ index+1 }}</td>
            <td class="p-2">{{ currency.code }}</td>
            <td class="p-2">{{ currency.name }}</td>
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
    </div>
  </div>
  
  </div>

  
</template>

<script>
import axios from '@/api/api';
export default {
  data() {
    return {
      currencies: [],
      exchangeRates: [],
      form: {
        id: null,
        currency: "",
        rate: "",
      },
      

      loading: true,
      error: null,
    }
  },
  mounted() {
    // this.loadCurrencies()
    this.loadCurrencies();
    this.loadRates();
  },
  methods: {
    async loadCurrencies() {
      try {
        const response = await axios.get('/currencies')
        this.currencies = response.data
      } catch (e) {
        this.error = 'Ошибка загрузки валют' + e
      } finally {
        this.loading = false
      }
    },

    async loadRates() {
      try {
        const res = await axios.get("/exchange-rates");
        this.exchangeRates = res.data;
      } catch (e) {
        alert("Ошибка загрузки курсов" + e);
      }
    },
    async saveRate() {
      try {
        if (this.form.id) {
          // Обновление
          await axios.put(`/exchange-rates/${this.form.id}`, this.form);
        } else {
          // Создание
          await axios.post("/exchange-rates", this.form);
        }
        this.form = { id: null, from_currency: "", to_currency: "", rate: "" };
        this.loadRates();
      } catch (e) {
        alert("Ошибка при сохранении" + e);
      }
    },
    editRate(rate) {
      this.form = { ...rate };
    },
    async deleteRate(id) {
      if (!confirm("Удалить курс?")) return;
      try {
        await axios.delete(`/exchange-rates/${id}`);
        this.loadRates();
      } catch (e) {
        alert("Ошибка при удалении" + e);
      }
    },
  },
}
</script>