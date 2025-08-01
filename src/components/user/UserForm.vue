<template>
  <div>
    <h2 class="mb-2 text-xl font-bold">Создать пользователя</h2>
    <form @submit.prevent="submitForm" class="p-4 space-y-2 bg-white rounded shadow-md">
      <div>
        <label class="block mb-1 text-sm font-medium">Имя</label>
        <input v-model="form.name" type="text" class="w-full p-2 border rounded" required />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium">Email</label>
        <input v-model="form.email" type="email" class="w-full p-2 border rounded" required />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium">Пароль</label>
        <input v-model="form.password" type="password" class="w-full p-2 border rounded" required />
      </div>

      <div class="flex flex-row justify-start text-[18px]">
        <label v-for="role in roles" :key="role.id" >
          <span v-if="role.title !== 'admin'" class="flex items-center gap-3 px-4 py-2 mr-2 transition border border-gray-300 rounded-sm cursor-pointer hover:bg-gray-50">
            <input type="radio" :value="role.id" v-model="form.role_id"  name="role_id" class="w-5 h-5 text-blue-600 focus:ring-blue-500"
            />
            <span class="text-[18px] capitalize">{{ role.title }}</span>
        </span>
        </label>
      </div>


    <button
      class="w-full px-4 py-2 text-white transition-transform duration-100 bg-blue-600 rounded hover:bg-blue-700 active:scale-95"
    >
      Создать
  </button>

    </form>
  </div>
</template>

<script>
export default {
  props: {
    roles: Array
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        role_id: null
      }
    }
  },
  methods: {
    submitForm() {
      console.log(this.form)
      this.$emit('create-user', this.form)
      this.form = { name: '', email: '', password: '', role_id: null }
    },
    
  }
}
</script>
