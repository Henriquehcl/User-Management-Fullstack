<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { useUsersStore } from '@/store/users'

const users = useUsersStore()
const router = useRouter()

onMounted(() => {
  users.fetchAll()
})

async function removeUser(id: string) {
  await users.remove(id)
}
</script>

<template>
  <AppLayout>
    <div class="d-flex align-center mb-4">
      <div class="text-h6">Users</div>
      <v-spacer />
      <v-btn color="primary" to="/users/new">Create user</v-btn>
    </div>

    <v-card>
      <v-data-table
        :items="users.items"
        :loading="users.loading"
        item-key="id"
        :headers="[
          { title: 'Name', key: 'name' },
          { title: 'Email', key: 'email' },
          { title: 'Actions', key: 'actions', sortable: false }
        ]"
      >
        <template #item.actions="{ item }">
          <v-btn size="small" variant="text" @click="router.push(`/users/${item.id}/edit`)">Edit</v-btn>
          <v-btn size="small" variant="text" color="error" @click="removeUser(item.id)">Delete</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </AppLayout>
</template>

