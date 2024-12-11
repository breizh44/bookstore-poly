<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LangSelector from './components/molecules/LangSelector.vue'
</script>

<template>
  <header class="p-3 flex flex-row items-center bg-gray-900">
    <img alt="Vue logo" class="h-14" src="@/assets/book-logo.png" />

    <nav class="ml-5 flex flex-row items-center gap-4 text-white font-bold text-lg">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/authors">Authors</RouterLink>
      <LangSelector />
    </nav>
  </header>

  <Suspense>
    <RouterView class="mt-2" />
  </Suspense>
</template>
