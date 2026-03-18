<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { useUsersStore } from '@/store/users'

const store = useUsersStore()
const route = useRoute()
const router = useRouter()

const id = String(route.params.id)
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  const user = await store.getById(id)
  name.value = user.name
  email.value = user.email
})

async function submit() {
  loading.value = true
  error.value = null
  try {
    await store.update(id, { name: name.value, email: email.value, ...(password.value ? { password: password.value } : {}) })
    router.push('/users')
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Update failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AppLayout>
    <v-card class="pa-6" max-width="640">
      <div class="text-h6 mb-4">Edit user</div>
      <v-alert v-if="error" type="error" class="mb-4" variant="tonal">{{ error }}</v-alert>

      <v-form @submit.prevent="submit">
        <v-text-field v-model="name" label="Name" />
        <v-text-field v-model="email" label="Email" type="email" />
        <v-text-field v-model="password" label="New password (optional)" type="password" />
        <div class="d-flex ga-2 mt-2">
          <v-btn variant="text" to="/users">Cancel</v-btn>
          <v-spacer />
          <v-btn :loading="loading" color="primary" type="submit">Save</v-btn>
        </div>
      </v-form>
    </v-card>
  </AppLayout>
</template>

