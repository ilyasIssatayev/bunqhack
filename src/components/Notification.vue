<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

const router = useRouter();

const poll = ref(null);
const ID = ref(-1)

const MAP = {
    "payment":{
        color: "#1F423B",
        icon: "💰"
    },
    "goal-investment":{
        color: "#0E2549",
        icon: "🎯"
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

        const {message, type} = await res.json()
        if(message) showNotification(message, type);
    } catch (err) {
        // $toast.error('Error: ' + err.message)
    }
}

const showNotification = (message, type) => {
  let bgColor = '#0E2549';
  let icon = 'X'
    console.log('type', MAP[type]);
  if (type) {
    bgColor = MAP[type].color ?? "#0E2549";
    icon = MAP[type].icon ?? "X";
}

    const html = `
    <div class="custom-toast" style="
      background-color: ${bgColor}; 
      color: white; 
      padding: 12px 16px; 
      border-radius: 8px;
      font-size: 20px;
    ">
      ${icon} ${message}
    </div>
  `;

  toast.info(html, {
    position: 'top-center',
    theme: 'dark',
    icon: false,
    hideProgressBar: true,
    closeOnClick: false,
    onClick: () => {
      router.push('/reach-the-goal');
    },
    dangerouslyHTMLString: true,
  });
};

onMounted(async () => {
    fetchPoll() // call immediately on mount
    const intervalId = setInterval(fetchPoll, 3000) // then every 3 seconds
})
</script>

<template>
    <div class="w-1 h-1">pixel</div>
</template>
