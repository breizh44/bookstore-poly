<script setup lang="ts">
import type { Author } from '@/types/author.type'

const props = defineProps<{ author: Author }>()
</script>

<template>
  <div class="bg-gray-200 border border-gray-800 rounded-lg p-4 space-y-2">
    <h2 class="text-xl font-bold">{{ props.author.name }}</h2>
    <div>
      <p class="rounded-full bg-blue-200 px-4 py-1 inline">{{ props.author.book.length }}</p>
    </div>
  </div>
</template>
