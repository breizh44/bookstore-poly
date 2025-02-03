<template>
    <div class="w-full h-[calc(100vh-90px)] p-4">
        <div class="flex gap-8 items-start max-w-7xl h-full mx-auto">
            <!-- Colonne gauche -->
            <div class="flex-1 flex flex-col gap-4 h-full min-w-0">
                <!-- Conteneur SVG -->
                <div class="w-full relative" style="padding-bottom: min(100%, calc(100vh - 200px))">
                    <svg
                        class="absolute inset-0 w-full h-full border border-gray-300 bg-transparent"
                        viewBox="0 0 200 200"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <!-- Masque pour remplir la zone entre les cercles -->
                        <defs>
                            <mask id="tube-mask">
                                <circle cx="100" cy="100" :r="outerRadius" fill="white" />
                                <circle cx="100" cy="100" :r="innerRadius" fill="black" />
                            </mask>
                        </defs>

                        <!-- Remplissage gris de la zone entre les cercles -->
                        <rect
                            x="0"
                            y="0"
                            width="200"
                            height="200"
                            fill="lightgray"
                            mask="url(#tube-mask)"
                        />

                        <!-- Secteurs -->
                        <g>
                            <path
                                v-for="(sector, index) in sectors"
                                :key="index"
                                :d="getSectorPath(sector.startAngle, sector.endAngle)"
                                :fill="sector.color"
                                :fill-opacity="isActiveSector(sector) ? 1.0 : 0.75"
                                :class="{ 'transition-opacity duration-300': true }"
                            />
                        </g>

                        <!-- Tube externe -->
                        <circle
                            cx="100"
                            cy="100"
                            :r="outerRadius"
                            stroke="black"
                            stroke-width="0.5"
                            fill="none"
                        />
                        <!-- Tube interne -->
                        <circle
                            cx="100"
                            cy="100"
                            :r="innerRadius"
                            stroke="black"
                            stroke-width="0.5"
                            fill="none"
                        />
                        <!-- Électrode -->
                        <circle
                            :cx="electrodePosition.x"
                            :cy="electrodePosition.y"
                            r="5"
                            fill="red"
                        />
                        <g
                            :transform="`translate(${electrodePosition.x}, ${electrodePosition.y}) rotate(${angleElectrode + 90})`"
                        >
                            <image
                                width="20"
                                height="50"
                                x="-10"
                                y="-25"
                                href="@/assets/electrode.svg"
                            />
                        </g>

                        <!-- Animation de l'arc électrique -->
                        <g
                            :transform="`translate(${arcPosition.x}, ${arcPosition.y}) rotate(${angleElectrode + 90})`"
                            class="arc-animation"
                        >
                            <circle
                                v-for="(spark, index) in sparks"
                                :key="index"
                                :cx="spark.x"
                                :cy="spark.y"
                                :r="spark.size"
                                :style="{ animationDelay: spark.delay }"
                                class="spark"
                            />
                        </g>
                    </svg>
                </div>
                <!-- Contrôles -->
                <div class="flex flex-col items-center gap-2 p-2">
                    <label for="angle" class="text-sm">Angle (en degrés) :</label>
                    <input
                        id="angle"
                        type="number"
                        v-model.number="angle"
                        min="0"
                        class="border border-gray-300 rounded px-2 py-1"
                    />
                    <label>Angle Electrode (en degrés) : {{ angleElectrode }}</label>
                </div>
            </div>
            <!-- Liste des secteurs -->
            <div class="w-72 h-full flex flex-col gap-2 p-4 border rounded-lg overflow-y-auto">
                <div
                    v-for="(sector, index) in sectors"
                    :key="index"
                    class="flex items-center gap-4 p-2 border rounded-lg transition-all duration-300"
                    :class="[
                        isActiveSector(sector)
                            ? 'border-blue-500 bg-grey-500 shadow-md'
                            : 'border-none bg-transparent',
                    ]"
                >
                    <div
                        class="w-5 h-5 rounded border border-gray-300 flex-shrink-0"
                        :style="{ backgroundColor: sector.color }"
                    ></div>
                    <div class="text-sm text-text-light dark:text-text-dark">
                        début : {{ sector.startAngle }}°, fin : {{ sector.endAngle }}°
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Rayons des cercles (en pixels)
const outerRadius = 80
const innerRadius = 50

// Angle de l'électrode (en degrés)
const angle = ref(0)

