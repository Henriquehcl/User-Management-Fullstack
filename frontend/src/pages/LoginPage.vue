<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('admin@example.com')
const password = ref('password123')
const loading = ref(false)
const error = ref<string | null>(null)

async function submit() {
  loading.value = true
  error.value = null
  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" style="max-width: 420px">
        <v-card class="pa-6" elevation="6">
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <v-alert v-if="error" type="error" class="mb-4" variant="tonal">{{ error }}</v-alert>

            <v-form @submit.prevent="submit">
              <v-text-field v-model="email" label="Email" type="email" autocomplete="email" />
              <v-text-field v-model="password" label="Password" type="password" autocomplete="current-password" />
              <v-btn :loading="loading" type="submit" color="primary" block class="mt-2">Sign in</v-btn>
            </v-form>

            <div class="mt-4 text-body-2">
              No account?
              <router-link to="/register">Create one</router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

