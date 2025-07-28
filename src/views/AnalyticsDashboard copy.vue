<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold">📊 Дашборд аналитики</h1>

    <div class="grid gap-4 mb-6 md:grid-cols-3">
      <div class="p-4 bg-green-100 shadow rounded-xl">
        <h2 class="text-lg font-semibold text-green-800">Доход</h2>
        <p class="text-2xl font-bold text-green-900">{{ data.income }} TMT</p>
      </div>
      <div class="p-4 bg-red-100 shadow rounded-xl">
        <h2 class="text-lg font-semibold text-red-800">Расход</h2>
        <p class="text-2xl font-bold text-red-900">{{ data.expense }} TMT</p>
      </div>
      <div class="p-4 bg-blue-100 shadow rounded-xl">
        <h2 class="text-lg font-semibold text-blue-800">Баланс</h2>
        <p class="text-2xl font-bold text-blue-900">{{ data.balance }} TMT</p>
      </div>
    </div>

    <div class="p-4 bg-white shadow rounded-xl">
      <h2 class="mb-4 text-xl font-semibold">📦 Кассы</h2>
      <table class="w-full text-sm table-auto">
        <thead>
          <tr class="text-left border-b">
            <th>Касса</th>
            <th>Доход</th>
            <th>Расход</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="box in data.cashboxes" :key="box.id" class="border-b hover:bg-gray-50">
            <td>{{ box.title }} ({{ box.currency.code }})</td>
            <td class="text-green-600">{{ box.income_sum }}</td>
            <td class="text-red-600">{{ box.expense_sum }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import API from "@/api/api";

export default {
  data() {
    return {
      data: {
        income: 0,
        expense: 0,
        balance: 0,
        cashboxes: [],
      },
    };
  },
  async mounted() {
    const res = await API.get('/analytics');
    this.data = res.data;
  },
};
</script>
