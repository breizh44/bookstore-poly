<template>
    <div class="sidebar">
        <div v-for="item in menuItems" :key="item.label" class="menu-item">
            <img :src="item.icon" class="icon" />
            <span>{{ item.label }}</span>
        </div>
        <button class="add-button">+</button>
    </div>
</template>

<script setup lang="ts">
const menuItems = [
    { label: 'Gaz', icon: new URL('@/assets/icons/gas.svg', import.meta.url).href },
    { label: 'Courant', icon: new URL('@/assets/icons/current.svg', import.meta.url).href },
    { label: 'Fil', icon: new URL('@/assets/icons/wire.svg', import.meta.url).href },
    { label: 'Rotation', icon: new URL('@/assets/icons/rotation.svg', import.meta.url).href },
]
</script>

<style scoped>
.sidebar {
    width: 80px;
    background: #003b80;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.menu-item {
    text-align: center;
    margin: 20px 0;
}
.icon {
    width: 30px;
}
.add-button {
    margin-top: auto;
    margin-bottom: 20px;
    background: white;
    color: #003b80;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
}
</style>
