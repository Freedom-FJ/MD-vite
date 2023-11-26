<template>
    <div :class="`${clsfix}-container`">
        <div :class="`${clsfix}-echarts`">
            <BasicEcharts
                v-if="Boolean(chartsFullOptions.options)" height="100%" :full-options="chartsFullOptions"
                :loading="false"
            />
            <BasicNoData v-else />
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useThemeHook } from '../../../utils'
import BasicEcharts from '../common/BasicEcharts'
import BasicNoData from '../common/BasicNoData/index'
import type { GetWindRoseDataParams } from './api'
import { getWindRoseData } from './api'

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 是否使用内置api
    isUseBuiltInApi?: boolean
    // 查询参数
    apiParams?: GetWindRoseDataParams
    // 外部数据
    data?: any[]
}>(), {
    isUseBuiltInApi: true,
    apiParams: () => ({
        code: '0101000000',
        type: 'grid',
        startTime: dayjs().subtract(3, 'year').startOf('year').valueOf(),
        endTime: dayjs().subtract(1, 'year').endOf('year').valueOf(),
        timeType: 'year',
        timeValue: 'year',
        dataType: 'allDay',
        factorCode: 'a34004', // 默认pm2.5
    }),
})
const { isDark } = useThemeHook()
/**
 * 静态常量定义
 */
const clsfix = 'dv-aims-meteorological-analysis'
const chartsFullOptions = ref<any>({ options: null })
const zeroLevelNum = ref<any>()

const fetchData = () => {
    getWindRoseData(props.apiParams).then((res) => {
        if (res.data && res.data.length > 0)
            getRoseChartOption(res.data)
    })
}
// 处理数据
const getRoseChartOption = (data: any[]) => {
    chartsFullOptions.value.options = {
        polar: {
            center: ['38%', '50%'],
            radius: '75%'
        },
        grid: {
            left: 10,
            bottom: 10,
            right: 10,
            top: 10,
            containLabel: true
        },
        legend: {
            icon: 'circle',
            data: [
                '0级',
                '1级',
                '2级',
                '3级',
                '4级',
                '5级',
                '6级',
                '>6级'
            ],
            orient: 'vertical',
            align: 'left',
            top: 'middle',
            right: 41,
            itemGap: 9,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: 'var(--dv-color-text-primary)',
                fontSize: 'var(--dv-text-number2)',
                fontFamily: 'var(--dv-font-family-number)',
            }
        },
        color: ['#0062FF', '#0AAEFF', '#34EAE3', '#2AC94F', '#FFB443', '#FF792E', '#F84439', '#C32136'],
        angleAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['北', '东北', '东', '东南', '南', '西南', '西', '西北'],
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'var(--dv-color-border-light)',
                    width: 1
                }
            },
            axisLabel: {
                color: 'var(--dv-color-text-primary)',
                fontSize: 12
            },
            axisLine: {
                show: false,
                // lineStyle: {
                //     color: 'var(--dv-color-border-light)',
                //     width: 1
                // }
            },
            axisTick: {
                show: false
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['transparent', 'var(--dv-color-fill-lighter)'],
                },
            }
        },
        radiusAxis: {
            minInterval: 0.25,
            nameGap: 25,
            axisLabel: {
                show: false,
                formatter(value: any) {
                    return `${value * 100}%`
                },
                color: '#303133'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: (params: any) => {
                if (params.seriesName === '0级')
                    return `0级风 ${(zeroLevelNum.value * 100).toFixed(1)}%`
                const arr = ['北风', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风']
                const level = params.name / 45
                return `${arr[params.dataIndex]} ${(params.value * 100).toFixed(1)}%`
            },
        },
        series: [
            // 0级产品要求跟整体概况风向玫瑰图一样处理
            {
                type: 'bar',
                data: [0, 0, 0, 0, 0, 0, 0, 0],
                stack: 'a',
                name: '0级',
                symbolSize: 12,
                coordinateSystem: 'polar',
                // itemStyle: {
                //     color: 'transparent',
                //     borderColor: '',
                //     borderWidth: 1
                // }
            },
            {
                type: 'bar',
                data: [],
                coordinateSystem: 'polar',
                name: '1级',
                stack: 'a'
            },
            {
                type: 'bar',
                data: [],
                coordinateSystem: 'polar',
                name: '2级',
                stack: 'a'
            },
            {
                type: 'bar',
                data: [],
                coordinateSystem: 'polar',
                name: '3级',
                stack: 'a'
            },
            {
                type: 'bar',
                data: [],
                coordinateSystem: 'polar',
                name: '4级',
                stack: 'a'
            },
            {
                type: 'bar',
                data: [],
                coordinateSystem: 'polar',
                name: '5级',
                stack: 'a'
            },
            {
                type: 'bar',
                data: [],
                coordinateSystem: 'polar',
                name: '6级',
                stack: 'a'
            },
            {
                type: 'bar',
                data: [],
                coordinateSystem: 'polar',
                name: '>6级',
                stack: 'a'
            }
        ]
    }
    for (let i = 0; i < data.length; i++) {
        const element = data[i]
        if (i === 0)
            zeroLevelNum.value = element[0]

        chartsFullOptions.value.options.series[i].data = element
    }
}
onMounted(() => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch([() => props.apiParams], () => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch(() => props.data, () => {
    if (!props.isUseBuiltInApi && props.data) {
        if (props.data && props.data.length > 0)
            getRoseChartOption(props.data)
    }
}, {
    deep: false,
    immediate: true
})
</script>

<style lang="scss">
@import "./style/index";
</style>
