<template>
    <ul :class="`${clsfix}-list-wrap`">
        <li v-for="item in showList" :key="item.name" :class="`${clsfix}-list-item`">
            <div class="progress-box">
                <span class="name">{{ item.name }}</span>
                <span class="bar">
                    <span v-show="item.showBar" class="progress-bar" :style="{ width: `${item.progress}%`, background: item.bgColor }" />
                </span>
            </div>
            <span class="value" :style="{ color: item.color }">{{ item.progress }}%</span>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { onMounted, shallowRef, watch } from 'vue'
import { BASE_FACTOR } from 'fpi-tg-factor-tools'
import dayjs from 'dayjs'
import { getHexOpacityColor } from '../../utils/tools'
import { getAirQualityStatis } from './api'
import type { GetAirQualityStatisParams } from './api'
/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 查询参数
    apiParams?: GetAirQualityStatisParams
}>(), {
    apiParams: () => ({
        time: dayjs().subtract(1, 'h').valueOf(),
        code: '0101000000',
        codeType: 'grid'
    })
})
/**
 * 定义 emits
 */
// defineEmits({})

/**
 * className 前缀
 */
const clsfix = 'dv-aims-main-pollution-year-ratio-list'

const showList = shallowRef<any[]>([])

const fetchData = () => {
    const colors = [
        '#0062FF',
        '#0AAEFF',
        '#2AC94F',
        '#FF792E',
        '#F84439',
        '#FFB443',
        'rgb(154, 154, 154)'
    ]
    getAirQualityStatis(props.apiParams).then((res) => {
        if (res.data && res.data.primaryPollutant.primaryYearSum) {
            const data = res.data.primaryPollutant.primaryYearSum
            const rawList = BASE_FACTOR.filter(item => item.code !== 'aqi')
            rawList.push({
                name: '无首污',
                key: 'noMainPollutant',
                code: 'noMainPollutant',
                unit: '',
                key3: '',
            })
            const renderData = rawList.map((item, index) => {
                const v = data[item.key as keyof typeof data]
                const rate = ((v / data.total) * 100).toFixed(1)
                const color = colors[index]
                return {
                    name: item.name,
                    progress: rate,
                    color,
                    bgColor: `linear-gradient(270deg, ${color} 0%, ${getHexOpacityColor(color, 0.2)} 100%)`,
                    showBar: Number(rate) > 0
                }
            })
            showList.value = renderData
        }
    })
}
onMounted(() => {
    fetchData()
})
watch(() => props.apiParams, () => {
    fetchData()
})
</script>

<style lang="scss">
@import "./style/index";
</style>
