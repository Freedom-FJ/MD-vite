<template>
    <div :class="`${clsfix}-container`">
        <div :class="`${clsfix}-echarts`" style="height: calc(100% - 27px);">
            <BasicEcharts v-if="Boolean(chartsFullOptions.options)" height="100%" :full-options="chartsFullOptions" :loading="false" />
            <BasicNoData v-else />
        </div>
        <ul :class="`${clsfix}-lengend`">
            <li v-for="item in lengendOptions" :key="item.color">
                <span class="border" :style="{ backgroundColor: item.color }" />
                <span class="text">{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import dayjs from 'dayjs'
import { BASE_FACTOR, FACTOR_LEVEL_TEXT, factorToColor } from 'fpi-tg-factor-tools'
import BasicEcharts from '../common/BasicEcharts'
import BasicNoData from '../common/BasicNoData'
import { getTimeAnalyzeData } from './api'
import type { ApiParamsProps, OuterDataItemProps } from './type/index'

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 是否使用内置api
    isUseBuiltInApi?: boolean
    // 查询参数
    apiParams?: ApiParamsProps
    // 时间类型
    dataType?: 'hour' | 'day'
    // 因子类型
    factorCode?: 'aqi' | 'a34004' | 'a34002' | 'a21026' | 'a21004' | 'a05024' | 'a21005'
    // 内置接口不符合需求时，用外部数据进行覆盖
    data?: OuterDataItemProps[]
}>(), {
    isUseBuiltInApi: true,
    apiParams: () => ({
        startTime: dayjs().subtract(24, 'hour').valueOf(),
        endTime: dayjs().subtract(1, 'hour').valueOf(),
        codeType: 'grid',
        codes: '0101000000', // 只允许传一个code
    }),
    dataType: 'hour',
    factorCode: 'aqi'
})
const timeFormat = computed(() => {
    switch (props.dataType) {
    case 'hour':
        return 'HH:mm'
    case 'day':
        return 'DD'
    default:
        return 'YYYY-MM-DD HH:mm'
    }
})

/**
 * 定义 emits
 */
// defineEmits({})

/**
 * 静态常量定义
 */
const clsfix = 'dv-aims-env-change-trends'
const selectName = computed(() => {
    return BASE_FACTOR.find(c => c.code === props.factorCode)?.name
})
const lengendOptions = FACTOR_LEVEL_TEXT.map((item) => {
    return {
        name: item.label.length > 1 ? `${item.label}污染` : item.label,
        color: item.color
    }
})

/**
 * 图表数据
 */
const chartsFullOptions = reactive<{
    options: any
}>({ options: null })
const generateOption = (xAxisData: string[], seriesData: any[]) => {
    return {
        options: {
            grid: {
                left: 10,
                bottom: 0,
                right: 10,
                top: 10,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                padding: 8,
                background: 'rgba(1, 11, 18, 0.6)',
                formatter: (params: any) => {
                    const data = params[0] ? params[0] : {}
                    const title = selectName.value
                    const time = data.data.rawTime
                    const marker = data.marker
                    const value = data.data.value
                    return `
                    <div>${time}</div>
                    <div>
                        <span>${marker}</span>
                        <span style="margin-right: 10px">${title}</span>
                        <span>${value}</span>
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
                data: xAxisData
            },
            yAxis: {
                type: 'value',
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
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['var(--dv-color-border-light)']
                    }
                },
            },
            legend: {
                show: false,
            },
            series: [
                {
                    data: seriesData,
                    type: 'bar',
                    barWidth: 10,
                }
            ]
        },
    }
}
const fetchData = () => {
    getTimeAnalyzeData({
        ...props.apiParams,
        factorCodes: props.factorCode,
        dataType: props.dataType
    }).then((res) => {
        if (res.data) {
            const xAxisData = res.data.times.map(c => dayjs(c).format(timeFormat.value))
            const seriesData = res.data.factorsOrSites[0]
                ? res.data.factorsOrSites[0].values.map((c, index) => {
                    return {
                        value: Number(c) > 0 ? Number(c) : '--',
                        itemStyle: {
                            color: Number(c) > 0 ? factorToColor(props.factorCode, c, props.dataType) : 'rgb(154, 154, 154)'
                        },
                        rawTime: res.data?.times[index]
                    }
                })
                : []
            const options = generateOption(xAxisData, seriesData)
            Object.assign(chartsFullOptions, options)
        }
    })
}

onMounted(() => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch(() => props.apiParams, () => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch(() => props.data, () => {
    if (!props.isUseBuiltInApi && props.data) {
        const xAxisData: string[] = []
        const seriesData: any[] = []
        props.data.forEach((c) => {
            xAxisData.push(dayjs(c.time).format(timeFormat.value))
            seriesData.push({
                value: Number(c.value) > 0 ? Number(c.value) : '--',
                itemStyle: {
                    color: Number(c.value) > 0 ? factorToColor(props.factorCode, c.value, props.dataType) : 'rgb(154, 154, 154)'
                },
                rawTime: c.time
            })
        })
        const options = generateOption(xAxisData, seriesData)
        Object.assign(chartsFullOptions, options)
    }
})
</script>

<style lang="scss">
@import "./style/index";
</style>
