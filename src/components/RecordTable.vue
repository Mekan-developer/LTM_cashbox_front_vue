<template>
  <div class="p-6 bg-white shadow-lg rounded-xl">
    <div class="overflow-x-auto border border-blue-200 rounded-lg shadow">
      <table class="min-w-full divide-y divide-blue-200">
        <thead class="bg-blue-100">
          <tr>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">#</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">Касса</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">Тип</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase text-nowrap">Исходная сумма</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">В кассе</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase text-nowrap">Обменный курс</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">Дата</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">Описание</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">Actions</th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-100">
          <tr
  v-for="(record, index) in records"
  :key="record.id"
  :class="[
    'transition duration-200 hover:bg-blue-50',
    record.is_debt ? 'bg-red-100 text-white' : ''
  ]"
>
            <td class="px-6 py-4 text-sm text-gray-800">{{ index + 1 }}</td>
            <td class="px-6 py-4 text-sm text-gray-800">{{ record.cashbox?.title || '—' }}</td>
            <td class="px-6 py-4 text-sm">
              <span
                :class="{
                  'text-green-600 font-semibold': record.type === 'income',
                  'text-red-600 font-semibold': record.type === 'expense'
                }"
              >
                {{ record.type === 'income' ? 'Доход' : 'Расход' }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm font-medium text-gray-800 text-nowrap">{{ record.original_amount }} {{ record.original_currency }}</td>
            <td class="px-6 py-4 text-sm text-gray-500 text-nowrap">{{ record.amount }} {{ record.currency }}</td>
            <td class="px-6 py-4 text-sm text-gray-500 text-nowrap">{{ record.exchange_rate + ' '+ record.currency }}</td>
            <td class="px-6 py-4 text-sm text-gray-500 text-nowrap">{{ record.date }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ record.article_description }}</td>

            <td class="flex flex-row items-center justify-center gap-1 px-6 py-4">
              <button class="flex items-center px-4 py-2 font-bold text-red-500 rounded cursor-pointer hover:text-red-700">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd"></path>
                </svg>
              </button>

              <svg class="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-800" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '@/api/api' // или укажи прямо путь до твоего axios

export default {
  data() {
    return {
      records: []
    }
  },
  async mounted() {
    const res = await axios.get('/records')
    console.log('response iz baka: ',res.data);
    this.records = res.data
  }
}
</script>
