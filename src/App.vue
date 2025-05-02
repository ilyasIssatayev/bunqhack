<script setup>
import { ref } from 'vue';
import PwaButton from "./components/PwaButton.vue";
import Notification from "./components/Notification.vue";

const counter = ref(0);

function clickMe() {
  counter.value++;
}
</script>

<template>
  <div class="flex flex-col">
    <button @click="clickMe">
      Click
    </button>
    {{ counter }}

    <PwaButton></PwaButton>
    <Notification></Notification>
  </div>
</template>
