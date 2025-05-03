import './assets/main.css'
import 'vue3-toastify/dist/index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import router from './router'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')

// if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//       .register("/service-worker.js")
//       .then(reg => {
//         console.log("✅ Service Worker registered!", reg);
//       })
//       .catch(err => {
//         console.error("❌ Service Worker registration failed:", err);
//       });
//   }