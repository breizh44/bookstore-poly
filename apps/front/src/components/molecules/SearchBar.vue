<script setup lang="ts">
const searchText = defineModel<string>('')
</script>

<template>
  <input
    type="text"
    v-model="searchText"
    class="bg-gray-200 rounded-lg border border-gray-300 px-3"
    placeholder="Rechercher un livre"
  />
</template>
