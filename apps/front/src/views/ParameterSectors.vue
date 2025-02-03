<!-- ParameterSectors.vue -->
<template>
    <div class="p-4">
        <div class="border rounded shadow">
            <div class="overflow-x-auto">
                <div class="flex" style="min-width: max-content">
                    <!-- Colonne des types de paramétrage -->
                    <div class="w-24 shrink-0">
                        <div></div>
                        <!-- Espace vide pour l'alignement -->
                        <div
                            v-for="param in parameters"
                            :key="param.id"
                            class="h-32 border-r bg-blue-800 text-white p-4"
                        >
                            <div class="flex flex-col items-center">
                                <div class="mb-2">
                                    <i :class="getParameterIcon(param.type)"></i>
                                </div>
                                <span class="text-sm">{{ getParameterName(param.type) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Colonnes des secteurs et paramètres -->
                    <div class="flex">
                        <!-- En-tête des secteurs -->
                        <div
                            v-for="sector in sectors"
                            :key="sector.id"
                            class="w-[400px] h-32 p-4 shrink-0"
                        >
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-chart-pie"></i>
                                    <span>Secteur {{ sector.id }}</span>
                                </div>
                                <div class="bg-blue-800 text-white px-2 py-1 rounded text-sm">
                                    {{ sector.range }}
                                </div>
                            </div>
                        </div>

                        <!-- Contenus des paramètres -->
                        <div v-for="param in parameters" :key="param.id" class="contents">
                            <div
                                v-for="sector in sectors"
                                :key="`${param.id}-${sector.id}`"
                                class="w-[400px] h-32 p-4 border-b shrink-0"
                            >
                                <div class="relative h-20">
                                    <div class="absolute inset-0 flex items-center">
                                        <div class="w-full h-px bg-gray-300"></div>
                                    </div>
                                    <div
                                        class="absolute inset-0 flex items-center justify-center gap-2"
                                    >
                                        <template
                                            v-if="getParameterIndicators(param.id, sector.id)"
                                        >
                                            <span
                                                v-for="indicator in getParameterIndicators(
                                                    param.id,
                                                    sector.id,
                                                )"
                                                :key="indicator.value"
                                                class="bg-blue-800 text-white px-2 py-1 rounded text-sm"
                                            >
                                                {{ indicator.value }}
                                            </span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Boutons d'action -->
            <div class="border-t p-4 flex gap-4">
                <button
                    @click="addParameter"
                    class="w-24 h-12 bg-blue-800 text-white rounded hover:bg-blue-700 flex items-center justify-center"
                >
                    <span class="text-2xl">+</span>
                </button>
                <button
                    class="ml-auto bg-white border border-gray-300 rounded px-4 py-2 hover:bg-gray-50"
                >
                    Définir les deltas
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Sector, Parameter, Indicator, ParameterTypeKey } from '@/types/parameter.type'
import { parameterTypes } from '@/types/parameter.type'

const sectors = ref<Sector[]>([
    { id: 1, range: '0° à 45°' },
    { id: 2, range: '45° à 90°' },
    { id: 3, range: '90° à 135°' },
    { id: 4, range: '135° à 180°' },
    { id: 5, range: '180° à 225°' },
    { id: 6, range: '225° à 270°' },
])

const parameters = ref<Parameter[]>([
    {
        id: 1,
        type: 'gas',
        sectors: {
            1: [{ value: '15 L/min', type: 'flow' }],
        },
    },
    {
        id: 2,
        type: 'current',
        sectors: {
            1: [{ value: '15 L/min', type: 'flow' }],
            2: [{ value: '15 L/min', type: 'flow' }],
            3: [{ value: '15 L/min', type: 'flow' }],
        },
    },
    {
        id: 3,
        type: 'wire',
        sectors: {
            1: [
                { value: '45 A', type: 'amperage' },
                { value: '10s', type: 'time' },
                { value: '15 L/min', type: 'flow' },
            ],
        },
    },
])

const getParameterName = (type: ParameterTypeKey): string => {
    return parameterTypes[type].name
}

const getParameterIcon = (type: ParameterTypeKey): string => {
    return parameterTypes[type].icon
}

const getParameterIndicators = (paramId: number, sectorId: number): Indicator[] | null => {
    const param = parameters.value.find((p) => p.id === paramId)
    return param?.sectors[sectorId] || null
}

const addParameter = (): void => {
    const nextId = Math.max(...parameters.value.map((p) => p.id)) + 1
    const newParameter: Parameter = {
        id: nextId,
        type: 'gas',
        sectors: {},
    }
    parameters.value.push(newParameter)
}
</script>
