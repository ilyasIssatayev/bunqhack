<template>
    <div class="custom-toast">
      <div :class="`toast-icon ${iconClass}`">
        <!-- You can add any icon, or leave it empty based on the props passed -->
        <i v-if="iconClass" :class="iconClass"></i>
      </div>
      <div class="toast-message">
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    message: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      default: "fa fa-check", // Default icon
    },
  })
  </script>
  
  <style scoped>
  .custom-toast {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #333;
    color: white;
    border-radius: 5px;
  }
  
  .toast-icon {
    margin-right: 10px;
  }
  
  .toast-message p {
    margin: 0;
    font-size: 14px;
  }
  </style>
  