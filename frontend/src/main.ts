import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import { router } from '@/router'
import App from './App.vue'
import { vuetify } from '@/plugins/vuetify'

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')
