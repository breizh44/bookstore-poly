<template>
    <div class="relative h-screen">
        <!-- Bouton rond -->
        <button
            @click="toggleDisplay"
            class="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-[#9f3e90] text-white flex items-center justify-center shadow-lg hover:bg-[#872e7a] transition"
        >
            <!-- Icône d'enveloppe -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 4.5h16.5c1.242 0 2.25 1.008 2.25 2.25v10.5c0 1.242-1.008 2.25-2.25 2.25H3.75C2.508 19.5 1.5 18.492 1.5 17.25V6.75C1.5 5.508 2.508 4.5 3.75 4.5z"
                />
                <path stroke-linecap="round" stroke-linejoin="round" d="M22.0 6.0l-10 6-10-6" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.0 18.0l+8.75-6.75" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M22.0 18.0l-8.75-6.75" />
            </svg>

            <!-- Pastille avec le nombre de messages -->
            <div
                v-if="logMessages.length > 0"
                class="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex justify-center items-center"
            >
                {{ logMessages.length }}
            </div>
        </button>

        <!-- Zone d'affichage avec transition -->
        <transition name="slide-up">
            <div
                v-if="isVisible"
                class="fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col items-start p-4 overflow-y-auto"
            >
                <h2 class="text-lg font-bold mb-4">Messages d'événements</h2>
                <ul class="space-y-2">
                    <li
                        v-for="log in logMessages"
                        :key="log.id"
                        class="flex items-center space-x-2 p-2 rounded-lg bg-gray-100"
                    >
                        <!-- Icône en fonction du niveau -->
                        <component :is="getIconComponent(log.level)" />
                        <span>{{ log.messageContent }}</span>
                    </li>
                </ul>

                <!-- Bouton "Effacer les messages" -->
                <button
                    v-if="logMessages.length > 0"
                    @click="clearMessages"
                    class="mt-4 w-full bg-red-600 text-white py-2 rounded-md shadow hover:bg-red-700"
                >
                    Effacer les messages
                </button>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Import des icônes
import IconInfo from '@/components/icons/IconInfo.vue'
import IconWarning from '@/components/icons/IconWarning.vue'
import IconError from '@/components/icons/IconError.vue'

// Définition de l'enum LogLevel
enum LogLevel {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
}

// Définition de l'objet LogMessage
interface LogMessage {
    id: number
    level: LogLevel
    messageContent: string
}

// État pour gérer la visibilité de la zone d'affichage
const isVisible = ref(false)

// Fonction pour basculer la visibilité
const toggleDisplay = () => {
    isVisible.value = !isVisible.value
}

const clearMessages = () => {
    logMessages.value = []
}

// Exemple de données (liste de logs)
const logMessages = ref<LogMessage[]>([
    { id: 1, level: LogLevel.INFO, messageContent: 'Application started successfully.' },
    { id: 2, level: LogLevel.WARNING, messageContent: 'Low disk space on drive C:.' },
    { id: 3, level: LogLevel.ERROR, messageContent: 'Failed to connect to the server.' },
])

// Fonction pour récupérer le composant d'icône en fonction du niveau
const getIconComponent = (level: LogLevel) => {
    switch (level) {
        case LogLevel.INFO:
            return IconInfo
        case LogLevel.WARNING:
            return IconWarning
        case LogLevel.ERROR:
            return IconError
        default:
            return null
    }
}
</script>

<style scoped>
/* Transition personnalisée */
.slide-up-enter-active,
.slide-up-leave-active {
    transition:
        transform 0.5s ease-in-out,
        opacity 0.5s ease-in-out;
}

.slide-up-enter-from {
    transform: translateY(100%);
    opacity: 0;
}

.slide-up-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.slide-up-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
</style>
