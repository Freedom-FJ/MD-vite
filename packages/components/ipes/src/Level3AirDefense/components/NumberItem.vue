<template>
    <div class="dv-ipes-number-wrap">
        <span v-for="(name, key) in data" :key="key" :style="{ color: colors[key] }">{{ name }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
const props = defineProps({
    value: {
        default: () => {},
        type: Object,
    },
})
// 数字颜色不同
const colors: any = reactive({
    normal: '#0EED95',
    abnormal: '#FF553C',
    offline: '#8FAFC7',
})
const data = computed(() => {
    const obj: any = {}
    const valueArr = ['normal', 'abnormal', 'offline']
    valueArr.forEach((ele) => {
        if (props.value[ele])
            obj[ele] = props.value[ele]
    })
    return obj
})
</script>

<style lang="scss" scoped>
@import "../style/NumberItem";
</style>
