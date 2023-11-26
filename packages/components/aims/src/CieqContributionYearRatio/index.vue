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
    // 是否显示 cieq
    showCieq?: boolean
}>(), {
    apiParams: () => ({
        time: dayjs().subtract(1, 'h').valueOf(),
        code: '0101000000',
        codeType: 'grid'
    }),
    showCieq: false
})
/**
 * 定义 emits
 */
// defineEmits({})

/**
 * className 前缀
 */
const clsfix = 'dv-aims-cieq-contributio-ratio'

/**
 * 图表绘制
 */
// 配置项
const chartsFullOptions = ref<any>({ options: null })
const generateOption = (list: any[], cieq: any) => {
    return {
        options: {
            title: [
                {
                    show: props.showCieq,
                    text: `{cieq|${cieq}}`,
                    top: '62px',
                    left: 'center',
                    textStyle: {
                        rich: {
                            cieq: {
                                fontSize: 16,
                                color: '#fff',
                            },
                        }
                    }
                },
            ],
            grid: {
                left: 0,
                right: 0
            },
            legend: {
                show: true,
                bottom: -4,
                itemGap: 10,
                textStyle: {
                    color: 'var(--dv-color-text-primary)',
                    fontSize: 'var(--dv-text-body2)',
                },
                icon: 'circle',
                itemWidth: 12,
                itemHeight: 12,
            },
            tooltip: {
                trigger: 'item',
                padding: 8,
                formatter: (params: any) => {
                    return `${params.marker} ${params.name}  ${params.data.value2} ${params.value}%`
                },
                background: 'rgba(1, 11, 18, 0.6)'
            },
            series: [
                {
                    type: 'pie',
                    radius: props.showCieq ? ['28%', '60%'] : '60%',
                    center: ['50%', '44%'],
                    data: list,
                    label: {
                        position: 'outside',
                        color: 'var(--dv-color-text-primary)',
                        overflow: 'none',
                        formatter: (params: any) => {
                            const { name, value, value2 } = params.data
                            return `${name}  ${value2}  ${value}%`
                        },
                        fontSize: 'var(--dv-text-number1)',
                        fontFamily: 'var(--dv-font-family-number)',
                    },
                },
            ],
        },
    }
}
// 数据查询
const fetchData = () => {
    const colors = [
        '#0062FF',
        '#0AAEFF',
        '#2AC94F',
        '#FF792E',
        '#F84439',
        '#FFB443',
    ]
    getAirQualityStatis(props.apiParams).then((res) => {
        if (res.data && res.data.CIEQ) {
            const data1 = res.data.CIEQ.CIEQYearValueRate
            const data2 = res.data.CIEQ.CIEQYearValue
            const cieq = res.data.CIEQ.CIEQYearValue.cieq
            const list = BASE_FACTOR.filter(item => item.code !== 'aqi').map((item, index) => {
                const key = `V_ICIEQ_${item.key}`
                const value1 = data1[key as keyof typeof data1] ?? 0
                const value2 = data2[key as keyof typeof data2] ?? 0
                return {
                    name: item.name,
                    code: item.code,
                    value: value1,
                    value2,
                    itemStyle: {
                        color: colors[index]
                    }
                }
            })
            chartsFullOptions.value = generateOption(list, cieq)
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
