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
import { BASE_FACTOR } from 'fpi-tg-factor-tools'
import dayjs from 'dayjs'
import BasicEcharts from '../common/BasicEcharts'
import BasicNoData from '../common/BasicNoData'
import { getCieqRate } from './api'
import type { GetCieqRateParams } from './api'

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 查询参数
    apiParams?: GetCieqRateParams
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
const clsfix = 'dv-aims-mul-grid-cieq-contribution-month-ratio'

/**
 * 图表相关
 */
const chartsFullOptions = ref<any>({ options: null })
const generateOption = (xData: any[], series: any[]) => {
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
                    const cieq = params[0] ? params[0].data.cieq : ''
                    const strArr = params.map((item: any) => {
                        return `<div>
                            ${item.marker}
                            <span style="display: inline-block;width: 60px;">${item.seriesName}</span>
                            <span style="display: inline-block;text-align: right;width: 30px;margin-right:10px;">${Number.isNaN(Number(item.data.value)) ? '--' : `${item.data.value}`}</span>
                            <span style="display: inline-block;text-align: right;width: 40px;">${typeof item.data.rate === 'number' ? `${item.data.rate}%` : '--%'}</span>
                        </div>`
                    })
                    const str = strArr.join('')
                    return `<div>
                        <div>${title}</div>
                        <div><span style="display: inline-block;width: 60px;">综合指数</span><span>${cieq}</span></div>
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
                },
                data: xData,
            },
            yAxis: {
                type: 'value',
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
                itemGap: 10,
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
    ]
    getCieqRate(props.apiParams).then((res) => {
        if (res.data && res.data.length) {
            const data = res.data
            const xData = data.map(c => c.name)
            const list = BASE_FACTOR.filter(item => item.code !== 'aqi').map((item, index) => {
                const values = data.map((c) => {
                    const obj = c.icieqs.find(o => o.factorName === item.name)
                    return {
                        ...obj,
                        cieq: c.cieq
                    }
                })
                return {
                    name: item.name,
                    type: 'bar',
                    stack: 'x',
                    data: values,
                    color: colors[index],
                    barWidth: 15,
                }
            })
            chartsFullOptions.value = generateOption(xData, list)
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
