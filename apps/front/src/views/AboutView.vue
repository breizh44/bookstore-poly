<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>

    <fwb-dropdown text="Click me" placement="top">
        <fwb-list-group>
            <fwb-list-group-item>Item #1</fwb-list-group-item>
            <fwb-list-group-item>Item #2</fwb-list-group-item>
            <fwb-list-group-item>Item #3</fwb-list-group-item>
        </fwb-list-group>
    </fwb-dropdown>
</template>

<script setup lang="ts">
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
</script>
