<template>
    <div :class="`${clsfix}-container`">
        <div :class="`${clsfix}-echarts`">
            <BasicEcharts height="100%" :full-options="chartsFullOptions" :loading="false" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { FACTOR_LEVEL_TEXT } from 'fpi-tg-factor-tools'
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
const clsfix = 'dv-aims-cieq-contributio-ratio'

/**
 * 图表相关
 */
const noDataColor = 'var(--dv-color-text-secondary)'
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
                    return `${params.marker} ${params.name}  ${params.data.value2}天 ${params.value}%`
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
                            const { name, value, value2 } = params.data
                            return `${name}  ${value2}天  ${value}%`
                        },
                        fontSize: 'var(--dv-text-number1)',
                        fontFamily: 'var(--dv-font-family-number)',
                    },
                },
            ],
        },
    }
}
const list = [
    {
        name: '优',
        key: 'veryGood',
        value: 0,
    },
    {
        name: '良',
        key: 'good',
        value: 0,
    },
    {
        name: '轻度污染',
        key: 'mild',
        value: 0,
    },
    {
        name: '中度污染',
        key: 'medium',
        value: 0,
    },
    {
        name: '重度污染',
        key: 'serious',
        value: 0,
    },
    {
        name: '严重污染',
        key: 'verySerious',
        value: 0,
    }
]
const fetchData = () => {
    getAirQualityStatis(props.apiParams).then((res) => {
        if (res.data && res.data.airQualityLevel) {
            const data1 = res.data.airQualityLevel.levelYearSumRate
            const data2 = res.data.airQualityLevel.levelYearSum
            chartsFullOptions.value = generateOption(list.map((item) => {
                const obj = FACTOR_LEVEL_TEXT.find(c => item.name.includes(c.label))
                const value = data1[item.key as keyof typeof data1]
                const value2 = data2[item.key as keyof typeof data2]
                return {
                    ...item,
                    value,
                    value2,
                    itemStyle: {
                        color: obj ? obj.color : noDataColor
                    }
                }
            }))
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
