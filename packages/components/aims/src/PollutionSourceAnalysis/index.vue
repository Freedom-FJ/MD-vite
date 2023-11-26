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
import { getSourceAnalysis } from './api'
import type { GetSourceAnalysisParams, SiteTypeData } from './api'

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 是否使用内置接口
    isUseBuiltInApi?: boolean
    // 查询参数
    apiParams?: GetSourceAnalysisParams
    // 内置接口不符合需求时，用外部数据进行覆盖
    data?: SiteTypeData[]
}>(), {
    isUseBuiltInApi: false,
    apiParams: () => ({}),
})
/**
 * 定义 emits
 */
// defineEmits({})

/**
 * className 前缀
 */
const clsfix = 'dv-aims-pollution-source-analysis'

/**
 * 图表相关
 */
const chartsFullOptions = ref<any>({ options: null })
const generateOption = (list: any[]) => {
    return {
        options: {
            tooltip: {
                trigger: 'item',
                padding: 8,
                background: 'rgba(1, 11, 18, 0.6)',
                formatter: (params: any) => {
                    const { marker, name, value } = params
                    return `
                        <div>${marker} ${name}  ${value}%</div>
                    `
                },
            },
            legend: {
                top: 'center',
                left: '50%',
                itemHeight: 10,
                itemWidth: 10,
                itemGap: 10,
                orient: 'vertical',
                icon: 'circle',
                textStyle: {
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: 'var(--dv-text-number1)',
                    color: 'var(--dv-color-text-primary)',
                    rich: {
                        name: {
                            fontSize: 'var(--dv-text-body1)',
                            color: 'var(--dv-color-text-primary)',
                            align: 'left',
                            width: 100,
                            // padding: [0, 30, 0, -5],
                        },
                        value: {
                            fontFamily: 'var(--dv-font-family-number)',
                            fontSize: 'var(--dv-text-number1)',
                            color: 'var(--dv-color-index)',
                            width: 36,
                            align: 'right',
                        },
                    },
                },
                formatter: (f_name: string) => {
                    const { name, value } = list.find((item: any) => item.name === f_name)
                    return `{name| ${name}}{value|${value}%}`
                },
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    center: ['25%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false,
                    },
                    data: list
                },
            ],
        }
    }
}

const fetchData = (list?: any[]) => {
    const colors = [
        '#0062FF',
        '#0AAEFF',
        '#2AC94F',
        '#FF792E',
        '#F84439',
        '#FFB443',
        '#A162F7',
        '#F95EB1',
    ]
    if (list) {
        chartsFullOptions.value = generateOption(list.map((item: any, index: number) => ({
            name: item.name,
            value: item.rate,
            itemStyle: {
                color: colors[index]
            }
        })))
        return
    }
    const data = [{
        name: '生活源', code: '1', rate: '20.5',
    }, {
        name: '农业源', code: '2', rate: '12.2',
    }, {
        name: '扬尘源', code: '3', rate: '10.2',
    }, {
        name: '燃煤', code: '4', rate: '8.2',
    }, {
        name: '工艺过程源', code: '5', rate: '7.8',
    }, {
        name: '移动源', code: '6', rate: '7',
    }, {
        name: '生物质源', code: '7', rate: '6.9',
    }, {
        name: '其他', code: '8', rate: '5.3',
    }]
    chartsFullOptions.value = generateOption(data.map((item: any, index: number) => ({
        name: item.name,
        value: item.rate,
        itemStyle: {
            color: colors[index]
        }
    })))
}
onMounted(() => {
    fetchData()
})
watch(() => props.apiParams, () => {
    fetchData()
})
watch(() => props.data, () => {
    if (!props.isUseBuiltInApi && props.data)
        fetchData(props.data)
})
</script>

<style lang="scss">
@import "./style/index";
</style>
