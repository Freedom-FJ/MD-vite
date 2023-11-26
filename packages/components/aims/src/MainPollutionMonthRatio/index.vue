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
                    const totalArr = params.filter((item: any) => Number(item.value) > 0).map((item: any) => item.value)
                    const total = totalArr.reduce((a: number, b: number) => a + b, 0)
                    const strArr = params.map((item: any) => {
                        const rate = Number(item.value) > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0'
                        return `<div>
                            ${item.marker}
                            <span style="display: inline-block;width: 40px;">${item.seriesName}</span>
                            <span style="display: inline-block;text-align: right;width: 40px;">${typeof item.value === 'number' ? `${item.value}天` : '--天'}</span>
                            <span style="display: inline-block;text-align: right;width: 50px;">${rate}%</span>
                        </div>`
                    })
                    const str = strArr.join('')
                    return `<div>
                        <div>${title}</div>
                        <div><span style="display: inline-block;width: 80px;">统计总天数</span><span>${total}</span></div>
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
                    fontSize: 'var(--dv-text-number2)',
                    fontFamily: 'var(--dv-font-family-number)',
                    interval: 0,
                    formatter: (value: string) => value.substr(5)
                },
                data: xData,
            },
            yAxis: {
                type: 'value',
                name: '天',
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
                    fontSize: 'var(--dv-text-number2)',
                    fontFamily: 'var(--dv-font-family-number)'
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
        if (res.data && res.data.primaryPollutant.primaryMonthSum) {
            const data = res.data.primaryPollutant.primaryMonthSum
            const xData: string[] = data.times
            const rawList = BASE_FACTOR.filter(item => item.code !== 'aqi')
            rawList.push({
                name: '无首污',
                key: 'noMainPollutant',
                code: 'noMainPollutant',
                unit: '',
                key3: '',
            })
            const series = rawList.map((item, index) => {
                const values = data[item.key as keyof typeof data]
                return {
                    name: item.name,
                    type: 'bar',
                    stack: 'x',
                    data: values,
                    color: colors[index],
                    barWidth: 15,
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
