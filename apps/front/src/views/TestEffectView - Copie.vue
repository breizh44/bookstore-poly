<template>
    <div class="relative h-screen">
        <!-- Bouton rond -->
        <button
            @click="toggleDisplay"
            class="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-[#9f3e90] text-white flex items-center justify-center shadow-lg hover:bg-[#872e7a] transition"
        >
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
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75l-9 6-9-6" />
            </svg>
        </button>

        <!-- Zone d'affichage avec transition -->
        <transition name="slide-up">
            <div
                v-if="isVisible"
                class="fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex items-center justify-center"
            >
                <img src="@/assets/polysoude-logo.png" alt="Polysoude Logo" class="w-32 h-auto" />
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// État pour gérer la visibilité de la zone d'affichage
const isVisible = ref(false)

// Fonction pour basculer la visibilité
const toggleDisplay = () => {
    isVisible.value = !isVisible.value
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
