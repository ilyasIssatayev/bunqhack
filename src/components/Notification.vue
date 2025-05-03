<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

const router = useRouter();

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

  toast.info(`🚀 ${message}`, {
    position: 'top-center',
    theme: 'dark',
    hideProgressBar: true,
    closeOnClick: false,
    onClick: () => {
      router.push('/reach-the-goal');
    },
    dangerouslyHTMLString: true,
    style: {
      backgroundColor: bgColor,
      color: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
    },
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
