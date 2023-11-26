<!--   藻类研判分析 氮磷比趋势变化 -->
<template>
    <div class="dv-wgms-n-p-trend-change">
        <div id="chart" ref="chartRef" class="chart">
            <BaseECharts :options="option" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, toRefs, watch } from 'vue'
import echarts from '../../utils/echarts'
import BaseECharts from '../../utils/echarts/BaseECharts.vue'
import { getNPTrendChange } from './api'

const props = defineProps({
    type: {
        default: 'automatic', // 默认自动数据 manual（手工数据）
        type: String
    },
    // 时间类型
    timeType: {
        type: String,
        required: false // day
    },
    siteCode: {
        type: String,
        required: false // zaoleishougong
    },
    stationCode: {
        type: String,
        required: false, // w01016
    },
    startTime: {
        type: [String, Number],
        required: false // 1663257600000
    },
    endTime: {
        type: [String, Number],
        required: false // 1663257600000
    },
    data: {
        type: Object,
        required: false
    },
})

const state = {
    chartRef: null, // 图表实例
}
const option = ref<any>(undefined)
const { chartRef } = toRefs(state)
/**
 * 监听传参变化 重新渲染
 */
watch([
    () => props.type,
    () => props.timeType,
    () => props.siteCode,
    () => props.stationCode,
    () => props.startTime,
    () => props.endTime,
    () => props.data,
], async () => {
    // 如果传入数据 不需要请求数据
    await nextTick(() => {
        initChart(!props.data)
    })
}, { immediate: true })

/**
 * 获取因子图表数据
 */
async function initChart(flag = true) {
    const params = {
        // startTime: props.startTime,
        // endTime: props.endTime,
        // siteCode: props.siteCode,
        // timeType: props.type === 'manual' ? 'day' : '',
        timeType: props.timeType,
        siteCode: props.siteCode,
        stationCode: props.stationCode,
        endTime: props.endTime,
        startTime: props.startTime,
        dataType: props.type === 'automatic' ? 0 : 1, // 数据类型 自动/手工(0/1)
    }
    let data
    if (flag) {
        const res = await getNPTrendChange(params)
        data = res?.data
    }
    else {
        data = props.data
    }

    const timeList = data?.map((item: { time: any }) => item.time) ?? []
    const preList = data?.map((item: { percent: any }) => item.percent) ?? []
    const xData = timeList.map((item: string) => item && item)
    const NPList = preList.map((item: number) => item && item * 100)
    option.value = getChartOptions(xData, NPList, echarts)
}

/**
 * 氮磷比趋势变化
 * @param xData
 * @param data
 * @param echarts
 * @returns
 */
const getChartOptions = (xData: string[], data: number[], echarts: any) => {
    return {
        title: {
            show: true,
            text: 'N/P（100%）',
            textAlign: 'left',
            left: 10,
            top: 14,
            textStyle: {
                color: 'var(--dv-color-text-secondary)',
                fontSize: 'var(--dv-text-number2)',
                fontFamily: 'var(--dv-font-family-number)',
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: 50,
            left: 10,
            right: '1%',
            bottom: 10,
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xData,
                axisLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        fontFamily: 'var(--dv-font-family-number)',
                        fontSize: 'var(--dv-text-number2)',
                        color: 'var(--dv-color-text-primary)'
                    }
                },
                axisTick: {
                    show: false,
                    interval: 24
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                axisLabel: {
                    textStyle: {
                        fontFamily: 'var(--dv-font-family-number)',
                        fontSize: 'var(--dv-text-number2)',
                        color: 'var(--dv-color-text-secondary)'
                    },
                },
                axisLine: {
                    show: false,
                },
                splitArea: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'var(--dv-color-fill-lighter)'
                    }
                },
                axisTick: { show: false },
            },
        ],
        series: [
            {
                name: '氮磷比趋势变化',
                type: 'line',
                symbolSize: 0,
                smooth: true,
                lineStyle: {
                    color: 'var(--dv-color-index)',
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'var(--dv-color-index)' },
                            { offset: 1, color: 'rgba(71,229,229,0.06)' }
                        ]),
                    }
                },
                data
            }
        ]
    }
}
</script>

<style scoped lang="scss">
@import "../../styles/mixins";
@import "./style/index";
</style>
