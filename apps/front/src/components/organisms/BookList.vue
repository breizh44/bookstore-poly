<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Book } from '@/types/book.type'
import BookCard from '@/components/molecules/BookCard.vue'
import SortBar from '@/components/molecules/SortBar.vue'
import SearchBar from '@/components/molecules/SearchBar.vue'
import GenreFilter from '@/components/molecules/GenreFilter.vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { bookList } = defineProps<{ bookList: Book[] }>()

const route = useRoute()
const { t } = useI18n()

const sortDirection = ref<'asc' | 'desc'>((route.query.sortDirection as 'asc' | 'desc') || 'asc')
const sortBy = ref<keyof Book>((route.query.sortBy as keyof Book) || 'title')
const selectedGenre = ref<string>('All')
const searchText = ref<string>('')

const genreList = () => {
  const genres = new Set(bookList.map((book) => book.genre))
  return ['All', ...genres]
}

const keyList = {
  title: t('booklist.sort.keys.title'),
  author: t('booklist.sort.keys.author'),
  year: t('booklist.sort.keys.year'),
  genre: t('booklist.sort.keys.genre'),
}

const sortedFilteredBooks = computed(() => {
  let filtered: Book[] = []
  if (searchText.value === '') {
    filtered = bookList.filter((book) => {
      if (selectedGenre.value === 'All') {
        return true
      } else {
        return book.genre === selectedGenre.value
      }
    })
  } else {
    filtered = bookList.filter((book) => {
      return book.title.toLowerCase().includes(searchText.value.toLowerCase())
    })
  }

  const sorted = [...filtered].sort((a, b) => {
    const aValue = a[sortBy.value]
    const bValue = b[sortBy.value]

    if (sortDirection.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return sorted
})
</script>

<template>
  <!-- Liste des genres -->
  <GenreFilter :genre-list="genreList()" v-model:genre="selectedGenre" />

  <!-- recherche -->
  <SearchBar v-model="searchText" />

  <!-- Bouton de tri -->
  <SortBar v-model:sortBy="sortBy" v-model:sort-direction="sortDirection" :keylist="keyList" />
  <!-- Liste livres -->
  <div class="poly-Grid">
    <BookCard v-for="book in sortedFilteredBooks" :key="book.id" :book="book" />
  </div>
</template>
