import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import '@fontsource/montserrat'

import App from './App.vue'
import router from './router'

import en from './locales/en.json'
import fr from './locales/fr.json'
import '@fortawesome/fontawesome-free/css/all.css'
import '../node_modules/flowbite-vue/dist/index.css'

const i18n = createI18n({
    locale: 'fr',
    fallbackLocale: 'en',
    messages: {
        en,
        fr,
    },
})

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
