import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(reg => {
        console.log("✅ Service Worker registered!", reg);
      })
      .catch(err => {
        console.error("❌ Service Worker registration failed:", err);
      });
  }