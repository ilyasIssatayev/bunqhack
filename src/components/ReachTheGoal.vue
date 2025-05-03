<template>
    <div class="min-h-screen p-6 bg-gradient-to-br from-[#1a1a40] to-[#000814] text-white">
      <div class="max-w-3xl mx-auto space-y-8">
        <h1 class="text-4xl font-bold text-center">🎉 Wow, you're almost there!</h1>
        <p class="text-center text-white/80 text-lg">
          You’ve made incredible progress toward your goal. Keep going — you're so close!
        </p>
  
        <div class="p-6 bg-white/5 rounded-xl border border-white/10 shadow-xl">
          <h2 class="text-2xl font-semibold mb-2">{{ goal.title }}</h2>
          <p class="mb-2 text-white/80">{{ goal.description }}</p>
          <p class="mb-1">🎯 <strong>Target:</strong> ${{ goal.amount }}</p>
          <p>📈 <strong>Saved so far:</strong> ${{ goal.saved }}</p>
        </div>
  
        <div class="bg-white/5 p-6 rounded-xl shadow-md border border-white/10">
          <h3 class="text-xl font-semibold mb-4">Your Progress Over Time</h3>
          <GoalChart :goal="goal" />
        </div>
  
        <div class="text-center mt-6">
          <p class="text-xl">🚀 Keep it up, you're crushing it!</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import GoalChart from '@/components/GoalChart.vue'
  
  const goal = {
    title: 'Vacation Savings',
    description: 'Saving up for a summer trip to Italy 🍕',
    amount: 5000,
    saved: 4200
  }
  </script>
  