<template>
  <div>
    <h2 class="mb-2 text-xl font-bold">Пользователи</h2>
    <table class="w-full overflow-hidden border border-gray-200 rounded-lg table-auto">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">#</th>
          <th class="px-4 py-2 text-left">Имя</th>
          <th class="px-4 py-2 text-left">Email</th>
          <th class="px-4 py-2 text-left">Роль</th>
        <th class="px-4 py-2 text-left">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id" class="border-t">
          <td class="px-4 py-2">{{ index+1 }}</td>
          <td class="px-4 py-2">{{ user.name }}</td>
          <td class="px-4 py-2">{{ user.email }}</td>
          <td class="px-4 py-2">{{ user.roles[0] || '—' }}</td>
           <td class="flex items-center px-4 py-2">
          <form @submit.prevent="confirmDelete(user)">
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

        <ConfirmModal
            v-if="showModal"
            :title="'Удалить запись'"
            :message="'Вы уверены, что хотите удалить «' + selectedUser.name + '»?'"
            @confirm="deleteUser(selectedUser.id)"
            @cancel="showModal = false"
            />
  </div>
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal.vue'

export default {
  props: {
    users: Array
  },
  data(){
    return{
        showModal: false,
         selectedUser: null
    }
  },
  methods:{
    deleteUser(id){
        this.$emit('delete-user', id)
        this.showModal = false
    },
     confirmDelete(user) {
      this.selectedUser = user
      this.showModal = true
    },
    
  }
}
</script>
<script setup>

import { Trash2 } from 'lucide-vue-next';
</script>
