import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const LoginPage = () => import('@/pages/LoginPage.vue')
const RegisterPage = () => import('@/pages/RegisterPage.vue')
const DashboardPage = () => import('@/pages/DashboardPage.vue')
const UsersListPage = () => import('@/pages/UsersListPage.vue')
const UserCreatePage = () => import('@/pages/UserCreatePage.vue')
const UserEditPage = () => import('@/pages/UserEditPage.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', component: LoginPage, meta: { public: true } },
    { path: '/register', component: RegisterPage, meta: { public: true } },
    { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
    { path: '/users', component: UsersListPage, meta: { requiresAuth: true } },
    { path: '/users/new', component: UserCreatePage, meta: { requiresAuth: true } },
    { path: '/users/:id/edit', component: UserEditPage, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  const isPublic = Boolean(to.meta.public)
  const requiresAuth = Boolean(to.meta.requiresAuth)

  if (requiresAuth && !auth.isAuthenticated) return '/login'
  if (isPublic && auth.isAuthenticated) return '/dashboard'
})

