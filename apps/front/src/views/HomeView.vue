<script setup lang="ts">
import type { Book } from '@/types/book.type'
import BookList from '@/components/organisms/BookList.vue'
import axios from 'axios'
import { ref } from 'vue'

import GenButton from '@/components/atoms/GenButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const bookList = ref<Book[]>([])

const books = await axios.get('http://localhost:4000/books?populate=true')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
bookList.value = books.data.map((book: any) => {
  return { ...book, author: book.author.length > 0 ? book.author[0].name : '' }
})

const onClick = () => {
  router.push('/addbook')
}
</script>

<template>
  <main class="mt-2">
    <GenButton class="block" :text="$t('book.action.add')" @click="onClick" />
    <BookList :book-list="bookList" />
  </main>
</template>
