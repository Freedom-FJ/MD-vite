<template>
    <div class="dv-ipes-empty-data">
        <img :src="emptyPNG">
        <p class="dv-ipes-text">
            {{ emptyText }}
        </p>
    </div>
</template>

<script setup lang="ts">
import emptyPNG from '../images/empty.png'
defineProps({
    emptyText: {
        type: String,
        default: '',
    },
})
</script>

<style lang="scss" scoped>
@import "../style/EmptyData";
</style>
