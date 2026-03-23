import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './app/router'
import { applyThemeFromConfig } from './lib/theme'
import './style.css'
import 'primeicons/primeicons.css'

applyThemeFromConfig()

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'none'
    }
  }
})

app.mount('#app')
