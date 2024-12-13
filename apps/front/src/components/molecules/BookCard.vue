<script setup lang="ts">
import type { Book } from '@/types/book.type'
import '../../assets/main.css'

const { book } = defineProps<{ book: Book }>()
</script>

<template>
  <div
    class="bg-gray-200 border border-gray-800 rounded-lg p-4 space-y-2 hover:scale-105 hover:border-green-400 hover:border-4 transition-all duration-200"
  >
    <h2 class="poly-LgTextBold">{{ book.title }}</h2>
    <p>{{ book.author }}</p>
    <p>{{ book.year }}</p>
    <div>
      <p
        class="rounded-full bg-blue-200 dark:bg-gray-700 text-text-light dark:text-text-dark px-4 py-1 inline"
      >
        {{ book.genre }}
      </p>
    </div>
  </div>
</template>
