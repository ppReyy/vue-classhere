import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'homeRoom',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/new-class',
    name: 'new-class',
    component: () => import('../views/NewClassView.vue')
  },
  {
    path: '/classrooms/:id',
    name: 'classroom-detail',
    component: () => import('../components/ClassroomDetail.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
