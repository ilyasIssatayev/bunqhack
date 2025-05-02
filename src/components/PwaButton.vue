<template>
    <button class=" bg-amber-500 rounded-2xl px-4 py-2 mx-auto pointer" v-if="canInstall" @click="promptInstall">
      Install App
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const deferredPrompt = ref(null)
  const canInstall = ref(false)
  
  onMounted(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      canInstall.value = true
    })
  })
  
  async function promptInstall() {
    if (!deferredPrompt.value) return
  
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    console.log(`User response to install prompt: ${outcome}`)
    deferredPrompt.value = null
    canInstall.value = false
  }
  </script>
  