<template>
    <button
      @click="sendNotification"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Send Notification
    </button>
  </template>
  
  <script setup>
  async function sendNotification() {
    new Notification('It works!', { body: 'Plain test message.' });
    const permission = await Notification.requestPermission()
    console.log(Notification.permission) 
    if (permission === 'granted') {
        new Notification('It works!', { body: 'Plain test message.' });
    } else {
      alert('Notification permission denied')
    }
  }
  </script>
  