<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 15:35:02
 * @Description: 研判分析：上游影响
-->
<template>
    <div class="dv-wgms-upstream-impact">
        <div ref="chartUpstreamImpact" class="chart">
            <BaseECharts :options="option" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { maxBy, minBy } from 'lodash-es'
import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import BaseECharts from '../../utils/echarts/BaseECharts.vue'
import { pathAnalysis, surfaceWaterStandard, waterSurfaceListAll } from './api'
const props = defineProps({
    configTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    beginTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    endTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    factorCode: {
        type: String,
        default: ''
    },
    timeType: {
        type: String,
        default: 'hour'
    },
    factor: {
        type: Number,
        default: 27
    },
    // 因子名称
    factorName: {
        type: String,
        default: '总磷(以 P 计）'
    },
    // 因子单位
    factorUnit: {
        type: String,
        default: 'mg/L'
    },
    accessCode: {
        type: String,
        default: ''
    },
    accessCodeList: {
        type: String,
        default: ''
    },
    limit: {
        type: Number,
        default: 2
    },
    baseLevel: {
        type: Number,
        default: -1
    }
})
const chartUpstreamImpact = ref()
const option = ref<any>(undefined)
const timeStrList = {
    hour: '小时',
    day: '日',
    week: '周',
    month: '月',
    year: '年',
}
type strNum = string | number
const data = reactive({
    title: '',
    unit: 'mg/L',
    factorName: '总磷(以 P 计）',
    params: {
        accessCode: 'JMSZSY0007',
        factor: 27,
        beginTime: 1688698800000,
        endTime: 1688698800000,
        queryTimeType: 'day',
        limit: 2
    },
    standardValue: '',
    gradeList: [] as any
})
// 监听参数变化
watch(() => [props.configTime, props.beginTime, props.endTime, props.factorCode, props.timeType, props.factor, props.factorName, props.accessCode, props.accessCodeList, props.limit, props.baseLevel], () => {
    initData()
})
onMounted(async () => {
    await nextTick()
    initData()
})
/**
 * @name: initData
 * @test: test font
 * @msg: 初始化数据
 * @return {*}
 */
const initData = async () => {
    data.params = {
        accessCode: props?.accessCode,
        factor: props?.factor,
        beginTime: props?.beginTime,
        endTime: props?.endTime,
        queryTimeType: props?.timeType,
        limit: props?.limit
    }

    data.factorName = props?.factorName
    data.unit = props?.factorUnit
    // 获取超标线
    const { data: resData } = await surfaceWaterStandard({
        accessCodeList: props?.accessCodeList,
        baseLevel: props?.baseLevel,
        factorFlag: false,
        factor: props?.factor,
        configTime: props?.configTime
    })
    const limit = resData && resData[props.accessCode] ? resData[props.accessCode][props.factorCode] : ''
    const params = data.params
    const upValue_ = limit?.upValue ?? ''
    const downValue_ = limit?.downValue ?? ''
    await getData(params, upValue_, downValue_)
}
/**
 * @name: 获取数据
 */
const getData = async (params: any, upValue: number, downValue: number) => {
    const res: any = await pathAnalysis(params)
    const resData: any = res.data
    const waterQualityData = {
        xAxis: resData.map((item: Record<string, any>) => item.name),
        quality: resData.map((item: Record<string, any>) => item.value),
        hydrology: [],
        rain: [],
        factorValue: []
    }
    const dass = waterQualityData.quality.map((item: Record<string, any>, index: number) => {
        return {
            value: item || 0
        }
    })
    option.value = await getLineOptions(waterQualityData.xAxis, data.factorName, dass, upValue, downValue)
}
/**
 * 折线图配置
 */
const getLineOptions = async (xAxis: [], unitName: string, dass: [], upValue: number, downValue: number) => {
    const res: any = await waterSurfaceListAll({})
    const gradeList = res?.entries ?? []
    return {
        tooltip: {
            trigger: 'axis',
            confine: true,
            axisPointer: {
                type: 'line',
            },
            formatter(params: any) {
                const param = params[0]
                const level = param.value !== 0
                    ? '--'
                    : gradeList.find((item: any) => {
                        return item.level === (param.value || 0)
                    })?.name ?? ''
                const value_ = !param.value ? '--' : param.value
                return [`${param.marker} ${param.name}`, `${unitName}：${value_}${props?.factorUnit}`, `水质等级：${level || '--'}`].join('<br/>')
            },
        },
        grid: {
            top: 40,
            right: 22,
            bottom: 25,
            left: 10,
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    rich: {
                        a: {
                            align: 'left',
                            width: 160
                        }
                    },
                    color: 'var(--dv-color-text-primary)'
                },
                interval: 0
            },
            data: xAxis
        },
        yAxis: {
            type: 'value',
            name: unitName,
            nameTextStyle: {
                align: 'right',
                color: 'var(--dv-color-text-secondary)',
                padding: [2, -50, 6, 0]
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: 'var(--dv-text-headline3)',
                    color: 'var(--dv-color-text-secondary)'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'var(--dv-color-fill-lighter)'
                }
            },
            axisTick: { show: false },
            splitArea: {
                show: false
            },
            max: (value: any) => {
                // PH特殊处理
                if (props.factorCode === 'w01001') {
                    if (value.max > upValue)
                        return value.max

                    else
                        return upValue
                }
                else {
                    if (value.max < upValue && upValue)
                        return upValue

                    else
                        return value.max
                }
            },
        },
        series: [
            {
                connectNulls: true,
                type: 'line',
                symbolSize: 5,
                yAxisIndex: 0,
                lineStyle: {
                    color: '#0062FF',
                    width: 1
                },
                data: dass,
                markLine: {
                    symbol: 'none',
                    data: [
                        {
                            yAxis: upValue == null ? '' : upValue,
                            show: false,
                            name: '超标线',
                            label: {
                                show: true,
                                formatter: '{b}',
                                position: 'end',
                                distance: -36,
                                fontSize: 8,
                                lineHeight: 12,
                                padding: [2, 6, 0, 6],
                                color: 'var(--dv-color-text-primary)',
                                backgroundColor: 'var(--dv-color-danger)',
                                borderRadius: 8
                            },
                            lineStyle: {
                                type: 'solid',
                                color: 'var(--dv-color-danger)'
                            }
                        },
                        {
                            yAxis: downValue == null ? '' : downValue,
                            show: false,
                            name: '超标线',
                            label: {
                                show: true,
                                formatter: '{b}',
                                position: 'end',
                                distance: -36,
                                fontSize: 8,
                                lineHeight: 12,
                                padding: [2, 6, 0, 6],
                                color: 'var(--dv-color-text-primary)',
                                backgroundColor: 'var(--dv-color-danger)',
                                borderRadius: 8
                            },
                            lineStyle: {
                                type: 'solid',
                                color: 'var(--dv-color-danger)'
                            }
                        }
                    ]
                }
            }
        ],
    }
}
const { title, standardValue, gradeList } = toRefs(data)
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
