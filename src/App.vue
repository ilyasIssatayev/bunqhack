<script setup>
import { ref } from 'vue';
import PwaButton from "./components/PwaButton.vue";
import Notification from "./components/Notification.vue";
import Stepper from '@/components/Stepper.vue'

const counter = ref(0);

function clickMe() {
  counter.value++;
}
</script>

<template>
  <div class="flex flex-col">
    <div class="w-full h-full bg-gradient-to-r from-[#00172e] via-[#23002e] to-[#2e1300] absolute origin-center animate-gradient-animation-linear">
    <Stepper />
  </div>

    <PwaButton></PwaButton>
    <Notification></Notification>
  </div>
</template>
