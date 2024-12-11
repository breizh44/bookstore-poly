<script setup lang="ts">
const { genreList } = defineProps<{ genreList: string[] }>()

const genre = defineModel<string>('genre')
</script>

<template>
  <select v-model="genre" class="bg-gray-200 rounded-lg border border-gray-300 px-3">
    <option v-for="genre in genreList" :key="genre" :value="genre">{{ genre }}</option>
  </select>
</template>
