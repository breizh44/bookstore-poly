<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LangSelector from './components/molecules/LangSelector.vue'
import ViewModeSelector from './components/molecules/viewModeSelector.vue'
</script>

<template class="font-sans">
  <header class="p-3 flex flex-row items-center">
    <img alt="Vue logo" class="h-14" src="@/assets/book-logo.png" />

    <nav
      class="ml-5 flex flex-row items-center gap-4 font-bold text-lg text-text-light dark:text-text-dark font-sans"
    >
      <RouterLink to="/" class="hover:border-blue-400 dark:hover:border-green-400 hover:border-2"
        >Home</RouterLink
      >
      <RouterLink
        to="/authors"
        class="hover:border-blue-400 dark:hover:border-green-400 hover:border-2"
        >Authors</RouterLink
      >
      <LangSelector />
      <ViewModeSelector />
    </nav>
  </header>

  <Suspense>
    <RouterView class="mt-2" />
  </Suspense>
</template>
