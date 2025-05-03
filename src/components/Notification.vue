<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const showNotification = () => {
    toast.success('Operation successful!', {
        position: 'top-right',
        autoClose: 3000,
    });
}
</script>

<template>
    <button @click="showNotification" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Subscribe to Notifications
    </button>
    <p class="mt-2 text-sm text-gray-700">{{ message }}</p>
</template>
