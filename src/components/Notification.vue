<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const poll = ref(null);
const ID = ref(-1)

const fetchPoll = async () => {
    try {
        const res = await fetch('http://localhost:3000/goal/poll/' + ID.value, {
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
    toast.success(message, {
        position: 'top-center',
        "theme": "dark",
        "type": "info",
        "closeOnClick": false,
        "hideProgressBar": true,
        "dangerouslyHTMLString": true
    });
}

onMounted(async () => {
    const res = await fetch('http://localhost:3000/goal/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'description': 'goal_data.description,',
            'goal': 'goal_data.goal',
            'goal_sum': '0',
        })
    })

    const { id } = await res.json();
    console.log("ID ", id)
    ID.value = id;

    fetchPoll() // call immediately on mount
    const intervalId = setInterval(fetchPoll, 3000) // then every 3 seconds
})
</script>

<template>
    <div class="w-1 h-1">pixel</div>
</template>
