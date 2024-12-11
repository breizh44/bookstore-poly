<script setup lang="ts">
import AuthorList from '@/components/organisms/AuthorList.vue'
import type { Author } from '@/types/author.type'
import axios from 'axios'

const response = await axios.get('http://localhost:4000/authors?populate=true')
const authorsList: Author[] = response.data
</script>

<template>
  <main class="mt-2">
    <AuthorList :author-list="authorsList" />
  </main>
</template>
