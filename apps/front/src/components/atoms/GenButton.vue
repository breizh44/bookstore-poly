<script setup lang="ts">
const props = defineProps<{ text: string }>()

const emit = defineEmits<{ click: [e: MouseEvent] }>()
</script>

<template>
  <button class="btn-blue" @click="emit('click', $event)">
    {{ props.text }}
  </button>
</template>
