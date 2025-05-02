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
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      new Notification('✅ Notification sent!', {
        body: 'This is a push-style message.',
        icon: '/icon-192-192.png'
      })
    } else {
      alert('Notification permission denied')
    }
  }
  </script>
  