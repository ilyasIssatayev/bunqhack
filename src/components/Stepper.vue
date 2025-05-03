<script setup>
import { ref, computed } from 'vue'
import OverviewModal from '@/components/OverviewModal.vue'

const step = ref(0)
const selectedGoals = ref([])
const showOverviewModal = ref(false);

const titles = [
  'Set Your Goal',
  'Goals Overview',
  'Notifications'
];

const goals = [
  {
    title: 'Saving',
    description: 'Description',
    icon: '#',
    color: '#4b3300',
    textColor: '#f0a501'
  },
  {
    title: 'Investment',
    description: 'Description',
    icon: '#',
    color: '#4d0c18',
    textColor: '#fd2b55'
  },
  {
    title: 'Stuff 1',
    description: 'Description',
    icon: '#',
    color: '#3c1041',
    textColor: '#c834d7'
  },
  {
    title: 'Stuff 2',
    description: 'Description',
    icon: '#',
    color: '#00264b',
    textColor: '#027ffe'
  },
  {
    title: 'Stuff 3',
    description: 'Description',
    icon: '#',
    color: '#0c433b',
    textColor: '#2fdec9'
  },
  {
    title: 'Stuff 4',
    description: 'Description',
    icon: '#',
    color: '#0f2b15',
    textColor: '#328e45'
  }
]
const activeSelectedGoal = ref(null);

const totalSteps = titles.length

const progressWidth = computed(() => {
  return `${(step.value / (totalSteps - 1)) * 100}%`
})

const handleClose = () => {
  showOverviewModal.value = false;
  activeSelectedGoal.value = null;
}

const back = () => {
  if (!step.value) return
  step.value--
}

const next = () => {
  if (step.value >= totalSteps - 1) return
  step.value++
}

const setStep = (step) => {
  if (selectedGoals.value.find(el => el.title === step.title)) {
    selectedGoals.value = selectedGoals.value.filter(el => el.title !== step.title)
  } else {
    selectedGoals.value.push(step);
  }
}
</script>

<template>
  <div class="w-full h-full p-4 flex flex-col justify-between items-center">
    <div class="w-full max-w-md text-center text-gray-800 text-lg font-medium">
      <h1 class="text-5xl font-semibold text-white mb-4 transition-all duration-300">{{ titles[step] }}</h1>
      <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
        <div
        class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500 transition-all duration-500"
        :style="{ width: progressWidth }"
      ></div>
      </div>
    </div>

    <div v-if="step === 0" class="w-full grid gap-6 text-center">
      <h2 class="text-3xl text-white/70">Set Your Goal Description</h2>
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(goal, index) in goals"
          :key="index"
          @click="setStep(goal)"
          :class="[
            'block max-w-sm p-6 border-2 rounded-lg shadow-sm hover:brightness-110 transition duration-300 cursor-pointer',
            selectedGoals.find(el => el.title === goal.title) ? `border-[${goal.textColor}]` : 'border-transparent'
          ]"
          :style="{
            background: 'rgba(255, 255, 255, 0.09)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            color: goal.textColor
          }"
        >
          <span class="mb-2 text-xl font-bold tracking-tight block">
            {{ goal.title }}
          </span>
          <p class="font-normal text-white/80">
            {{ goal.description }}
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="step === 1" class="w-full grid gap-6 text-center">
      <h2 class="text-3xl text-white/70">Overview Description</h2>
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(goal, index) in selectedGoals"
          :key="index"
          @click="() => {
            activeSelectedGoal = goal;
            showOverviewModal = true;
          }"
          :class="[
            'block max-w-sm p-6 border-2 rounded-lg shadow-sm hover:brightness-110 transition duration-300 cursor-pointer',
            `border-[${goal.textColor}]`
          ]"
          :style="{
            background: 'rgba(255, 255, 255, 0.09)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            color: goal.textColor
          }"
        >
          <span class="mb-2 text-xl font-bold tracking-tight block">
            {{ goal.title }}
          </span>
          <p class="font-normal text-white/80">
            {{ goal.description }}
          </p>
        </div>
      </div>
    </div>

    <div v-else>
      <h2 class="text-3xl text-white/70">Notifications Description</h2>
    </div>

    <OverviewModal
      v-if="showOverviewModal"
      @close="handleClose"
      :overviewGoal="activeSelectedGoal"
    />

    <div class="flex gap-4 w-full">
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
        Next
      </button>
    </div>
  </div>
</template>
