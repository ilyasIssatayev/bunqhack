<script setup>
import { toast } from 'vue3-toastify';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import PwaButton from "./components/PwaButton.vue";
import Notification from "./components/Notification.vue";
import Stepper from '@/components/Stepper.vue';

const route = useRoute();
const router = useRouter();

const counter = ref(0);

function clickMe() {
  counter.value++;
}

onMounted(() => {
    showNotification();
});

const showNotification = () => {
  toast.success('Operation successful! Check you goal progress :)', {
    position: 'top-center',
    theme: 'colored',
    closeOnClick: false,
    hideProgressBar: true,
    dangerouslyHTMLString: true,
    onClick: () => {
      router.push('/reach-the-goal');
    },
  });
};
</script>

<template>
  <div class="flex flex-col">
    <div class="w-full min-h-full bg-gradient-to-r from-[#00172e] via-[#23002e] to-[#2e1300] absolute origin-center animate-gradient-animation-linear">
      <router-view />
    </div>
    <Notification />
  </div>
</template>
