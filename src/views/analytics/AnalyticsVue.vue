<template>
  <div class="p-6">
    <h1 class="mb-4 text-2xl font-bold">Аналитика</h1>

    <div class="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
      <div class="p-4 bg-white rounded shadow">
        <p class="text-gray-500">Доходы</p>
        <p class="text-2xl font-bold text-green-500">{{ summary.income }} {{ currency }}</p>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <p class="text-gray-500">Расходы</p>
        <p class="text-2xl font-bold text-red-500">{{ summary.expense }} {{ currency }}</p>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <p class="text-gray-500">Баланс</p>
        <p class="text-2xl font-bold">{{ summary.balance }} {{ currency }}</p>
      </div>
    </div>

    <canvas id="cashboxChart" height="100"></canvas>
  </div>
</template>

<script>
    import { onMounted, ref } from 'vue'
    import Chart from 'chart.js/auto'
    import API from '@/api/api'

export default {
  setup() {
    const summary = ref({
      income: 0,
      expense: 0,
      balance: 0,
      by_cashbox: []
    })

    const currency = 'TMT' // можно сделать динамическим

    onMounted(async () => {
      const res = await API.get('/analytics/summary')
      summary.value = res.data

      const ctx = document.getElementById('cashboxChart').getContext('2d')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: res.data.by_cashbox.map(c => c.cashbox.title),
          datasets: [{
            label: 'Баланс по кассам',
            data: res.data.by_cashbox.map(c => c.balance),
            backgroundColor: '#60a5fa'
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    })

    return { summary, currency }
  }
}
</script>
