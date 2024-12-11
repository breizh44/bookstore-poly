<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { locale } = useI18n()
const router = useRouter()
const route = useRoute()

const currentLang = ref<string>('')

const onLangChange = (lang: string) => {
  locale.value = lang

  router.push({
    path: route.path,
    query: {
      ...route.query,
      lang: lang,
    },
  })
}

const l = (route.query.lang as string) || 'en'
currentLang.value = l
locale.value = l
</script>

<template>
  <select
    class="bg-gray-200 text-black rounded-lg px-2 py-1"
    :value="currentLang"
    @change="onLangChange(($event.target as HTMLSelectElement).value)"
  >
    <option value="fr">Français</option>
    <option value="en">English</option>
  </select>
</template>
