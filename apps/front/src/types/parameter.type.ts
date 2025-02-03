// types.ts
interface Sector {
    id: number
    range: string
}

interface Indicator {
    value: string
    type?: 'flow' | 'time' | 'amperage'
}

interface ParameterType {
    name: string
    icon: string
}

// Définition explicite des types de paramètres disponibles
const parameterTypes = {
    gas: { name: 'Gaz', icon: 'fas fa-gas-pump' },
    current: { name: 'Courant', icon: 'fas fa-arrow-down' },
    wire: { name: 'Fil', icon: 'fas fa-circle-notch' },
    rotation: { name: 'Rotation', icon: 'fas fa-sync' },
} as const

// Type dérivé de parameterTypes
type ParameterTypeKey = keyof typeof parameterTypes

interface SectorParameters {
    [key: number]: Indicator[]
}

interface Parameter {
    id: number
    type: ParameterTypeKey // Utilisation du type dérivé
    sectors: SectorParameters
}

// Export des types et de la constante
export type { Sector, Indicator, ParameterType, ParameterTypeKey, SectorParameters, Parameter }

export { parameterTypes }
