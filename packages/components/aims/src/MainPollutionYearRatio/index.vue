<template>
    <div :class="`${clsfix}-container`">
        <div :class="`${clsfix}-echarts`">
            <BasicEcharts height="100%" :full-options="chartsFullOptions" :loading="false" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { BASE_FACTOR } from 'fpi-tg-factor-tools'
import dayjs from 'dayjs'
import BasicEcharts from '../common/BasicEcharts'
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
const clsfix = 'dv-aims-main-pollution-year-ratio'

/**
 * 图表相关
 */
const chartsFullOptions = ref<any>({ options: null })
const generateOption = (list: any[]) => {
    return {
        options: {
            legend: {
                show: true,
                bottom: -4,
                itemGap: 4,
                textStyle: {
                    color: 'var(--dv-color-text-primary)',
                    fontSize: 12,
                },
                icon: 'circle',
                itemWidth: 12,
                itemHeight: 12,
            },
            tooltip: {
                trigger: 'item',
                padding: 8,
                background: 'rgba(1, 11, 18, 0.6)',
                formatter: (params: any) => {
                    const data = params
                    return `
                        <div>总天数 ${data.data.total}</div>
                        <div>${data.marker} ${data.name}  ${data.data.num}天 ${data.value}%</div>
                    `
                },
            },
            series: [
                {
                    type: 'pie',
                    radius: '60%',
                    center: ['50%', '44%'],
                    data: list,
                    label: {
                        position: 'outer',
                        color: 'var(--dv-color-text-primary)',
                        overflow: 'none',
                        formatter: (params: any) => {
                            const { name, value, num } = params.data
                            return `${name}  ${num}天  ${value}%`
                        },
                        fontSize: 'var(--dv-text-number1)',
                        fontFamily: 'var(--dv-font-family-number)',
                    },
                },
            ],
        },
    }
}

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
                return {
                    name: item.name,
                    value: rate,
                    num: v,
                    total: data.total,
                    itemStyle: {
                        color: colors[index]
                    }
                }
            })
            chartsFullOptions.value = generateOption(renderData)
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
