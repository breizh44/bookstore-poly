<template>
    <div class="welding-visualization">
        <div class="main-content">
            <div class="left-column">
                <div class="svg-container">
                    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
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
                                fill-opacity="0.5"
                            />
                        </g>

                        <!-- Tube externe -->
                        <circle
                            cx="100"
                            cy="100"
                            :r="outerRadius"
                            stroke="black"
                            stroke-width="1"
                            fill="none"
                        />
                        <!-- Tube interne -->
                        <circle
                            cx="100"
                            cy="100"
                            :r="innerRadius"
                            stroke="black"
                            stroke-width="1"
                            fill="none"
                        />
                        <!-- Électrode -->
                        <circle
                            :cx="electrodePosition.x"
                            :cy="electrodePosition.y"
                            r="5"
                            fill="red"
                        />
                    </svg>
                </div>
                <div class="controls">
                    <label for="angle">Angle (en degrés) :</label>
                    <input id="angle" type="number" v-model.number="angle" min="0" />
                </div>
            </div>
            <div class="sectors-list">
                <label>Secteurs :</label>
                <div class="sector-item" v-for="(sector, index) in sectors" :key="index">
                    <div class="sector-color" :style="{ backgroundColor: sector.color }"></div>
                    <div class="sector-info">
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
.welding-visualization {
    width: 100%;
    height: calc(100vh - 90px); /* Hauteur totale moins la hauteur de l'en-tête */
    padding: 1rem;
    box-sizing: border-box;
}

.main-content {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
}

.left-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    min-width: 0;
}

.svg-container {
    width: 100%;
    height: 0;
    padding-bottom: min(
        100%,
        calc(100vh - 200px)
    ); /* Le plus petit entre un carré et la hauteur disponible */
    position: relative;
    flex-shrink: 0;
}

.svg-container svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    background-color: transparent;
}

.controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
}

.sectors-list {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    background-color: transparent;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow-y: auto; /* Permet le défilement si la liste est trop longue */
}

.sector-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    background-color: transparent;
}

.sector-color {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid #ddd;
    flex-shrink: 0;
}

.sector-info {
    font-size: 0.9rem;
}

/* Style responsive */
@media (max-width: 768px) {
    .welding-visualization {
        height: auto;
        min-height: calc(100vh - 90px);
    }

    .main-content {
        flex-direction: column;
        height: auto;
    }

    .sectors-list {
        width: 100%;
        max-height: 300px;
    }

    .svg-container {
        padding-bottom: 100%; /* Retour à un carré en mode mobile */
    }
}
</style>
