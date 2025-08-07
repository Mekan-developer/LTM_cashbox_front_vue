<template>
  <div>
    <div>
      <!-- Создание или редактирование -->
      <div class="p-4 mb-6 rounded shadow bg-blue-50">
        <div class="flex flex-row justify-between">
            <h3 class="mb-2 text-lg font-semibold">Добавить/Изменить курс</h3>
        </div>
      
        <form >
          <div class="mt-4 text-right md:col-span-2">
          </div>
          <div class="w-full">
            <div class="flex flex-row w-full gap-4 ">
              <div v-for="currency in currencies" :key="currency.id" class="flex-1">
                <div class="flex flex-row text-center items-center gap-2 text-blue-500 text-[13px] font-bold">
                  <span >{{  currency.name  }}</span>
                  <span v-if="currency.code == 'USD'" >(Базовая валюта)</span>
                </div>
                  <input
                    :value="currency.exchange_rates[0]?.rate" 
                    @change="updateExchangeRate(currency.id, $event.target.value)"
                    type="number"
                    step="0.0001"
                    class="w-full p-2 border rounded"
                    placeholder="Например: 3.67"
                    :disabled="currency.code == 'USD'"
                  />           
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    

    <div>
    <h2 class="flex gap-2 mb-4 text-2xl font-bold text-blue-500">
       <CircleDollarSign />
       Список валют
    </h2>
    <div class="overflow-x-auto border border-blue-200 rounded-b-lg shadow">
    <table class="min-w-full divide-y divide-blue-200">
      <thead class="bg-blue-100">
        <tr>
          <th class="px-6 py-3 text-sm font-semibold text-center text-blue-900 uppercase">#</th>
          <th class="px-6 py-3 text-sm font-semibold text-center text-blue-900 uppercase">Код</th>
          <th class="px-6 py-3 text-sm font-semibold text-center text-blue-900 uppercase">Название</th>
          <th class="px-6 py-3 text-sm font-semibold text-center text-blue-900 uppercase">обменный курс</th>
          <!-- <th class="px-6 py-3 text-sm font-semibold text-center text-blue-900 uppercase">Действия</th> -->
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-100">
        <tr v-for="(currency, index) in currencies" :key="currency.id" class="transition duration-200 hover:bg-blue-50">
          <td class="px-6 py-4 text-sm text-center text-gray-800">{{ index + 1 }}</td>
          <td class="px-6 py-4 text-sm text-center text-gray-800">{{ currency.code }}</td>
          <td class="px-6 py-4 text-sm text-center text-gray-800">{{ currency.name }}</td>
          <td class="px-6 py-4 text-sm text-center text-gray-800">{{ currency.exchange_rates[0].rate }}</td>
        </tr>
      </tbody>
    </table>
</div>

  </div>
  </div>
</template>

<script>
import axios from '@/services/api';
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
    this.loadCurrencies();
    this.loadRates();
  },
  methods: {
    async updateExchangeRate(rateId, newRate) {
      try {
        await axios.patch(`exchange-rates/${rateId}`, {
          rate: parseFloat(newRate),
        });
      this.loadCurrencies();
      } catch (error) {
        console.error('Ошибка при обновлении курса:', error.response?.data || error.message);
      }
    },
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
<script setup>
    import { CircleDollarSign } from 'lucide-vue-next';
</script>