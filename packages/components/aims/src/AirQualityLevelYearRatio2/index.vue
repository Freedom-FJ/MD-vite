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
const clsfix = 'dv-aims-air-quality-level-year-ratio2'

/**
 * 图表相关
 */
const chartsFullOptions = ref<any>({ options: null })
const generateOption = (list: any[], total: any) => {
    return {
        options: {
            tooltip: {
                trigger: 'item',
                padding: 8,
                background: 'rgba(1, 11, 18, 0.6)',
                formatter: (params: any) => {
                    const { marker, name, value, data } = params
                    return `
                        <div>总天数 ${total}</div>
                        <div>${marker} ${name}  ${value}天 ${data.rate}%</div>
                    `
                },
            },
            legend: {
                top: 'center',
                left: '50%',
                itemHeight: 10,
                itemWidth: 10,
                itemGap: 12,
                orient: 'vertical',
                icon: 'circle',
                textStyle: {
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: 'var(--dv-text-number1)',
                    color: 'var(--dv-color-text-primary)',
                    rich: {
                        name: {
                            fontSize: 'var(--dv-text-body1)',
                            color: 'var(--dv-color-text-primary)',
                            align: 'left',
                            width: 80,
                            // padding: [0, 30, 0, -5],
                        },
                        value: {
                            fontFamily: 'var(--dv-font-family-number)',
                            fontSize: 'var(--dv-text-number1)',
                            color: 'var(--dv-color-index)',
                            width: 36,
                            align: 'right',
                        },
                        split: {
                            fontFamily: 'var(--dv-font-family-number)',
                            fontSize: 'var(--dv-text-number1)',
                            color: 'var(--dv-color-text-secondary)',
                        },
                    },
                },
                formatter: (f_name: string) => {
                    const { name, value, rate } = list.find((item: any) => item.name === f_name)
                    return `{name| ${name}}{value|${value}天}{split|/}${rate}%`
                },
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['55%', '80%'],
                    center: ['25%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: 'center',
                        formatter: '{name|等级占比}',
                        rich: {
                            name: {
                                fontSize: 'var(--dv-text-headline1)',
                                fontWeight: 500,
                                color: 'var(--dv-color-text-primary)',
                            },
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: list
                },
            ],
        }
    }
}
const listConfig = [
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
        if (res?.data?.airQualityLevel) {
            const values: any = res.data.airQualityLevel.levelYearSum
            const rates: any = res.data.airQualityLevel.levelYearSumRate
            const total = values.total
            const renderData = listConfig.map(item => ({
                name: item.name,
                value: values[item.key],
                rate: rates[item.key],
                itemStyle: {
                    color: FACTOR_LEVEL_TEXT.find(c => item.name.includes(c.label))?.color
                }
            }))
            chartsFullOptions.value = generateOption(renderData, total)
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
