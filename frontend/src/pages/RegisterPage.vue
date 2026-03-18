<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const router = useRouter()

const name = ref('Admin')
const email = ref('admin@example.com')
const password = ref('password123')
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

async function submit() {
  loading.value = true
  error.value = null
  success.value = null
  try {
    await auth.register(name.value, email.value, password.value)
    success.value = 'Account created. You can login now.'
    setTimeout(() => router.push('/login'), 600)
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Register failed'
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
          <v-card-title class="text-h5">Register</v-card-title>
          <v-card-text>
            <v-alert v-if="error" type="error" class="mb-4" variant="tonal">{{ error }}</v-alert>
            <v-alert v-if="success" type="success" class="mb-4" variant="tonal">{{ success }}</v-alert>

            <v-form @submit.prevent="submit">
              <v-text-field v-model="name" label="Name" autocomplete="name" />
              <v-text-field v-model="email" label="Email" type="email" autocomplete="email" />
              <v-text-field v-model="password" label="Password" type="password" autocomplete="new-password" />
              <v-btn :loading="loading" type="submit" color="primary" block class="mt-2">Create account</v-btn>
            </v-form>

            <div class="mt-4 text-body-2">
              Already have an account?
              <router-link to="/login">Login</router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

