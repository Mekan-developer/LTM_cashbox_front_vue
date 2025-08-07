<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Аналитика</h1>

    <!-- 🎛️ Фильтры -->
    <div class="grid items-end grid-cols-1 gap-4 md:grid-cols-3">
      <div>
        <label class="block text-sm font-medium text-gray-700">Касса</label>
        <select v-model="filters.cashbox_id" class="w-full p-2 border rounded">
          <option value="">Все кассы</option>
          <option v-for="c in cashboxes" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">С даты</label>
        <input v-model="filters.from" type="date" class="w-full p-2 border rounded" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">По дату</label>
        <input v-model="filters.to" type="date" class="w-full p-2 border rounded" />
      </div>
    </div>

    <button @click="loadData" class="px-4 py-2 mt-2 text-white bg-blue-500 rounded">
      Применить фильтры
    </button>

    <!-- 💰 Карточки -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="p-4 text-center bg-white rounded shadow">
        <p class="text-gray-500">Доходы</p>
        <p class="text-2xl font-bold text-green-500">{{ summary.income }} {{ currency }}</p>
      </div>
      <div class="p-4 text-center bg-white rounded shadow">
        <p class="text-gray-500">Расходы</p>
        <p class="text-2xl font-bold text-red-500">{{ summary.expense }} {{ currency }}</p>
      </div>
      <div class="p-4 text-center bg-white rounded shadow">
        <p class="text-gray-500">Баланс</p>
        <p class="text-2xl font-bold">{{ summary.balance }} {{ currency }}</p>
      </div>
    </div>

    <!-- 📊 Графики -->
    <div class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
      <div class="p-4 bg-white rounded shadow">
        <h2 class="mb-2 text-lg font-semibold">Баланс по кассам</h2>
        <canvas id="cashboxChart" height="200"></canvas>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <h2 class="mb-2 text-lg font-semibold">Соотношение доходов/расходов</h2>
        <canvas id="pieChart" height="200"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import API from '@/services/api'

export default {
  data() {
    return {
      summary: {
        income: 0,
        expense: 0,
        balance: 0,
        by_cashbox: []
      },
      cashboxes: [],
      currency: 'TMT',
      filters: {
        cashbox_id: '',
        from: '',
        to: ''
      }
    }
  },

  methods: {
    async loadData() {
      try {
        const res = await API.get('/analytics/summary', {
          params: this.filters
        })
        this.summary = res.data
        this.renderCharts(res.data)
      } catch (e) {
        console.error('Ошибка при загрузке аналитики:', e)
      }
    },

    renderCharts(data) {
      // 🟦 Bar chart
      const barCtx = document.getElementById('cashboxChart')
      if (barCtx) {
        new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: data.by_cashbox.map(cb => cb.cashbox.title),
            datasets: [{
              label: 'Баланс',
              data: data.by_cashbox.map(cb => cb.balance),
              backgroundColor: '#3b82f6'
            }]
          },
          options: { responsive: true }
        })
      }

      // 🟢 Pie chart
      const pieCtx = document.getElementById('pieChart')
      if (pieCtx) {
        new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: ['Доходы', 'Расходы'],
            datasets: [{
              data: [data.income, data.expense],
              backgroundColor: ['#22c55e', '#ef4444']
            }]
          },
          options: { responsive: true }
        })
      }
    }
  },

  async mounted() {
    try {
      const res = await API.get('/cashboxes')
      this.cashboxes = res.data
      this.loadData()
    } catch (e) {
      console.error('Ошибка при загрузке касс:', e)
    }
  }
}
</script>
