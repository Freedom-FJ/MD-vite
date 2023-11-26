<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: Tian
 * @LastEditTime: 2023-08-11 12:40:02
 * @Description: 水质-雨量-水位趋势对比图
-->
<template>
    <div class="dv-wgms-water-quality-rainfall">
        <div ref="chartQualityRainfall" class="chart">
            <BaseECharts :options="option" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import BaseECharts from '../../utils/echarts/BaseECharts.vue'
import { rainHydrologyAnalyse, waterSurfaceListAll } from './api'
const props = defineProps({
    startTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    endTime: {
        type: Number,
        default: dayjs().endOf('year').valueOf()
    },
    timeType: {
        type: String,
        default: 'hour'
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
    // 经纬度
    latitude: {
        type: Number,
        default: 30.3992
    },
    // 经纬度
    longitude: {
        type: Number,
        default: 119.9681
    }
})
const chartQualityRainfall = ref()
const option = ref<any>(undefined)
type strNum = string | number
const data = reactive({
    title: '水质-雨量-水位趋势对比图',
    unit: 'mg/L',
    factorName: '总磷(以 P 计）',
    params: {
        beginTime: 1670601600000,
        endTime: 1671206399999,
        latitude: 30.3992,
        longitude: 119.9681,
        queryTimeType: 'hour'
    }
})
// 监听参数变化
watch(() => [props.startTime, props.endTime, props.timeType, props.longitude, props.latitude, props.factorName, props.factorUnit], () => {
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
const initData = () => {
    data.params = {
        beginTime: props?.startTime,
        endTime: props?.endTime,
        longitude: props.longitude,
        latitude: props.latitude,
        queryTimeType: props?.timeType,
    }
    data.factorName = props?.factorName
    data.unit = props?.factorUnit
    getData()
}
/**
 * @name: 获取数据
 */
const getData = async () => {
    const res = await rainHydrologyAnalyse(data.params)
    const resData = res.data || []
    const xData = [] as string[]
    const seriesData = {
        hydrology: [] as string[],
        factorValue: [] as string[],
        rain: [] as string[],
        quality: [] as (string | null)[]
    }
    resData.forEach((item: Record<string, any>) => {
        if (props.timeType === 'hour' || props.timeType === 'day')
            xData.push(dayjs(item.time).format('MM-DD HH'))
        else
            xData.push(dayjs(item.time).format('MM-DD'))
        seriesData.rain.push(item.rain) // 雨量
        seriesData.hydrology.push(item.hydrology) // 水位
        seriesData.factorValue.push(item.factorValue) // 监测值
        seriesData.quality.push(item.quality) // 水质等级
    })
    option.value = await initWaterQuality(xData, seriesData, data.unit, data.factorName)
    // echarts.draw(chartQualityRainfall.value, lineOptions)
}
/**
 * 水质-雨量-水位趋势对比图
 * @param xData
 * @param Data
 * @returns
 */
const initWaterQuality = async (xAxis: string[], data: { hydrology: strNum[]; factorValue: strNum[]; rain: strNum[]; quality: (string | null)[] }, unit: string, factorName: string) => {
    const { hydrology, factorValue, rain, quality } = data
    const res: any = await waterSurfaceListAll({})
    const gradeList = res?.entries ?? []
    const option = {
        grid: {
            top: 55,
            right: 26,
            bottom: 45,
            left: 80
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            },
            formatter: (params: any[]) => {
                let str = `<div>${params[0].axisValue}</div>`
                params.forEach((item: Record<string, any>, index: number) => {
                    let unit = ''
                    if (index === 0)
                        unit = 'mm/h'
                    else if (index === 1)
                        unit = 'mg/L' || ''
                    else
                        unit = 'm'

                    str += `<div>${item.marker}${item.seriesName}：${item.value ? item.value : '--'}${unit}</div>`
                })
                return str
            }
        },
        legend: {
            show: true,
            // right: 'center',
            bottom: 0,
            inactiveColor: 'rgba(255,255,255,0.5)',
            textStyle: {
                color: 'var(--dv-color-text-primary)'
            },
            itemHeight: 2,
            itemWidth: 16,
            data: [
                {
                    name: '降雨量趋势',
                    icon: 'rect',
                },
                {
                    name: factorName,
                    icon: 'rect',
                },
                {
                    name: '水位趋势',
                    icon: 'rect',
                }
            ]
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'var(--dv-color-fill-lighter)'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: 'var(--dv-text-number2)',
                    color: 'var(--dv-color-text-primary)'
                }
            },
            axisTick: {
                show: false
            },
            data: xAxis
        },
        yAxis: [
            {
                // 降雨量
                type: 'value',
                name: '降雨量\n(mm/h)',
                nameLocation: 'start',
                nameTextStyle: {
                    align: 'right',
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: 'var(--dv-text-body2)',
                    color: 'var(--dv-color-text-secondary)'
                },
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        fontFamily: 'var(--dv-font-family-number)',
                        fontSize: 'var(--dv-text-number2)',
                        color: 'var(--dv-color-text-secondary)'
                    }
                },
                axisLine: {
                    show: false
                },
                axisPointer: {
                    snap: true
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'var(--dv-color-fill-lighter)'
                    }
                },
                axisTick: { show: false },
                inverse: true
            },
            {
                // 氨氮
                type: 'value',
                name: `监测值\n(${unit})`,
                nameTextStyle: {
                    align: 'right',
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: 'var(--dv-text-body2)',
                    color: 'var(--dv-color-text-secondary)'
                },
                position: 'left',
                offset: 40,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        fontFamily: 'var(--dv-font-family-number)',
                        fontSize: 'var(--dv-text-number2)',
                        color: 'var(--dv-color-text-secondary)'
                    }
                },
                axisLine: {
                    show: false,
                },
                axisPointer: {
                    snap: true
                },
                splitArea: {
                    show: false,
                },
                splitLine: { show: false },
                axisTick: { show: false }
            },
            {
                // 水位
                type: 'value',
                name: '水位(m)',
                nameTextStyle: {
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: 'var(--dv-text-body2)',
                    color: 'var(--dv-color-text-secondary)'
                },
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        fontFamily: 'var(--dv-font-family-number)',
                        fontSize: 'var(--dv-text-number2)',
                        color: 'var(--dv-color-text-secondary)'
                    }
                },
                axisLine: {
                    show: false,
                },
                axisPointer: {
                    snap: true
                },
                splitLine: { show: false },
                axisTick: { show: false }
            }
        ],
        series: [
            {
                name: '降雨量趋势',
                type: 'line',
                // smooth: true,
                showSymbol: false,
                yAxisIndex: 0,
                lineStyle: {
                    color: 'rgba(217, 204, 76, 1)',
                    opacity: 1,
                    width: 0.5
                },
                areaStyle: {
                    color: 'rgba(217, 204, 76, .5)'
                },
                data: rain
            },
            {
                name: factorName,
                type: 'line',
                smooth: false,
                connectNulls: true,
                yAxisIndex: 1,
                symbol: 'circle',
                showSymbol: false,
                lineStyle: {
                    color: 'rgba(0, 221, 255, 1)',
                    type: 'solid'
                },
                markPoint: {
                    show: false,
                    itemStyle: {
                        color: ['var(--dv-color-danger)']
                    }
                },
                label: {
                    show: true,
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: 'var(--dv-text-number2)',
                    color: 'var(--dv-color-text-secondary)'
                },
                // data: factorValue.map((item, index) => {
                //     return {
                //         value: item,
                //         itemStyle: {
                //             color: 'white'
                //         }
                //     }
                // })
                data: factorValue.map((item, index) => {
                    const currData = gradeList.filter((item: Record<string, any>) => item.level === Number(quality[index])) || [{
                        color: '#6D7278'
                    }]
                    return {
                        value: item,
                        itemStyle: {
                            color: currData.length ? currData[0].color : '#6D7278'
                        }
                    }
                }),
                // markArea: {
                //     silent: true,
                //     data: [
                //         {
                //             name: '达标',
                //             label: {
                //                 position: 'left',
                //                 color: 'rgba(255,255,255,0.5)'
                //             },
                //             itemStyle: {
                //                 color: 'transparent',
                //                 borderColor: '#5FE81B',
                //                 borderWidth: 7
                //             },
                //             x: '96.5',
                //             yAxis: 15
                //         },
                //         { x: '1.5', yAxis: 10 }
                //     ]
                // }
            },
            {
                name: '水位趋势',
                type: 'line',
                // smooth: true,
                showSymbol: false,
                yAxisIndex: 2,
                areaStyle: {
                    color: 'rgba(238, 142, 0, .5)'
                },
                markPoint: {
                    show: false,
                },
                lineStyle: {
                    color: 'rgba(238, 142, 0, 1)',
                    opacity: 1,
                    width: 0.5
                },
                data: hydrology
            }
        ]
    }
    return option
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
