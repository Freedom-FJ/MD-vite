<!--   藻类研判分析：要素趋势对比  -->
<template>
    <div class="dv-wgms-factor-trend-comparison">
        <div id="chart" ref="chartRef" class="chart">
            <BaseECharts :options="option" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, toRefs, watch } from 'vue'
import BaseECharts from '../../utils/echarts/BaseECharts.vue'
import { getTrendComparisonData } from './api'

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
        type: Number,
        required: false // 1663257600000
    },
    endTime: {
        type: Number,
        required: false // 1663257600000
    },
    data: {
        type: Object,
        required: false
    },
})
const option = ref<any>(undefined)
const state = {
    factorMap: [] as Record<string, any>[],
    seriesData: [] as Record<string, any>[],
    chartRef: null, // 图表实例
}

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
        initChart(!!props.data)
    })
}, { immediate: true })

/**
 * 获取因子图表数据
 */
const getChartData = async () => {
    const params = {
        timeType: props.timeType,
        siteCode: props.siteCode,
        stationCode: props.stationCode,
        endTime: props.endTime,
        startTime: props.startTime,
        dataType: props.type === 'automatic' ? 0 : 1, // 数据类型 自动/手工(0/1)
    }
    return await getTrendComparisonData(params)
}

/**
 * 初始化图标
 */
const initChart = async (flag: boolean) => {
    let xData = [] as string[]
    let data: any[] = []
    if (!flag) {
        const res = await getChartData()
        data = res?.data || []
    }
    else {
        data = (props.data || []) as any[]
    }

    data.forEach((item: {
        factorTimeDataList: any
        factorName: string
        factorCode: string
    }) => {
        const timesList = item.factorTimeDataList.map((item: { time: any }) => item.time)
        const valueList = item.factorTimeDataList.map((item: { value: any }) => item.value)
        xData = timesList.map((item: string) => item)
        const obj = {
            name: item.factorName,
            type: 'line',
            symbolSize: 0,
            yAxisIndex: item.factorCode === 'w01016' ? 1 : item.factorCode === 'w01010' ? 2 : 0,
            data: valueList.map((item: { value: any }) => item ?? null)
        }
        state.seriesData.push(obj)
    })
    await nextTick(async () => {
        // 绘制
        option.value = getChartOptions(xData, state.seriesData)
    })
}

/**
 * 要素趋势对比
 * @param xData
 * @param seriesData
 * @returns
 */
const getChartOptions = (xData: string[], seriesData: Record<string, any>[]) => {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            show: true,
            type: 'scroll',
            itemWidth: 12,
            itemHeight: 12,
            icon: 'circle',
            bottom: 10,
            textStyle: {
                color: 'var(--dv-color-text-primary)',
                fontSize: 'var(--dv-text-body2)'
            }
        },
        grid: {
            top: 60,
            left: '15%',
            right: 35,
            bottom: 40,
            containLabel: true
        },
        color: ['#2AC94F', '#FFE200', '#FF99C3', '#00FFFD', '#ff99c3', '#00fffd', '#ff7815', '#ef33ff'],
        xAxis: [
            {
                type: 'category',
                data: xData,
                boundaryGap: false,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'var(--dv-color-fill-lighter)'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 'var(--dv-text-number2)',
                        fontFamily: 'var(--dv-font-family-number)',
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
                name: '因子值\n(mg/l)',
                nameTextStyle: {
                    color: 'var(--dv-color-text-secondary)',
                    fontSize: 'var(--dv-text-body2)',
                    align: 'center',
                    padding: [0, 0, 0, 0]
                },
                type: 'value',
                offset: 60,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: 'var(--dv-color-text-secondary)',
                        fontSize: 'var(--dv-text-number2)',
                        fontFamily: 'var(--dv-font-family-number)',
                        align: 'center',
                        padding: [0, 0, 0, 5]
                    }
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
                axisPointer: {
                    snap: true
                }
            },
            {
                name: '叶绿素a\n(μg/l)',
                nameTextStyle: {
                    align: 'center',
                    color: 'var(--dv-color-text-secondary)',
                    fontSize: 'var(--dv-text-body2)',
                    padding: [0, 0, 0, 0]
                },
                type: 'value',
                position: 'left',
                offset: 10,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: 'var(--dv-color-text-secondary)',
                        fontSize: 'var(--dv-text-number2)',
                        fontFamily: 'var(--dv-font-family-number)',
                        align: 'center'
                    },
                    padding: [0, 0, 0, 0]
                },
                splitLine: { show: false },
                axisTick: { show: false },
                axisPointer: {
                    snap: true
                }
            },
            {
                name: '水温\n(℃)',
                nameTextStyle: {
                    align: 'center',
                    color: 'var(--dv-color-text-secondary)',
                    fontSize: 'var(--dv-text-body2)',
                    padding: [0, 0, 0, 20]
                },
                type: 'value',
                position: 'right',
                offset: 10,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: 'var(--dv-color-text-secondary)',
                        fontSize: 'var(--dv-text-number2)',
                        fontFamily: 'var(--dv-font-family-number)',
                        align: 'center'
                    },
                    padding: [0, 0, 0, 20]
                },
                splitLine: { show: false },
                axisTick: { show: false },
                axisPointer: {
                    snap: true
                }
            }
        ],
        series: seriesData
    }
}
</script>

<style scoped lang="scss">
@import "../../styles/mixins";
@import "./style/index";
</style>
