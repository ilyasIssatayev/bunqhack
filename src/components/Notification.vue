  
  <script setup>
  import {ref} from 'vue';

  const message = ref('')

  async function sendNotification() {
    new Notification('It works!', { body: 'Plain test message.' });
    const permission = await Notification.requestPermission()
    console.log(Notification.permission) 
    if (permission === 'granted') {
        new Notification('It works!', { body: 'Plain test message.' });
        message.value = 'it works'
        
    } else {
      alert('Notification permission denied')
      message.value = 'denied'
    }
  }
  </script>

<template>
    <button
      @click="sendNotification"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Send Notification
      {{ message }}
    </button>
  </template>

  