<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="w-full max-w-sm p-8 bg-white shadow-xl rounded-xl">
            <h2 class="mb-6 text-2xl font-bold text-center text-blue-700">Вход</h2>
            <form @submit.prevent="login" autocomplete="off">
                <div class="mb-4">
                    <input v-model="email" type="email" placeholder="Email" required
                        class="block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        autofocus />
                </div>
                <div class="mb-4">
                    <input v-model="password" type="password" placeholder="Пароль" required
                        class="block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <button type="submit" :disabled="loading"
                    class="w-full py-2 mb-2 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-60">
                    Войти
                </button>
                <div v-if="error" class="mt-3 text-center text-red-600 animate-pulse">
                    {{ error }}
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import api from '@/api/api';

export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            password: '',
            error: '',
            loading: false,
        };
    },
    methods: {
        async login() {
            this.loading = true;
            this.error = '';
            try {
                const res = await api.post('/login', {
                    email: this.email,
                    password: this.password,
                });
                
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                this.$router.push('/');
            } catch (e) {
                this.error = e.response?.data?.message || 'Ошибка входа';
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
