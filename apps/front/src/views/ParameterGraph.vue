<template>
    <div class="graph-container">
        <canvas ref="canvas"></canvas>
        <div v-for="label in labels" :key="label.text" class="graph-label" :style="label.style">
            {{ label.text }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
const labels = ref([
    { text: '15 L/min', style: 'top: 10px; left: 50%;' },
    { text: '10s', style: 'bottom: 5px; left: 25%;' },
])

onMounted(() => {
    if (canvas.value) {
        const ctx = canvas.value.getContext('2d')
        if (ctx) {
            ctx.beginPath()
            ctx.moveTo(10, 50)
            ctx.lineTo(50, 50)
            ctx.lineTo(50, 20)
            ctx.lineTo(100, 20)
            ctx.stroke()
        }
    }
})
</script>

<style scoped>
.graph-container {
    position: relative;
    width: 200px;
    height: 100px;
    border: 1px solid #ccc;
}
.graph-label {
    position: absolute;
    background: #003b80;
    color: white;
    padding: 2px 5px;
    border-radius: 5px;
    font-size: 12px;
}
</style>
