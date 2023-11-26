<template>
    <div :class="`${clsfix}-container`">
        <div :class="`${clsfix}-echarts`">
            <BasicEcharts v-if="Boolean(chartsFullOptions.options)" height="100%" :full-options="chartsFullOptions" :loading="false" />
            <BasicNoData v-else />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { FACTOR_LEVEL_TEXT } from 'fpi-tg-factor-tools'
import dayjs from 'dayjs'
import BasicEcharts from '../common/BasicEcharts'
import BasicNoData from '../common/BasicNoData'
import { getMulAirLevelRate } from './api'
import type { GetMulAirLevelRateParams } from './api'

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 查询参数
    apiParams?: GetMulAirLevelRateParams
}>(), {
    apiParams: () => ({
        time: dayjs().subtract(1, 'h').valueOf(),
        gridCode: '0100000000',
        timeType: 'year'
    }),
})
/**
 * 定义 emits
 */
// defineEmits({})

/**
 * className 前缀
 */
const clsfix = 'dv-aims-mul-grid-air-quality-level-month-ratio'

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
                    const strArr = params.map((item: any) => {
                        return `<div>
                            ${item.marker}
                            <span style="display: inline-block;width: 60px;">${item.seriesName}</span>
                            <span style="display: inline-block;text-align: right;width: 40px;margin-right:10px;">${Number.isNaN(Number(item.data.day)) ? '--天' : `${item.data.day}天`}</span>
                            <span style="display: inline-block;text-align: right;width: 40px;">${typeof item.data.value === 'number' ? `${item.data.value}%` : '--%'}</span>
                        </div>`
                    })
                    const str = strArr.join('')
                    const data = params[0] ? params[0].data : {}
                    const str2 = `
                        <div style="border-top: 1px solid #f2f2f2;margin-top: 12px;padding-top: 12px;padding-left: 20px;">
                            <span style="display: inline-block;width: 60px;">优良率</span>
                            <span style="display: inline-block;text-align: right;width: 40px;margin-right:10px;">${Number.isNaN(Number(data.fineCount)) ? '--天' : `${data.fineCount}天`}</span>
                            <span style="display: inline-block;text-align: right;width: 40px;">${Number.isNaN(Number(data.fineRate)) ? '--%' : `${data.fineRate}%`}</span>
                        </div>
                        <div style="padding-left: 20px;">
                            <span style="display: inline-block;width: 60px;">超标率</span>
                            <span style="display: inline-block;text-align: right;width: 40px;margin-right:10px;">${Number.isNaN(Number(data.opCount)) ? '--天' : `${data.opCount}天`}</span>
                            <span style="display: inline-block;text-align: right;width: 40px;">${Number.isNaN(Number(data.opRate)) ? '--%' : `${data.opRate}%`}</span>
                        </div>
                        <div style="padding-left: 20px;">
                            <span style="display: inline-block;width: 60px;">优良率</span>
                            <span style="display: inline-block;text-align: right;width: 40px;margin-right:10px;">${Number.isNaN(Number(data.heavyPollutionCount)) ? '--天' : `${data.heavyPollutionCount}天`}</span>
                        </div>
                    `
                    return `<div>
                        <div>${title}</div>
                        ${str}
                        ${str2}
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
        value: [],
    },
    {
        name: '良',
        value: [],
    },
    {
        name: '轻度污染',
        value: [],
    },
    {
        name: '中度污染',
        value: [],
    },
    {
        name: '重度污染',
        value: [],
    },
    {
        name: '严重污染',
        value: [],
    }
]
const fetchData = () => {
    getMulAirLevelRate(props.apiParams).then((res) => {
        if (res.data && res.data.length) {
            const data = res.data
            const xData = data.map(c => c.name)
            const newList = list.map((c, index) => {
                const values = data.map((item) => {
                    return {
                        ...item,
                        value1: item.levelRates[index],
                        value2: item.levelCounts[index],
                    }
                })
                const obj = FACTOR_LEVEL_TEXT.find(i => c.name.includes(i.label))
                return {
                    name: c.name,
                    data: values.map((c) => {
                        return {
                            value: c.value1,
                            day: c.value2,
                            ...c,
                        }
                    }),
                    type: 'bar',
                    stack: 'x',
                    color: obj ? obj.color : noDataColor,
                    barWidth: 15,
                }
            })
            chartsFullOptions.value = generateOption(xData, newList)
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
