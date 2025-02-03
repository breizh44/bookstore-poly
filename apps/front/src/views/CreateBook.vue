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

const columnsZ = ref([
    'Colonne 1',
    'Colonne 2',
    'Colonne 3',
    'Colonne 4',
    'Colonne 5',
    'Colonne 6',
    'Colonne 7',
    'Colonne 8',
    'Colonne 9',
    'Colonne 10',
    'Colonne 11',
    'Colonne 12',
])

const rowsZ = ref([
    {
        id: 1,
        fixedColumn: 'Fixe 1',
        data: [
            'Data 1',
            'Data 2',
            'Data 3',
            'Data 4',
            'Data 5',
            'Data 6',
            'Data 7',
            'Data 8',
            'Data 9',
            'Data 10',
            'Data 11',
            'Data 12',
        ],
    },
    {
        id: 2,
        fixedColumn: 'Fixe 2',
        data: [
            'Data 5',
            'Data 6',
            'Data 7',
            'Data 8',
            'Data 9',
            'Data 10',
            'Data 11',
            'Data 12',
            'Data 13',
            'Data 14',
            'Data 15',
            'Data 16',
        ],
    },
    {
        id: 3,
        fixedColumn: 'Fixe 3',
        data: [
            'Data 9',
            'Data 10',
            'Data 11',
            'Data 12',
            'Data 13',
            'Data 14',
            'Data 15',
            'Data 16',
            'Data 17',
            'Data 18',
            'Data 19',
            'Data 20',
        ],
    },
])

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
        <h1 class="text-xl font-bold text-text-light dark:text-text-dark">Create book</h1>
        <label for="title" class="text-text-light dark:text-text-dark">{{
            $t('book.title')
        }}</label>
        <input
            class="bg-gray-200 text-black rounded-lg px-2 py-1"
            type="text"
            id="title"
            v-model="title"
        />
        <label for="year" class="text-text-light dark:text-text-dark">{{ $t('book.year') }}</label>
        <input
            class="bg-gray-200 text-black rounded-lg px-2 py-1"
            type="text"
            id="year"
            v-model="year"
        />
        <label for="genre" class="text-text-light dark:text-text-dark">{{
            $t('book.genre')
        }}</label>
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
    <!-- Tableau pour test scroll horizontal : ne marche pas!! les colonnes de droite n'ont pas d'en-tête-->
    <div class="w-full overflow-x-auto border border-gray-300 rounded-md">
        <div class="min-w-[1200px]">
            <!-- En-tête -->
            <div class="flex border-b border-gray-300 bg-gray-100 sticky top-0 z-20">
                <div
                    class="w-32 px-4 py-2 font-bold text-gray-700 sticky left-0 bg-gray-100 z-30 shadow-md"
                >
                    Fixe
                </div>
                <div class="flex flex-1">
                    <div
                        v-for="column in columnsZ"
                        :key="column"
                        class="w-48 px-4 py-2 font-bold text-gray-700"
                    >
                        {{ column }}
                    </div>
                </div>
            </div>

            <!-- Lignes du tableau -->
            <div v-for="row in rowsZ" :key="row.id" class="flex border-b border-gray-300">
                <div class="w-32 px-4 py-2 sticky left-0 bg-white z-30 shadow-md">
                    {{ row.fixedColumn }}
                </div>
                <div class="flex flex-1">
                    <div v-for="(value, index) in row.data" :key="index" class="w-48 px-4 py-2">
                        {{ value }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Correction pour assurer que la colonne fixe est bien au-dessus des autres lors du scroll */
div.sticky {
    border-right: 1px solid #ccc;
}
</style>
