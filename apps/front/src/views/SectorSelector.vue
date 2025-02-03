<template>
    <div class="sector-selector">
        <button v-for="sector in sectors" :key="sector.name" class="sector-btn">
            <img src="@/assets/icons/sector.svg" class="sector-icon" />
            {{ sector.name }}
            <span class="angle">{{ sector.angle }}</span>
        </button>
    </div>
</template>

<script setup lang="ts">
const sectors = [
    { name: 'Secteur 1', angle: '0° à 45°' },
    { name: 'Secteur 2', angle: '0° à 45°' },
    { name: 'Secteur 3', angle: '0° à 45°' },
]
</script>

<style scoped>
.sector-selector {
    display: flex;
    gap: 10px;
}
.sector-btn {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    background: #eaeff6;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
.sector-icon {
    width: 20px;
    margin-right: 5px;
}
.angle {
    margin-left: auto;
    font-weight: bold;
}
</style>