// Liste des secteurs (angles en degrés)
const sectors = ref([
    { startAngle: 0, endAngle: 60, color: 'blue' },
    { startAngle: 60, endAngle: 180, color: 'green' },
    { startAngle: 180, endAngle: 300, color: 'yellow' },
    { startAngle: 300, endAngle: 360, color: 'red' },
])

// Calcul des coordonnées de l'électrode
const electrodePosition = computed(() => {
    const radians = ((angle.value - 90) * Math.PI) / 180
    const x = 100 + outerRadius * Math.cos(radians)
    const y = 100 + outerRadius * Math.sin(radians)
    return { x, y }
})

// Calculer l'angle en degrés
const angleElectrode = computed(() => {
    const centerX = 100
    const centerY = 100
    const dx = electrodePosition.value.x - centerX
    const dy = electrodePosition.value.y - centerY
    return (Math.atan2(dy, dx) * 180) / Math.PI // Convertir radians -> degrés
})

// Calculer la position de l'extrémité de l'électrode
const arcPosition = computed(() => {
    const radians = ((angle.value - 90) * Math.PI) / 180
    const x = 100 + 25 * Math.cos(radians) //25 : rayon arbitraire de rotation
    const y = 100 + 25 * Math.sin(radians)
    return { x, y }
})

// Configuration des particules lumineuses
const sparks = Array.from({ length: 5 }, () => ({
    x: Math.random() * 6 - 3, // Position X aléatoire autour de l'extrémité
    y: Math.random() * 6 - 30, // Position Y légèrement en dessous de l'électrode
    size: Math.random(), // Taille aléatoire
    delay: `${Math.random() * 0.5}s`, // Délai aléatoire pour l'animation
}))

// Normalise un angle entre 0 et 360 degrés
const normalizeAngle = (angle: number): number => {
    let normalized = angle % 360
    if (normalized < 0) normalized += 360
    return normalized
}

// Vérifie si l'angle est dans un secteur donné
const isActiveSector = (sector: { startAngle: number; endAngle: number }): boolean => {
    const normalizedAngle = normalizeAngle(angle.value)
    const start = normalizeAngle(sector.startAngle)
    const end = normalizeAngle(sector.endAngle)

    if (start < end) {
        return normalizedAngle >= start && normalizedAngle < end
    } else {
        // Gère le cas où le secteur traverse 0°
        return normalizedAngle >= start || normalizedAngle < end
    }
}

function getSectorPath(startAngle: number, endAngle: number): string {
    const centerX = 100
    const centerY = 100
    const startOuter = polarToCartesian(centerX, centerY, outerRadius, startAngle)
    const x1Outer = startOuter.x
    const y1Outer = startOuter.y

    const endOuter = polarToCartesian(centerX, centerY, outerRadius, endAngle)
    const x2Outer = endOuter.x
    const y2Outer = endOuter.y

    const startInner = polarToCartesian(centerX, centerY, innerRadius, startAngle)
    const x1Inner = startInner.x
    const y1Inner = startInner.y

    const endInner = polarToCartesian(centerX, centerY, innerRadius, endAngle)
    const x2Inner = endInner.x
    const y2Inner = endInner.y

    return `
M ${x1Outer} ${y1Outer}
A ${outerRadius} ${outerRadius} 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${x2Outer} ${y2Outer}
L ${x2Inner} ${y2Inner}
A ${innerRadius} ${innerRadius} 0 ${endAngle - startAngle > 180 ? 1 : 0} 0 ${x1Inner} ${y1Inner}
Z
`
}

const polarToCartesian = (cx: number, cy: number, radius: number, angle: number) => {
    const radians = (Math.PI / 180) * (angle - 90)
    return {
        x: cx + radius * Math.cos(radians),
        y: cy + radius * Math.sin(radians),
    }
}
</script>

<style scoped>
/* Styles pour l'animation de l'arc électrique */
.arc-animation .spark {
    fill: #ffea00; /* Couleur bleu électrique */
    opacity: 0; /* Invisible par défaut */
    animation: spark-animation 0.3s infinite ease-in-out;
}

/* Définir l'animation des éclairs */
@keyframes spark-animation {
    0% {
        opacity: 0;
        transform: scale(0.5);
    }
    50% {
        opacity: 1;
        transform: scale(1.2);
    }
    100% {
        opacity: 0;
        transform: scale(0.5);
    }
}
</style>
