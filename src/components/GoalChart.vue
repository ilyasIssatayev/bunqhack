<script setup>
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

const props = defineProps({
  goal: Object
})

const chartData = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'People saved on average',
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
      ticks: { color: 'white' },
      grid: { color: 'rgba(255, 255, 255, 0.2)' }
    },
    x: {
      ticks: { color: 'white' },
      grid: { color: 'rgba(255, 255, 255, 0.2)' }
    }
  },
  plugins: {
    legend: {
      labels: { color: 'white' }
    }
  }
}
</script>

<template>
  <div class="w-full h-64">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
