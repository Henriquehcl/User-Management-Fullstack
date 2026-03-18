<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
</script>

<template>
  <AppLayout>
    <v-card class="pa-6" elevation="2">
      <div class="text-h6">Welcome</div>
      <div class="text-body-2 mt-2">You are logged in as <strong>{{ auth.user?.email }}</strong>.</div>
      <div class="text-body-2 mt-4">
        Go to <router-link to="/users">Users</router-link> to manage user accounts.
      </div>
    </v-card>
  </AppLayout>
</template>

