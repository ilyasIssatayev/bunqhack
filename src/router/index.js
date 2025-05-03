import { createRouter, createWebHistory } from 'vue-router'
import Stepper from '@/components/Stepper.vue'
import BankDetails from '@/components/BankDetails.vue'
import ReachTheGoal from '@/components/ReachTheGoal.vue'

const routes = [
  {
    path: '/',
    name: 'Stepper',
    component: Stepper,
  },
  {
    path: '/bank-details',
    name: 'BankDetails',
    component: BankDetails,
  },
  {
    path: '/reach-the-goal',
    name: 'ReachTheGoal',
    component: ReachTheGoal,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
