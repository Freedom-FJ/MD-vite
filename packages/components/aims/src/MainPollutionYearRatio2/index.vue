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
const clsfix = 'dv-aims-main-pollution-year-ratio2'

/**
 * 图表相关
 */
const chartsFullOptions = ref<any>({ options: null })
const generateOption = (list: any[]) => {
    return {
        options: {
            tooltip: {
                trigger: 'item',
                padding: 8,
                background: 'rgba(1, 11, 18, 0.6)',
                formatter: (params: any) => {
                    const { marker, name, value, data } = params
                    return `
                        <div>总天数 ${data.total}</div>
                        <div>${marker} ${name}  ${value}天 ${data.rate}%</div>
                    `
                },
            },
            legend: {
                top: 'center',
                left: '50%',
                itemHeight: 10,
                itemWidth: 10,
                itemGap: 10,
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
                        formatter: '{name|首污分布}',
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
        if (res.data?.primaryPollutant?.primaryYearSum) {
            const data = res.data.primaryPollutant.primaryYearSum
            const rawList = BASE_FACTOR.filter(item => item.code !== 'aqi')
            rawList.push({
                name: '无首污',
                key: 'noMainPollutant',
                code: 'noMainPollutant',
                unit: '',
                key3: '',
            })
            const renderData = rawList.map((item: any, index: number) => {
                const value = data[item.key as keyof typeof data]
                const rate = ((value / data.total) * 100).toFixed(1)
                return {
                    name: item.name,
                    value,
                    rate,
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
