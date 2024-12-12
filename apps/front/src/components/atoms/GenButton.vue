<script setup lang="ts">
const props = defineProps<{ text: string }>()

const emit = defineEmits<{ click: [e: MouseEvent] }>()
</script>

<template>
  <button class="bg-blue-500 text-white px-4 py-2 rounded-lg" @click="emit('click', $event)">
    {{ props.text }}
  </button>
</template>
