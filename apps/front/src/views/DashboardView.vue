<template>
    <div class="dashboard">
        <SidebarMenu />
        <div class="main-content">
            <SectorSelector />
            <div class="graph-section">
                <ParameterGraph v-for="(graph, index) in graphs" :key="index" />
            </div>
            <button class="delta-button">Définir les deltas</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue'
import SectorSelector from './SectorSelector.vue'
import ParameterGraph from './ParameterGraph.vue'

const graphs = Array(6).fill(null)
</script>

<style scoped>
.dashboard {
    display: flex;
    height: 100vh;
}
.main-content {
    flex-grow: 1;
    padding: 20px;
    background: #f5f7fa;
}
.graph-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-top: 20px;
}
.delta-button {
    margin-top: 20px;
    padding: 10px;
    background: white;
    border: 1px solid black;
    border-radius: 8px;
}
</style>
