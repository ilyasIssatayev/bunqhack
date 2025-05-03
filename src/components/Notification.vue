<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify';

const poll = ref(null);
const ID = ref(-1)

const MAP = {
    "payment":{
        color: "#46340A",
        icon: "XX"
    },
    "goal-investment":{
        color: "#0E2549",
        icon: "XX"
    }
}

const fetchPoll = async () => {
    const goalId = localStorage.getItem('goalId')
    if(goalId == undefined || goalId == null) return;
    try {
        const res = await fetch('http://localhost:3000/goal/poll/' + goalId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (!res.ok) throw new Error('Failed to fetch poll')

        const {message} = await res.json()
        if(message) showNotification(message);
    } catch (err) {
        // $toast.error('Error: ' + err.message)
    }
}

const showNotification = (message) => {
    const bgColor = '#0E2549';
    const html = `
    <div class="custom-toast" style="
      background-color: ${bgColor}; 
      color: white; 
      padding: 12px 16px; 
      border-radius: 8px;
      font-size: 14px;
    ">
      🚀 ${message}
    </div>
  `;

    const tot = toast.success(html, {
        icon: false,
        "transition": "slide",
        position: 'top-center',
        "theme": "dark",
        "type": "info",
        "closeOnClick": false,
        "autoClose": 200000,
        "hideProgressBar": true,
        "dangerouslyHTMLString": true
    });


}

onMounted(async () => {
    fetchPoll() // call immediately on mount
    const intervalId = setInterval(fetchPoll, 3000) // then every 3 seconds
})
</script>

<template>
    <div class="w-1 h-1">pixel</div>
</template>
