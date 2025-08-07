<template>
  <div class="p-6 bg-white shadow-lg rounded-xl">
    <div class="overflow-x-auto border border-blue-200 rounded-b-lg shadow">

      <table class="min-w-full divide-y divide-blue-200">
        <thead class="bg-blue-100">
          <tr >
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
            <td class="flex flex-row items-center justify-center gap-1 px-6 py-4 text-red-600">
              <form @submit.prevent="confirmDelete(cashbox)">
                <button  class="flex items-center px-4 py-2 font-bold text-red-500 rounded cursor-pointer hover:text-red-700">
                   <Trash2 />
                </button>
              </form>

              <button @click="$emit('edit', cashbox)" class="cursor-pointer">
                <PencilLine />
              </button>
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
import axios from '@/services/api';
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
    },
  methods: {
    confirmDelete(cashbox) {
      this.selectedRecord = cashbox
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
    import { PencilLine, Trash2 } from 'lucide-vue-next';
</script>