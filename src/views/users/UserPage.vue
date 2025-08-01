<template>
  <div class="flex flex-col gap-4 p-4 lg:flex-row">
    <div class="w-full lg:w-2/3">
      <UserTable :users="users" @delete-user="deleteUser"/>
    </div>
    <div class="w-full lg:w-1/3">
      <UserForm :roles="roles" @create-user="createUser" />
    </div>
  </div>
</template>

<script>
import UserTable from '@/components/user/UserTable.vue'
import UserForm from '@/components/user/UserForm.vue'
import axios from '@/api/api'

export default {
  components: {
    UserTable,
    UserForm
  },
  data() {
    return {
      users: [],
      roles: []
    }
  },
  mounted() {
    this.fetchUsers()
    this.fetchRoles()
  },
  methods: {
    async fetchUsers() {
      const res = await axios.get('/users')
      this.users = res.data
    },
    async fetchRoles() {
      const res = await axios.get('/roles')
      this.roles = res.data
    },
    async createUser(formData) {
      await axios.post('/register', formData)
      this.fetchUsers()
    },
    async deleteUser(id) {
        await axios.delete(`/users/${id}`)
        this.fetchUsers()
    }
  }
}
</script>
