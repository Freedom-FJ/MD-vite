<template>
    <div :class="`${clsfix}-container`">
        <div :class="`${clsfix}-echarts`">
            <BasicEcharts height="100%" :full-options="chartsFullOptions" :loading="false" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import BasicEcharts from '../common/BasicEcharts'
import { getTimeAnalyzeData } from './api'
import type { GetTimeAnalyzeDataParams } from './api'

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 查询参数
    apiParams?: GetTimeAnalyzeDataParams
}>(), {
    apiParams: () => ({
        dataType: 'day',
        startTime: dayjs().subtract(6, 'd').valueOf(),
        endTime: dayjs().valueOf(),
        factorCodes: 'aqi,a34004,a34002,a21026,a21004,a05024,a21005',
        codeType: 'grid',
        codes: '0101000000',
    })
})
/**
 * 定义 emits
 */
// defineEmits({})

/**
 * className 前缀
 */
const clsfix = 'dv-aims-air-time-series-analysis'

/**
 * 图表相关
 */
const chartsFullOptions = ref<any>({ options: null })
const generateOption = (xData: string[], series: any[]) => {
    return {
        options: {
            grid: {
                left: 20,
                bottom: 10,
                right: 20,
                top: 60,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                padding: 8,
                background: 'rgba(1, 11, 18, 0.6)',
                formatter: (params: any) => {
                    const title = params[0] ? params[0].name : ''
                    const optionSeries = chartsFullOptions.value.options.series
                    const strArr = params.map((item: any) => {
                        const symbol = optionSeries[item.seriesIndex].symbol
                        let markerHtml = `<span class="${clsfix}-circle" style="background-color:${item.color};"></span>`
                        if (symbol === 'rect')
                            markerHtml = `<span class="${clsfix}-rect" style="background-color:${item.color};"></span>`
                        else if (symbol === 'triangle')
                            markerHtml = `<span class="${clsfix}-triangle" style="border-bottom:10px solid ${item.color};"></span>`
                        else if (symbol === 'diamond')
                            markerHtml = `<span class="${clsfix}-diamond" style="border-color:${item.color};"></span>`
                        else if (symbol === 'roundRect')
                            markerHtml = `<span class="${clsfix}-roundRect" style="background-color:${item.color};"></span>`
                        return `<div>
                            ${markerHtml}
                            <span style="display: inline-block;width: 40px;">${item.seriesName}</span>
                            <span style="display: inline-block;text-align: right;width: 40px;">${Number(item.value) > 0 ? `${item.value}` : '--'}</span>
                            ${item.data.unit && item.data.unit !== '--' ? `<span style="display: inline-block;text-align: right;width: 50px;">${item.data.unit}</span>` : ''}
                        </div>`
                    })
                    const str = strArr.join('')
                    return `<div>
                        <div>${title}</div>
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
                    formatter: (value: string) => formatterTime(value)
                },
                data: xData,
            },
            yAxis: [
                {
                    type: 'value',
                    name: 'μg/m³',
                    nameTextStyle: {
                        color: 'var(--dv-color-text-secondary)',
                        padding: [0, 30, 0, 0]
                    },
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
                    splitNumber: 3,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['var(--dv-color-border-light)']
                        }
                    },
                },
                {
                    type: 'value',
                    name: 'mg/m³',
                    nameTextStyle: {
                        color: 'var(--dv-color-text-secondary)',
                        padding: [0, 0, 0, 30]
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
                        color: 'var(--dv-color-text-secondary)'
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['rgba(255, 255, 255, 0)']
                        }
                    },
                },
            ],
            legend: {
                show: true,
                top: 0,
                itemGap: 3,
                textStyle: {
                    color: 'var(--dv-color-text-primary)',
                    fontSize: 12,
                },
                itemWidth: 16,
                itemHeight: 8,
            },
            series,
        },
    }
}
const formatterTime = (value: string) => {
    switch (props.apiParams.dataType) {
    case 'year':
        return value
    case 'month':
        return value
    case 'day':
        return dayjs(value).format('MM-DD')
    case 'hour':
        return dayjs(value).format('HH')
    default:
        return ''
    }
}
const fetchData = () => {
    const colors = [
        '#ec7eff',
        '#0062FF',
        '#0AAEFF',
        '#2AC94F',
        '#FF792E',
        '#F84439',
        '#FFB443',
    ]
    const symbols = [
        'circle',
        'circle',
        'circle',
        'rect',
        'triangle',
        'diamond',
        'roundRect'
    ]
    getTimeAnalyzeData(props.apiParams).then((res) => {
        if (res.data && res.data) {
            const data = res.data
            const xData: string[] = data.times
            const series = data.factorsOrSites.map((item, index) => {
                return {
                    name: item.name,
                    type: 'line',
                    data: item.values.map((c) => {
                        return {
                            value: c,
                            unit: item.unit
                        }
                    }),
                    color: colors[index],
                    symbol: symbols[index],
                    symbolSize: 8,
                    yAxisIndex: item.key === 'CO' ? 1 : 0
                }
            })
            chartsFullOptions.value = generateOption(xData, series)
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
