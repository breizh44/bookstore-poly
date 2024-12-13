<template>
  <!--
  <button @click="toggleDarkMode">Basculer {{ isDarkMode ? 'Mode Clair' : 'Mode Sombre' }}</button>
  -->

  <button @click="toggleDarkMode" class="p-2 rounded-full text-gray-800 dark:text-gray-200">
    <MoonIcon v-if="isDarkMode" class="w-6 h-6" />
    <SunIcon v-else class="w-6 h-6" />
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid'

// Vérifie si le mode sombre est déjà activé dans le localStorage
const savedMode = localStorage.getItem('darkMode') === 'true'
const isDarkMode = ref(savedMode)

onMounted(() => {
  // Applique ou retire la classe `dark` à l'élément <html>
  document.documentElement.classList.toggle('dark', isDarkMode.value)
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  console.log('isDarkMode : ', isDarkMode.value)
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  // Sauvegarde l'état dans le localStorage
  localStorage.setItem('darkMode', isDarkMode.value.toString())
}
</script>
