<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
      <h2 class="mb-4 text-xl font-bold text-gray-800">{{ title }}</h2>
      <p class="mb-6 text-gray-700">{{ message }}</p>
      <div class="flex justify-end gap-4">
        <button
          class="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          @click="$emit('cancel')"
        >
          Отмена
        </button>
        <button
          class="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
          @click="$emit('confirm')"
        >
          Подтвердить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    title: {
      type: String,
      default: 'Подтвердите действие'
    },
    message: {
      type: String,
      default: 'Вы уверены, что хотите продолжить?'
    }
  }
}
</script>
