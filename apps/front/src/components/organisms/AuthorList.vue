<script setup lang="ts">
import type { Author } from '@/types/author.type'
import AuthorCard from '../molecules/AuthorCard.vue'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import SortBar from '../molecules/SortBar.vue'
import SearchBar from '../molecules/SearchBar.vue'
import { useI18n } from 'vue-i18n'

const { authorList } = defineProps<{ authorList: Author[] }>()

const route = useRoute()
const { t } = useI18n()

const sortDirection = ref<'asc' | 'desc'>((route.query.sortDirection as 'asc' | 'desc') || 'asc')
const sortBy = ref<keyof Author>((route.query.sortBy as keyof Author) || 'name')
const searchText = ref<string>('')
const keyList = {
  name: t('author.sort.keys.name'),
}

const sortedFilteredAuthors = computed(() => {
  const filtered = authorList.filter((author) => {
    return author.name.toLowerCase().includes(searchText.value.toLowerCase())
  })

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
  <SearchBar v-model="searchText" />
  <SortBar v-model:sort-by="sortBy" v-model:sort-direction="sortDirection" :keylist="keyList" />
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mx-8 my-4">
    <AuthorCard v-for="author in sortedFilteredAuthors" :key="author.id" :author="author" />
  </div>
</template>
