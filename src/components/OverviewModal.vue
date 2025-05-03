<script setup>
import { ref } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const emit = defineEmits(['close']);
const props = defineProps(['overviewGoal']);

const isOpen = ref(false)

const close = () => {
  emit('close')
}

const chartData = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Progress',
      backgroundColor: '#ff6a00',
      data: [40, 55, 75, 90]
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: 'white'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)'
      }
    },
    x: {
      ticks: {
        color: 'white'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: 'white'
      }
    }
  }
}
</script>

<template>
  <div class="relative z-10" @click="close">
    <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full justify-center text-center place-items-center items-center px-8">
        <div
          @click.stop
          class="relative transform overflow-hidden rounded-lg bg-[#665151] backdrop-blur-2xl shadow-xl transition-all w-full p-8 text-center">
          <h3 class="text-3xl text-white mb-2">
            {{ overviewGoal.title }}
          </h3>
          <p class="font-normal text-white mb-6">
            {{ overviewGoal.description }}
          </p>
          <div class="w-full h-64">
            <Bar :data="chartData" :options="chartOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
