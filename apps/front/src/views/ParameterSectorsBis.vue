<!-- ParameterSectors.vue -->
<template>
    <div class="p-4">
        <div class="border rounded shadow">
            <!-- En-tête des secteurs -->
            <div class="flex overflow-x-auto pb-4">
                <!-- Espace vide pour l'alignement avec la colonne des types -->
                <div class="w-24 shrink-0"></div>

                <!-- Secteurs -->
                <div class="flex gap-4 min-w-max">
                    <div v-for="sector in sectors" :key="sector.id" class="w-[400px] flex-shrink-0">
                        <div class="flex items-center justify-center gap-2 bg-gray-500 text-black">
                            <div class="flex items-center gap-2">
                                <i class="fas fa-chart-pie"></i>
                                <span>Secteur {{ sector.id }}</span>
                            </div>
                            <div class="bg-blue-800 text-white px-2 py-1 rounded text-sm">
                                {{ sector.range }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tableau principal -->
            <div class="relative">
                <!-- Colonne des types fixée -->
                <div
                    class="absolute left-0 top-[10px] w-24 bg-blue-800 border-r overflow-hidden"
                    style="height: calc(100% - 10px)"
                >
                    <table class="w-full">
                        <tbody>
                            <tr v-for="param in parameters" :key="param.id">
                                <td class="p-4 border-b">
                                    <div class="flex flex-col items-center">
                                        <div class="mb-2">
                                            <i :class="getParameterIcon(param.type)"></i>
                                        </div>
                                        <span class="text-sm">{{
                                            getParameterName(param.type)
                                        }}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Corps du tableau scrollable -->
                <div class="ml-[104px] overflow-x-auto">
                    <table>
                        <tbody>
                            <tr v-for="param in parameters" :key="param.id">
                                <td
                                    v-for="sector in sectors"
                                    :key="sector.id"
                                    class="w-[400px] flex-shrink-0 border-b relative group"
                                >
                                    <div class="relative h-20">
                                        <!-- Contenu des cellules reste identique -->
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
                                                    class="bg-blue-800 text-white px-2 py-1 rounded text-sm cursor-pointer hover:bg-blue-700 transition-colors"
                                                >
                                                    {{ indicator.value }}
                                                </span>
                                            </template>

                                            <button
                                                v-if="
                                                    !getParameterIndicators(param.id, sector.id)
                                                        ?.length
                                                "
                                                @click="addIndicator(param.id, sector.id)"
                                                class="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700 transition-opacity"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
    { id: 2, range: '45° à 135°' },
    { id: 3, range: '135° à 225°' },
    { id: 4, range: '225° à 300°' },
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
])

const selectedParameterType = ref<ParameterTypeKey | ''>('')

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
    if (!selectedParameterType.value) return

    const nextId = Math.max(...parameters.value.map((p) => p.id)) + 1
    const newParameter: Parameter = {
        id: nextId,
        type: selectedParameterType.value,
        sectors: {},
    }

    parameters.value.push(newParameter)
    selectedParameterType.value = ''
}

const addIndicator = (paramId: number, sectorId: number): void => {
    const paramIndex = parameters.value.findIndex((p) => p.id === paramId)
    if (paramIndex === -1) return

    if (!parameters.value[paramIndex].sectors[sectorId]) {
        parameters.value[paramIndex].sectors[sectorId] = []
    }

    parameters.value[paramIndex].sectors[sectorId]?.push({
        value: '',
        type: 'flow', // Type par défaut
    })
}

const editIndicator = (paramId: number, sectorId: number, indicator: Indicator): void => {
    // À implémenter selon vos besoins
    console.log("Édition de l'indicateur:", paramId, sectorId, indicator)
}
</script>
