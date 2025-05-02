  
  <script setup>
  import {ref} from 'vue';

  const message = ref('')

  async function sendNotification() {
  try {
    const permission = await Notification.requestPermission();
    console.log('Permission:', permission);

    if (permission === 'granted') {
      const notif = new Notification('It works!', { body: 'Plain test message.',icon: 'icon-512-512.png' });
      console.log('notif ',notif)
      message.value = 'Notification sent';
    } else {
      message.value = 'Notification permission denied';
    }
  } catch (e) {
    message.value = 'Error: ' + e.toString();
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

  