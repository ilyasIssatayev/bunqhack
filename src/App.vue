<script setup>
import { ref } from 'vue';

const counter = ref(0);

function clickMe() {
  counter.value++;
}
</script>

<template>
  <div>
    <button @click="clickMe">
      Click
    </button>
    {{ counter }}
  </div>
</template>
