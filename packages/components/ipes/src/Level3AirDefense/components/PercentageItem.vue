<template>
    <div class="dv-ipes-percentage-wrap dv-ipes-flex-bw-c">
        <div v-for="(name, value) in data" :key="value" class="dv-ipes-percentage-item" :style="{ backgroundColor: colors[value], width: `${name}%` }" />
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
    if (JSON.stringify(obj) !== '{}') {
        const totalValue: any = Object.values(obj).reduce(
            (total, value) => Number(total) + Number(value)
        )
        if (totalValue) {
            for (const item in obj) {
                if (obj.item !== '0')
                    obj[item] = ((obj[item] / totalValue) * 100).toFixed(2)
            }
        }
    }
    return obj
})
</script>

<style lang="scss" scoped>
@import "../style/percentageItem";
</style>
