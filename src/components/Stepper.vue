<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import OverviewModal from '@/components/OverviewModal.vue'
import GoalChart from '@/components/GoalChart.vue'

const router = useRouter() 
const step = ref(0)
const selectedGoal = ref()
const showOverviewModal = ref(false)

const titles = [
  'Select Your Goal',
  'Set up Your Goal',
  'Goals Overview',
  'You set a new Goal !'
]

const goals = [
  {
    title: 'Emergency Fund',
    description: 'Build a safety net for unexpected expenses like car repairs or medical bills.',
    icon: 'fa-solid fa-shield-heart',
    color: '#004d40',
    textColor: '#26c6da'
  },
  {
    title: 'Vacation Savings',
    description: 'Set aside money for your next holiday or weekend getaway.',
    icon: 'fa-solid fa-umbrella-beach',
    color: '#3e2723',
    textColor: '#ffcc80'
  },
  {
    title: 'Retirement Investment',
    description: 'Invest long-term in retirement accounts like IRA or 401(k).',
    icon: 'fa-solid fa-piggy-bank',
    color: '#1a237e',
    textColor: '#7986cb'
  },
  {
    title: 'Stock Market',
    description: 'Grow your wealth through individual stocks or ETFs.',
    icon: 'fa-solid fa-chart-line',
    color: '#263238',
    textColor: '#4dd0e1'
  },
  {
    title: 'Real Estate Fund',
    description: 'Save or invest in property or REITs for passive income.',
    icon: 'fa-solid fa-house-chimney',
    color: '#4a148c',
    textColor: '#ba68c8'
  },
  {
    title: 'New Car Fund',
    description: 'Gradually save for a vehicle upgrade or purchase.',
    icon: 'fa-solid fa-car-side',
    color: '#880e4f',
    textColor: '#f06292'
  }
]

const totalSteps = titles.length

const progressWidth = computed(() => {
  return `${(step.value / (totalSteps - 1)) * 100}%`
})

const handleClose = () => {
  showOverviewModal.value = false
}

const back = () => {
  if (!step.value) return
  step.value--
}

const next = async () => {
  if (step.value >= totalSteps - 1) return
  if (step.value === 2) {
    const res = await fetch('http://localhost:3000/goal/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'description': selectedGoal.value.description,
            'goal': selectedGoal.value.title,
            'goal_sum': `${selectedGoal.value.amount}`,
        })
    })
    const { id } = await res.json();
    localStorage.setItem('goalId', id);
  }
  step.value++
}

const setGoal = (goal) => {
  selectedGoal.value = {
    ...goal,
    description: goal.description || '',
    amount: goal.amount || 0
  }
}

const goToBankDetails = () => {
  router.push('/bank-details')
}
</script>

<template>
  <div class="w-full h-full p-4 flex-col items-between grid gap-6">

    <div class="w-full text-center text-gray-800 text-lg font-medium">
      <h1 class="text-5xl font-semibold text-white mb-4 transition-all duration-300">{{ titles[step] }}</h1>
      <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
        <div
        class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500 transition-all duration-500"
        :style="{ width: progressWidth }"
      ></div>
      </div>
    </div>

    <div v-if="step === 0" class="w-full grid gap-6 text-center">
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(goal, index) in goals"
          :key="index"
          @click="setGoal(goal)"
          :class="[
            'block p-6 border-2 rounded-lg shadow-sm hover:brightness-110 transition duration-300 cursor-pointer',
            selectedGoal?.title === goal.title ? `border-[]` : 'border-transparent'
          ]"
          :style="{
            background: 'rgba(255, 255, 255, 0.09)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            color: goal.textColor
          }"
        >
        <span class="mb-2 text-xl font-bold tracking-tight grid items-center justify-center gap-2">
          <i :class="goal.icon" class="text-2xl" :style="{ color: goal.textColor }"></i>
          {{ goal.title }}
        </span>
          <p class="font-normal text-white/80">
            {{ goal.description }}
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="step === 1" class="w-full grid gap-6 text-center">
      <div class="grid gap-8 w-full">
        <div class="text-left">
          <label class="block text-white text-lg mb-2">Goal Description</label>
          <textarea
            v-model="selectedGoal.description"
            rows="4"
            class="w-full px-6 py-4 text-base rounded-xl bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff6a00] resize-none"
            placeholder="e.g. Save for a family vacation next summer"
          ></textarea>
        </div>

        <div class="text-left">
          <label class="block text-white text-lg mb-2">Target Amount ($)</label>
          <input
            v-model.number="selectedGoal.amount"
            type="number"
            min="0"
            class="w-full px-6 py-4 text-base rounded-xl bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
            placeholder="e.g. 5000"
          />
        </div>
      </div>
    </div>

    <div v-else-if="step === 2" class="w-full grid gap-6 text-center">
      <div class="mx-auto w-full p-6 rounded-2xl bg-white/5 shadow-xl backdrop-blur-xl text-white">
        <h2 class="text-3xl font-semibold mb-2">{{ selectedGoal.title }}</h2>
        <p class="mb-4 text-white/80">{{ selectedGoal.description }}</p>
        <p class="mb-6 text-lg">🎯 Target Amount: <strong>${{ selectedGoal.amount }}</strong></p>
        
        <h3 class="text-xl mb-2">📊 Average Savings (based on community data)</h3>
        <GoalChart :goal="selectedGoal" />
      </div>
    </div>

    <div v-else>
      <div class="flex justify-center items-center text-white/70 text-center">
        <i class="fa-solid fa-check-circle text-4xl text-green-500 mr-4"></i>
        <h2 class="text-3xl font-semibold">
          You have successfully set your goal!
        </h2>
      </div>
      <p class="mt-4 text-lg text-white/80 text-center">
        Congratulations! Your goal is now saved. You're on your way to achieving your target. Check out your progress and start taking steps towards your financial success!
      </p>
    </div>

    <div v-if="step < titles.length - 1" class="flex gap-4 w-full">
      <button
        @click="back"
        :class="!step ? 'opacity-60' : ''"
        class="px-6 py-4 border-3 border-[#ff6a00] text-[#ff6a00] rounded-full w-full"
      >
        Prev
      </button>
      <button
        @click="next"
        class="px-6 py-4 bg-[#ff6a00] text-white rounded-full w-full"
      >
        <span v-if="step === 2">
          Set you goal !
        </span>
        <span v-else>
          Next
        </span>
      </button>
    </div>

    <div v-else class="flex gap-4 w-full">
      <button
        @click="goToBankDetails"
        class="px-6 py-4 bg-[#4caf50] text-white rounded-full w-full"
      >
        Go to Bank Details
      </button>
    </div>
  </div>
</template>
