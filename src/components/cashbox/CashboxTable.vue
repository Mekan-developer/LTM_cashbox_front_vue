<template>
  <div class="p-6 bg-white shadow-lg rounded-xl">
    <div class="overflow-x-auto border border-blue-200 rounded-b-lg shadow">

      <table class="min-w-full divide-y divide-blue-200">
        <thead class="bg-blue-100">
          <tr class="">
            <th class="px-6 py-3 text-sm font-semibold text-center text-blue-900 uppercase">#</th>
            <th class="px-6 py-3 text-sm font-semibold text-center text-blue-900 uppercase">Название</th>
            <th class="px-6 py-3 text-sm font-semibold text-center text-blue-900 uppercase">Валюта</th>
            <th class="px-6 py-3 text-sm font-semibold text-center text-blue-900 uppercase">Название Валют</th>
            <th class="px-6 py-3 text-sm font-semibold text-center text-blue-900 uppercase text-nowrap">Описание</th>
            <th class="px-6 py-3 text-sm font-semibold text-center text-blue-900 uppercase">Actions</th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="(cashbox, index) in cashboxes"
            :key="cashbox.id"
              class="transition duration-200 hover:bg-blue-50"
          >
            <td class="px-6 py-4 text-sm text-center text-gray-800">{{ index + 1 }}</td>
            <td class="px-6 py-4 text-sm text-center text-gray-800">{{ cashbox.title || '—' }}</td>
            <td class="px-6 py-4 text-sm font-medium text-center text-gray-800">{{ cashbox.currency?.code }}</td>
            <td class="px-6 py-4 text-sm font-medium text-center text-gray-800">{{ cashbox.currency?.name }}</td>
            <td class="px-6 py-4 text-sm text-center text-gray-500">{{ cashbox.description || '-'}}</td>
            <td class="flex flex-row items-center justify-center gap-1 px-6 py-4">
              <form @submit.prevent="confirmDelete(cashbox)">
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
      :message="'Вы уверены, что хотите удалить «' + selectedRecord.title + '»?'"
      @confirm="deleteRecord(selectedRecord.id)"
      @cancel="showModal = false"
    />
  </div>
</template>


<script>
import axios from '@/api/api';
import ConfirmModal from '@/components/ConfirmModal.vue'

export default {
    name: 'CashboxTable',
    components: { ConfirmModal },
    props:{
      cashboxes: {
        type: Array,
        required: true
      },
      onRefresh: {
        type: Function,
        required: false
      }
    },
    data() {
      return {
          showModal: false,
          selectedRecord: null
      }
    },
    mounted(){
      console.log(this.cashboxes);
    },
  methods: {
    // async fetchCashboxes() {
    //   const res = await axios.get('/cashboxes');
    //   this.cashboxes = res.data;
    // },
    confirmDelete(record) {
      this.selectedRecord = record
      this.showModal = true
    },
    async deleteRecord(id) {
      await axios.delete(`/cashboxes/${id}`)
        this.onRefresh()
      this.showModal = false
      this.selectedRecord = null
    }
},
};
</script>
<script setup>
    import { Trash2 } from 'lucide-vue-next';
</script>