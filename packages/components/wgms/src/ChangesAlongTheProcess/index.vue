<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-15 08:37:06
 * @Description: 藻类研判分析：叶绿素a沿程变化
-->
<template>
    <div class="dv-wgms-changes-along-the-process">
        <div ref="chartUpstreamImpact" class="chart">
            <BaseECharts :options="option" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import BaseECharts from '../../utils/echarts/BaseECharts.vue'
import { pathAnalysis } from './api'
const props = defineProps({
    dataType: {
        type: [Number, String],
        default: 0
    },
    startTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    endTime: {
        type: Number,
        default: dayjs().endOf('year').valueOf()
    },
    sourceIds: {
        type: String,
        default: ''
    },
    siteCode: {
        type: String,
        default: ''
    },
    stationCode: {
        type: [Number, String],
        default: 1
    },
    timeType: {
        type: String,
        default: 'hour'
    },
})
const chartUpstreamImpact = ref()
const option = ref<any>(undefined)
type strNum = string | number
const data = reactive({
    title: '',
})
// 监听参数变化
watch(() => [props.dataType, props.startTime, props.endTime, props.siteCode, props.sourceIds, props.stationCode, props.timeType], () => {
    getData()
})
onMounted(async () => {
    await nextTick()
    getData()
})
/**
 * @name: 获取数据
 */
const getData = async () => {
    const res: any = await pathAnalysis({
        dataType: props?.dataType,
        startTime: props?.startTime,
        endTime: props?.endTime,
        siteCode: props.siteCode, // 站点编码
        sourceIds: props?.sourceIds, // 关联的站点id
        stationCode: props?.stationCode,
        timeType: props?.timeType
    })
    const dataList = res?.data?.siteFactorDataList ?? []
    const xData = dataList.map((item: Record<string, any>) => {
        return item.siteName
    })
    const valueDate = dataList.map((item: Record<string, any>) => {
        return item.factorValue
    })
    const limit = res?.data?.limit
    option.value = await upstreamSectionOptions(xData, valueDate, limit)
}
/**
 * 叶绿素a沿程变化
 * @param xData
 * @param data
 * @returns
 */
const upstreamSectionOptions = (xData: string[], data: number[] | string[], limit: number) => {
    return {
        title: {
            show: true,
            text: 'μg/L',
            textAlign: 'left',
            left: 10,
            top: 10,
            textStyle: {
                color: 'var(--dv-color-text-secondary)',
                fontSize: 'var(--dv-text-number2)',
                fontFamily: 'var(--dv-font-family-number)',
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        grid: {
            top: 50,
            left: 10,
            right: '1%',
            bottom: 20,
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
                        color: 'var(--dv-color-text-primary)',
                        fontSize: 'var( --dv-text-body1)',
                    }
                },
                axisTick: {
                    show: false
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
                    }
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
                name: '沿程变化',
                type: 'line',
                data,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    color: '#0AAEFF',
                    width: 1
                },
                itemStyle: {
                    color: (params: Record<string, any>) => {
                        return params.value > limit ? '#f54455' : '#1492E6'
                    }
                },
                markLine: {
                    symbol: 'none',
                    type: 'average',
                    data: [
                        {
                            name: '超标线',
                            lineStyle: {
                                type: 'solid',
                                color: 'var(--dv-color-danger)'
                            },
                            label: {
                                position: 'end',
                                formatter: '{b}',
                                distance: -50,
                                backgroundColor: 'var(--dv-color-danger)',
                                color: 'var(--dv-color-text-primary)',
                                borderRadius: 20,
                                padding: [3, 7]
                            },
                            yAxis: limit
                        },
                    ]
                },
            }
        ]
    }
}
const { title } = toRefs(data)
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
