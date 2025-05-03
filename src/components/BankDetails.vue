<template>
    <div class="min-h-screen bg-gradient-to-br from-[#1a1a40] to-[#000814] text-white p-6">
      <h1 class="text-3xl font-bold mb-6">Bank Account Overview</h1>
  
      <!-- Account info section -->
      <div class="mb-10 p-6 bg-white/5 rounded-xl border border-white/10 shadow-md">
        <p><strong>👤 User:</strong> John Doe</p>
        <p><strong>🆔 Account ID:</strong> ACC-9384-XXXX</p>
        <p><strong>💰 Total Balance:</strong> $12,450.78</p>
        <p><strong>💳 Cards Linked:</strong> 3</p>
        <p><strong>📅 Last Synced:</strong> May 2, 2025 - 14:43</p>
        <p><strong>⭐ Plan:</strong> Premium</p>
      </div>
  
      <!-- Bank cards -->
      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="(card, index) in bankCards"
          :key="index"
          class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20"
        >
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-xl font-semibold">{{ card.bankName }}</h2>
            <span
              :class="card.status === 'Active' ? 'text-green-400' : 'text-red-400'"
            >
              {{ card.status }}
            </span>
          </div>
          <p class="text-sm text-white/80">Card Number: **** **** **** {{ card.last4 }}</p>
          <p class="text-sm text-white/80">Balance: ${{ card.balance.toFixed(2) }}</p>
          <p class="text-sm text-white/80">Expires: {{ card.expiry }}</p>
          <p class="text-sm text-white/80">Currency: {{ card.currency }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const bankCards = [
    {
      bankName: 'Revolut',
      last4: '1234',
      balance: 3400.50,
      expiry: '12/26',
      currency: 'USD',
      status: 'Active'
    },
    {
      bankName: 'bynq',
      last4: '5678',
      balance: 5420.10,
      expiry: '08/25',
      currency: 'UAH',
      status: 'Active'
    },
    {
      bankName: 'Wise',
      last4: '9012',
      balance: 3630.18,
      expiry: '03/27',
      currency: 'EUR',
      status: 'Blocked'
    }
  ]
  </script>
  