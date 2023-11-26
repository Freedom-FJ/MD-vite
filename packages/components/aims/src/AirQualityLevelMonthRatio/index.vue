<template>
    <div :class="`${clsfix}-container`">
        <div :class="`${clsfix}-echarts`">
            <BasicEcharts v-if="Boolean(chartsFullOptions.options)" height="100%" :full-options="chartsFullOptions" :loading="false" />
            <BasicNoData v-else />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FACTOR_LEVEL_TEXT } from 'fpi-tg-factor-tools'
import dayjs from 'dayjs'
import BasicEcharts from '../common/BasicEcharts'
import BasicNoData from '../common/BasicNoData'
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
const generateOption = (xData: string[], series: any[]) => {
    return {
        options: {
            grid: {
                left: 10,
                bottom: 30,
                right: 10,
                top: 30,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                padding: 8,
                background: 'rgba(1, 11, 18, 0.6)',
                formatter: (params: any) => {
                    const title = params[0] ? params[0].name : ''
                    const total = params[0] ? params[0].data.total : ''
                    const strArr = params.map((item: any) => {
                        return `<div>
                            ${item.marker}
                            <span style="display: inline-block;width: 60px;">${item.seriesName}</span>
                            <span style="display: inline-block;text-align: right;width: 30px;margin-right:10px;">${Number.isNaN(Number(item.data.value2)) ? '--' : `${item.data.value2}天`}</span>
                            <span style="display: inline-block;text-align: right;width: 40px;">${typeof item.data.value === 'number' ? `${item.data.value}%` : '--%'}</span>
                        </div>`
                    })
                    const str = strArr.join('')
                    return `<div>
                        <div>${title}</div>
                        <div><span style="display: inline-block;width: 50px;">总天数</span><span>${total}</span></div>
                        ${str}
                    </div>`
                },
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: 'var(--dv-color-text-primary)',
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: 'var(--dv-text-number2)',
                    interval: 0,
                    formatter: (value: string) => value.substr(5)
                },
                data: xData,
            },
            yAxis: {
                type: 'value',
                name: '%',
                nameTextStyle: {
                    color: 'var(--dv-color-text-secondary)',
                    padding: [0, 30, 0, 0]
                },
                splitNumber: 3,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: 'var(--dv-color-text-secondary)',
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: 'var(--dv-text-number2)',
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['var(--dv-color-border-light)']
                    }
                },
            },
            legend: {
                show: true,
                bottom: 0,
                itemGap: 4,
                textStyle: {
                    color: 'var(--dv-color-text-primary)',
                    fontSize: 12,
                },
                itemWidth: 12,
                itemHeight: 12,
                icon: 'circle',
                itemStyle: {
                    borderWidth: 0,
                },
            },
            series,
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
            const data1 = res.data.airQualityLevel.levelMonthSumRate
            const data2 = res.data.airQualityLevel.levelMonthSum
            const xData = data2.times
            const tatol = data2.total
            chartsFullOptions.value = generateOption(xData, list.map((item) => {
                const obj = FACTOR_LEVEL_TEXT.find(c => item.name.includes(c.label))
                const value1 = data1[item.key as keyof typeof data1]
                const value2 = data2[item.key as keyof typeof data2]
                return {
                    name: item.name,
                    type: 'bar',
                    stack: 'x',
                    data: value1.map((item, index) => {
                        return {
                            value: item,
                            value2: value2[index],
                            total: tatol[index]
                        }
                    }),
                    color: obj ? obj.color : noDataColor,
                    barWidth: 15,
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
