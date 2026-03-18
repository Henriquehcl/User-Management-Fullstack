<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const title = computed(() => {
  if (route.path.startsWith('/users')) return 'Users'
  return 'Dashboard'
})

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" density="comfortable">
      <v-app-bar-title>{{ title }}</v-app-bar-title>
      <v-spacer />
      <v-btn variant="text" @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-navigation-drawer permanent>
      <v-list nav>
        <v-list-item to="/dashboard" title="Dashboard" />
        <v-list-item to="/users" title="Users" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-6">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

