<template>
    <div class="fixed inset-0 flex items-center justify-end bg-[#000000e1] text-[14px]">
        <div class="relative h-full pb-6 bg-gray-50">
            <div class="absolute top-0 left-0 flex justify-center items-center w-[40px] rounded-full aspect-square cursor-pointer " @click="$emit('close')">
                <svg width="24" height="24" class="text-red-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>

            <div class=" flex justify-center items-center border-b-2 border-b-gray-300 w-full h-[40px]">
                <span class="text-blue-500">Новая касса</span>
            </div>

            <form @submit.prevent="submit" class="relative w-[400px] p-4 pl-6 pb-24 h-full overflow-y-scroll flex flex-col gap-2 ">
                <div>
                    <label>Название</label>
                    <input type="text" v-model="form.title" class="input" placeholder="Название"/>
                </div>

                <div>
                    <label for="kassa">выбрать валюту</label>
                    <select v-model="form.currency_id" class="input" id="kassa" required>
                    <option value="">-- Выбрать --</option>
                    <option  v-for="currency in currencies" :value="currency.id" :key="currency.id">{{ currency.code }} - {{ currency.name }}</option>
                    </select>
                </div>

                <div>
                    <label>описание</label>
                    <textarea v-model="form.description" class="w-full px-3 py-2 border rounded" rows="6" placeholder="описание"></textarea>
                </div>

                <div class="fixed w-full pb-4 bg-white bottom-1">
                    <button type="submit" class=" w-[350px]  text-white mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                            {{ isEditMode ? 'Обновить' : 'Создать' }}
                    </button>
                </div>
            </form>
        </div>  
    </div>  
</template>


<script>
import axios from '@/api/api';

export default{
    props:{
        showModalProps:{
            type:Boolean,
            default:false
        },
        onRefresh: {
            type: Function,
            required: true
        },
        cashbox: Object,
        isEditMode: Boolean

    },
    data(){
        return {
            form: {
                title: '',
                currency_id: '',
                description: '',
            },
            currencies:'',
            editingId: null, // <-- ID редактируемой кассы

        }
    },
    async mounted(){
        this.fetchCurrencies()
    },
    watch: {
    cashbox: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal };
        }
      }
    }
  },    
    methods:{
        close() {
            this.$emit('update:showModalProps',false); // сообщаем родителю, что нужно закрыть
        },
        async submit() {
            try {
                if (this.isEditMode) {
                    await axios.put(`/cashboxes/${this.cashbox.id}`, this.form);

                } else {
                    await axios.post('/cashboxes', this.form);
                    this.form = { title: '', currency_id: '', description: '' };
                }
                this.onRefresh(); // обновить список в родителе
                this.$emit('close');
            } catch (e) {
                alert('Ошибка: ' + e);
            }
        },
    
        async fetchCurrencies() {
            const res = await axios.get('/currencies');
            this.currencies = res.data;
        },
    },
}    
</script>