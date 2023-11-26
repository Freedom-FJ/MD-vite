<template>
    <div :class="`${clsfix}-container`">
        <FpiElRolling v-if="isLoadChartWidth" style="height: calc(100% - 27px);" direction="x" scroll-able :time="time">
            <div :class="`${clsfix}-echarts`">
                <BasicEcharts
                    height="100%" :style="{ width: `${chartWidth}px`, marginRight: 16 }"
                    :full-options="chartsFullOptions" :loading="false"
                />
            </div>
        </FpiElRolling>
        <ul :class="`${clsfix}-lengend`">
            <li v-for="item in lengendOptions" :key="item.color">
                <span class="border" :style="{ backgroundColor: item.color }" />
                <span class="text">{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { FpiElRolling } from '@ued_fpi/element-plus-expand'
import { BASE_FACTOR, FACTOR_LEVEL_TEXT, factorToColor } from 'fpi-tg-factor-tools'
import dayjs from 'dayjs'
import BasicEcharts from '../common/BasicEcharts'
import { type GetSiteRankParams, getSiteRank } from './api'
/**
 * 定义 emits
 */

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 是否使用内置接口
    isUseBuiltInApi?: boolean
    // 内置接口参数
    apiParams?: GetSiteRankParams
    // 当前排名的因子编码
    factorCode?: string
    // 使用外部数据
    list?: { name: string; value: number }[]
}>(), {
    isUseBuiltInApi: true,
    apiParams: () => ({
        time: dayjs().subtract(1, 'h').valueOf(),
        gridCode: '0101000000',
        timeType: 'hour',
        siteTypeCodes: 'A91230101,A91230102,A91230103',
        type: 'site',
        isAsc: false,
    }),
    factorCode: 'aqi',
    list: undefined
})

const clsfix = 'dv-aims-factor-realtime-rank-chart'

// 因子相关
const selectOptions = BASE_FACTOR.map(item => ({
    ...item
}))
const selectCode = ref(props.factorCode)
const selectUnit = computed(() => {
    return selectOptions.find(c => c.code === selectCode.value)?.unit
})
const selectName = computed(() => {
    return selectOptions.find(c => c.code === selectCode.value)?.name
})

const lengendOptions = FACTOR_LEVEL_TEXT.map((item) => {
    return {
        name: item.label.length > 1 ? `${item.label}污染` : item.label,
        color: item.color
    }
})
const time = ref(20)
// 图表配置相关
const chartWidth = ref(370)
const isLoadChartWidth = ref(false)
const chartsFullOptions = ref<any>({ options: null })
const generateOption = (list: any[]) => {
    if (list.length)
        time.value = list.length * 1.25

    return {
        options: {
            grid: {
                left: 10,
                bottom: 10,
                right: 10,
                top: 10,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                padding: 8,
                background: 'rgba(1, 11, 18, 0.6)'
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
                data: list.map((item) => {
                    return item.name
                })
            },
            yAxis: {
                type: 'value',
                name: selectUnit.value,
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
                show: false,
            },
            series: [
                {
                    data: list.map((item) => {
                        return {
                            value: item.value,
                            itemStyle: {
                                color: factorToColor(selectCode.value, item.value, 'hour')
                            }
                        }
                    }),
                    name: selectName.value,
                    type: 'bar',
                    barWidth: 15,
                }
            ]
        },
    }
}
const fetchData = () => {
    getSiteRank({ ...props.apiParams, factorCode: props.factorCode }).then((res) => {
        if (res.data && res.data.entries) {
            const list = res.data.entries.map((item) => {
                let value = item[selectName.value as keyof typeof item]
                value = Number(value) > 0 ? Number(value) : '--'
                return {
                    name: item.name,
                    value
                }
            })
            setChartWidth(list)
            nextTick(() => {
                chartsFullOptions.value = generateOption(list)
            })
        }
    })
}

const setChartWidth = (list: any[]) => {
    chartWidth.value = list.length * 40 > chartWidth.value ? list.length * 40 : chartWidth.value
    isLoadChartWidth.value = true
}

onMounted(() => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch([() => props.apiParams, () => props.factorCode], () => {
    if (props.isUseBuiltInApi)
        fetchData()
})

// 监听外部 list
watch([() => props.list, () => props.factorCode], () => {
    if (!props.isUseBuiltInApi && props.list) {
        setChartWidth(props.list)
        nextTick(() => {
            props.list && (chartsFullOptions.value = generateOption(props.list))
        })
    }
})
</script>

<style lang="scss">
@import "@ued_fpi/element-plus-expand/es/src/fpi-el-rolling/style/index.css";
@import "./style/index";
</style>
