<template>
  <div class="p-6 bg-white shadow-lg rounded-xl">
    <div class="flex flex-row gap-1 w-full h-[45px] rounded-t-lg overflow-hidden text-[14px]">
     <div class="flex items-center gap-6 p-4 border border-b-0 border-blue-200 shadow-sm bg-blue-50 rounded-t-xl">
        <span class="p-0 m-0 font-semibold text-gray-700">Тип:</span>

        <label class="flex items-center gap-2 text-gray-600">
          <input type="radio" name="type" v-model="selectedType" value="all" class="accent-blue-500" />
          <span>Все</span>
        </label>

        <label class="flex items-center gap-2 text-green-600">
          <input type="radio" name="type" v-model="selectedType" value="income" class="accent-green-500" />
          <span>Доход</span>
        </label>

        <label class="flex items-center gap-2 text-red-600">
          <input type="radio" name="type" v-model="selectedType" value="expense" class="accent-red-500" />
          <span>Расход</span>
        </label>
      </div>

      <div class="flex items-center gap-6 p-4 border border-b-0 border-blue-200 shadow-sm bg-blue-50 rounded-t-xl">
        <span class="p-0 m-0 font-semibold text-gray-700">Статус долга:</span>

        <label class="flex items-center gap-2 text-gray-600">
          <input type="radio" name="deptType" v-model="selectedDept" value="all" class="accent-blue-500" />
          <span>Все</span>
        </label>

        <label class="flex items-center gap-2 text-green-600">
          <input type="radio" name="deptType" v-model="selectedDept" :value="true" class="accent-red-500" />
          <span>Долги</span>
        </label>

        <label class="flex items-center gap-2 text-red-600">
          <input type="radio" name="deptType" v-model="selectedDept" :value="false" class="accent-green-500" />
          <span>Без долгов</span>
        </label>
      </div>
    </div>
    <div class="overflow-x-auto border border-blue-200 rounded-b-lg shadow">

      <table class="min-w-full divide-y divide-blue-200">
        <thead class="bg-blue-100">
          <tr>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">#</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">Касса</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">Тип</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase text-nowrap">Исходная сумма</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">В кассе</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase text-nowrap">Обменный курс</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase" @click="toggleSortByDate"
              >
              Дата
              <span class="inline-block ml-1">
                <svg
                  v-if="sortDateAsc"
                  class="inline-block w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                <svg
                  v-else
                  class="inline-block w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">Описание</th>
            <th class="px-6 py-3 text-sm font-semibold text-left text-blue-900 uppercase">Actions</th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="(record, index) in sortedRecords"
            :key="record.id"
            :class="['transition duration-200 hover:bg-blue-50',
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
              <form @submit.prevent="confirmDelete(record)">
                <button  class="flex items-center px-4 py-2 font-bold text-red-500 rounded cursor-pointer hover:text-red-700">
                   <Trash2 />
                </button>
              </form>

              <svg class="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-800" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

        <!-- Modal Component -->
    <ConfirmModal
      v-if="showModal"
      :title="'Удалить запись'"
      :message="'Вы уверены, что хотите удалить «' + selectedRecord.cashbox?.title + '»?'"
      @confirm="deleteRecord(selectedRecord.cashbox.id)"
      @cancel="showModal = false"
    />
  </div>
</template>

<script>
import axios from '@/api/api' // или укажи прямо путь до твоего axios
import ConfirmModal from '@/components/ConfirmModal.vue'

export default {
      components: { ConfirmModal },
      
  data() {
    return {
      id: null,
      records: [],
      selectedType: 'all',
      selectedDept: 'all',
      sortDateAsc: true, // true = ASC, false = DESC
      showModal: false,
      selectedRecord: null
    }
  },
  async mounted() {
    this.getRecords()
    
  },
  
  computed: {
  filteredRecords() {
    return this.records.filter(record => {
      const matchType = this.selectedType === 'all' || record.type === this.selectedType;
      const matchDept = this.selectedDept === 'all' || record.is_debt === this.selectedDept;
      return matchType && matchDept;
    });
  },

  sortedRecords() {
    return [...this.filteredRecords].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return this.sortDateAsc ? dateA - dateB : dateB - dateA;
    });
  }
},


  methods:{
    async getRecords(){
      const res = await axios.get('/records')
      this.records = res.data
      console.log('testtt:', this.records)
    },

    toggleSortByDate() {
      this.sortDateAsc = !this.sortDateAsc;
    },
     confirmDelete(records) {
      this.selectedRecord = records
      this.showModal = true
    },
    async deleteRecord(id) {
      await axios.delete(`/records/${id}`)
      this.getRecords()
      this.showModal = false
      this.selectedRecord = null
    }

  }
}
</script>
<script setup>
    import { Trash2 } from 'lucide-vue-next';
</script>