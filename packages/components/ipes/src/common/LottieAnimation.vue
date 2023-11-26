<!--
 * @Author: mjh
 * @Date: 2023-07-18 18:45:29
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-26 09:48:30
 * @Description:
-->
<template>
    <div ref="canvasRef" class="dv-ipes-canvas" :style="{ width, height }" />
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from 'vue'
const props = withDefaults(defineProps<{
    width?: number | string
    height?: number | string
    url?: string
}>(), {
    width: 100,
    height: 100,
    url: ''
})
const canvasRef = ref()
const width = computed(() => {
    return typeof props.width === 'number' ? `${props.width}px` : props.width.toString()
})
const height = computed(() => {
    return typeof props.height === 'number' ? `${props.height}px` : props.height.toString()
})
onMounted(() => {
    nextTick(() => {
        (window as any).lottie?.loadAnimation({
            container: canvasRef.value,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: props.url
        })
    })
})
</script>
