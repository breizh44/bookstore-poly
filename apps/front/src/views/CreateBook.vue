<script setup lang="ts">
import GenButton from '@/components/atoms/GenButton.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()

const title = ref<string>('')
const year = ref<string>('')
const genre = ref<string>('')

const resultMsg = ref<string>('')
const errorMsg = ref<string>('')

const addbook = async () => {
  if (isNaN(Number(year.value)) || year.value.length === 0) {
    errorMsg.value = t('book.error.year')
    return
  }

  if (title.value.length === 0) {
    errorMsg.value = t('book.error.title.mandatory')
    return
  }

  if (genre.value.length === 0) {
    errorMsg.value = t('book.error.genre.mandatory')
    return
  }

  const response = await axios.post('http://localhost:4000/books', {
    title: title.value,
    year: year.value,
    genre: genre.value,
  })
  if (response.status === 200) {
    resultMsg.value = t('book.action.success')
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } else {
    errorMsg.value = t('book.action.failed')
  }
}
</script>
<template>
  <div class="flex flex-col gap-2 items-center">
    <h1 class="text-xl font-bold">Create book</h1>
    <label for="title">{{ $t('book.title') }}</label>
    <input
      class="bg-gray-200 text-black rounded-lg px-2 py-1"
      type="text"
      id="title"
      v-model="title"
    />
    <label for="year">{{ $t('book.year') }}</label>
    <input
      class="bg-gray-200 text-black rounded-lg px-2 py-1"
      type="text"
      id="year"
      v-model="year"
    />
    <label for="genre">{{ $t('book.genre') }}</label>
    <input
      class="bg-gray-200 text-black rounded-lg px-2 py-1"
      type="text"
      id="genre"
      v-model="genre"
    />
    <p class="text-green-500 font-bold text-lg">{{ resultMsg }}</p>
    <p class="text-red-500 font-bold text-lg">{{ errorMsg }}</p>
    <GenButton class="block" :text="$t('book.action.add')" @click="addbook" />
  </div>
</template>
