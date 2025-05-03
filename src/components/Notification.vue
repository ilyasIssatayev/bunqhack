<script setup>
import { ref } from 'vue';

// Converts base64 VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}

const message = ref('');

async function subscribeToPush() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        message.value = '❌ Permission denied.';
        return;
      }

      const applicationServerKey = urlBase64ToUint8Array(
        'BNToWQ9PsohtdtABJHd7moM3LJTX3Iqv9iA4VwTEB3t2TcufL8O5DPPIFb9kbHIcWhE9B4hW5wc-LqUse_mwZWQ'
      );

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      console.log('✅ Push subscription:', subscription);
      message.value = '✅ Subscribed successfully.';
      
      // TODO: send `subscription` to your backend to store

    } catch (error) {
      console.error('Push subscription failed:', error);
      message.value = '❌ Subscription failed.';
    }
  } else {
    message.value = '❌ Push not supported in this browser.';
  }
}
</script>

<template>
  <button @click="subscribeToPush" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Subscribe to Notifications
  </button>
  <p class="mt-2 text-sm text-gray-700">{{ message }}</p>
</template>
