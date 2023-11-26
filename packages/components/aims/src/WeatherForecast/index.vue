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
import { getWeatherForecasList } from './api'
import type { GetWeatherForecasListParams, ListItemProps } from './api'

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 是否使用内置api
    isUseBuiltInApi?: boolean
    // 查询参数
    apiParams?: GetWeatherForecasListParams
    // 外部数据
    data?: ListItemProps[]
}>(), {
    isUseBuiltInApi: true,
    apiParams: () => ({
        gridCode: '0101000000',
        startTime: dayjs().valueOf(),
        endTime: dayjs().add(6, 'day').valueOf(),
        modeId: 5
    })
})
/**
 * 定义 emits
 */
// defineEmits({})

/**
 * className 前缀
 */
const clsfix = 'dv-aims-weather-forecast'

/**
 * 图表相关
 */
const chartsFullOptions = ref<{ options: any }>({ options: null })

const windData = [
    {
        name: '北风',
        vuale: [0, 11.25]
    },
    {
        name: '北风',
        vuale: [348.76, 360]
    },
    {
        name: '东北风',
        vuale: [11.26, 33.75]
    },
    {
        name: '东北风',
        vuale: [33.76, 56.25]
    },
    {
        name: '东北风',
        vuale: [56.26, 78.75]
    },
    {
        name: '东风',
        vuale: [78.76, 101.25]
    },
    {
        name: '东南风',
        vuale: [101.26, 123.75]
    },
    {
        name: '东南风',
        vuale: [123.76, 146.25]
    },
    {
        name: '东南风',
        vuale: [146.26, 168.75]
    },
    {
        name: '南风',
        vuale: [168.76, 191.25]
    },

    {
        name: '西南风',
        vuale: [191.26, 213.75]
    },
    {
        name: '西南风',
        vuale: [213.76, 236.25]
    },
    {
        name: '西南风',
        vuale: [236.26, 258.75]
    },
    {
        name: '西风',
        vuale: [258.76, 281.25]
    },
    {
        name: '西北风',
        vuale: [281.26, 303.75]
    },
    {
        name: '西北风',
        vuale: [303.76, 336.25]
    },
    {
        name: '西北风',
        vuale: [336.26, 348.75]
    },
]

const findWind = (num: number) => {
    const obj = windData.find(_ => num >= _.vuale[0] && num <= _.vuale[1])
    return obj ? obj.name : ''
}

const disposeData = (list: ListItemProps[]) => {
    const xData1: any = []
    const xData2: any = []
    const minTemp: any[] = []
    const maxTemp: any[] = []
    const rains: any[] = []
    list.forEach((item) => {
        minTemp.push(item.minTemp)
        maxTemp.push(item.maxTemp)
        rains.push(item.prcp)
        xData1.push(typeof item.windDirection === 'number' ? findWind(item.windDirection) : '')
        xData2.push(dayjs(item.forecastTime).format('M-DD'))
    })
    chartsFullOptions.value.options = {
        grid: {
            left: 6,
            bottom: 0,
            right: 6,
            top: 46,
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            padding: 8,
            background: 'rgba(1, 11, 18, 0.6)',
            formatter: (params: any) => {
                const title1 = params[0] ? params[0].name : ''
                const title2 = params[2] ? params[2].name : ''
                const itemArr = params.map((item: any) => {
                    const unit = item.seriesType === 'bar' ? 'mm' : '℃'
                    return `<div>${item.marker}<span style='margin-right: 20px;'>${item.seriesName}</span><span>${item.value}${unit}</span></div>`
                })
                return `<div>
                    <div>${title2} ${title1}</div>
                    ${itemArr.join('')}
                </div>`
            }
        },
        legend: {
            show: true,
            top: 0,
            itemGap: 6,
            textStyle: {
                color: 'var(--dv-color-text-primary)',
                fontSize: 12,
            },
            itemWidth: 20,
            itemHeight: 8,
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: 'var(--dv-color-text-primary)',
                    fontSize: 'var(--dv-text-body2)',
                    interval: 0,
                },
                data: xData1,
            },
            {
                type: 'category',
                position: 'bottom',
                offset: 18,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: 'var(--dv-color-text-primary)',
                    fontSize: 'var(--dv-text-body2)',
                    fontFamily: 'var(--dv-font-family-number)',
                },
                data: xData2,
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '℃',
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
                    fontSize: 'var(--dv-text-number2)',
                    fontFamily: 'var(--dv-font-family-number)',
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
                name: 'mm',
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
                    color: 'var(--dv-color-text-secondary)',
                    fontSize: 'var(--dv-text-number2)',
                    fontFamily: 'var(--dv-font-family-number)',
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['rgba(255, 255, 255, 0)']
                    }
                },
            },
        ],
        series: [
            {
                type: 'line',
                name: '最高温',
                color: '#F84439',
                data: maxTemp,
                yAxisIndex: 0,
                xAxisIndex: 1,
                label: {
                    show: true,
                    position: 'top',
                    color: '#F84439',
                    fontSize: 'var(--dv-text-number2)',
                    fontFamily: 'var(--dv-font-family-number)',
                    formatter: '{c}°'
                }
            },
            {
                type: 'line',
                name: '最低温',
                data: minTemp,
                color: '#E9BB1D',
                yAxisIndex: 0,
                xAxisIndex: 1,
                label: {
                    show: true,
                    position: 'bottom',
                    color: '#E9BB1D',
                    fontSize: 'var(--dv-text-number2)',
                    fontFamily: 'var(--dv-font-family-number)',
                    formatter: '{c}°'
                }
            },
            {
                type: 'bar',
                barWidth: 15,
                color: '#0062FF',
                name: '降雨量',
                data: rains,
                yAxisIndex: 1,
                xAxisIndex: 0
            },
        ],
    }
}
const fetchData = () => {
    getWeatherForecasList(props.apiParams).then((res) => {
        if (res.data)
            disposeData(res.data)
    })
}
onMounted(() => {
    fetchData()
})
watch(() => props.apiParams, () => {
    fetchData()
}, {
    deep: true
})
watch(() => props.data, () => {
    if (props.data && !props.isUseBuiltInApi)
        disposeData(props.data)
}, { deep: true, immediate: true })
</script>

<style lang="scss">
@import "./style/index";
</style>
