<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps<{ keylist: { [key: string]: string } }>()

const sortBy = defineModel<string>('sortBy')
const sortDirection = defineModel<'asc' | 'desc'>('sortDirection')

const sortBooks = (sortKey: string) => {
  const newDirection = sortDirection.value === 'asc' ? 'desc' : 'asc'

  sortBy.value = sortKey
  sortDirection.value = newDirection

  router.push({
    path: route.path,
    query: {
      ...route.query,
      sortBy: sortKey,
      sortDirection: newDirection,
    },
  })
}
</script>
<template>
  <button
    v-for="(value, key, index) in props.keylist"
    :key="index"
    @click="sortBooks(key as string)"
    class="px-4 py-2 rounded-lg ml-2"
    :class="[sortBy === key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black']"
  >
    {{ value }}
    <span v-if="sortBy === key" class="ml-1">
      {{ sortDirection === 'asc' ? '↑' : '↓' }}
    </span>
  </button>
</template>
