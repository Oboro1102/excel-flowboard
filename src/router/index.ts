import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/BoardView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error',
      component: () => import('@/views/ErrorView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

const isAuthenticated = () => {
  const token = sessionStorage.getItem('z2y8x4w6v1u9')
  const user = sessionStorage.getItem('a7b3c9d1e5f8')
  return token && token.split('-').length >= 3 && user && user.length > 0
}

router.beforeEach(async (to) => {
  if (
    !isAuthenticated() &&
    !['Login', 'Register'].includes(to.name as string)
  ) {
    return { name: 'Login' }
  }
})

export default router
