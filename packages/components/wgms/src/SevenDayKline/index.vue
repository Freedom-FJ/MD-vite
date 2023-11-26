<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: Tian
 * @LastEditTime: 2023-08-11 12:47:03
 * @Description: 研判分析：最近7天（30天）站点因子k线与日变化趋势图
-->
<template>
    <div class="dv-wgms-seven-day-kline">
        <div ref="chartSevenDayLine" class="chart">
            <BaseECharts :options="option" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { maxBy, minBy } from 'lodash-es'
import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import BaseECharts from '../../utils/echarts/BaseECharts.vue'
import { getKLine, waterSurfaceListAll } from './api'
const props = defineProps({
    beginTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    endTime: {
        type: Number,
        default: dayjs().endOf('year').valueOf()
    },
    factor: {
        type: Number,
        default: 27
    },
    accessCode: {
        type: String,
        default: 'GKA330100_2009'
    },
    timeType: {
        type: String,
        default: 'day'
    },
    factorFlag: {
        type: Boolean,
        default: false
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
})
const chartSevenDayLine = ref()
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
        factorFlag: false,
        beginTime: 1670601600000,
        endTime: 1671206399999,
        queryTimeType: 'hour'
    }
})
// 监听参数变化
watch(() => [props.beginTime, props.endTime, props.factor, props.accessCode, props.timeType, props.factorFlag], () => {
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
        accessCode: props?.accessCode,
        factor: props?.factor,
        factorFlag: props?.factorFlag,
        beginTime: props?.beginTime,
        endTime: props?.endTime,
        queryTimeType: props?.timeType
    }

    data.factorName = props?.factorName
    data.unit = props?.factorUnit
    getData()
}
/**
 * @name: getYearWeek
 * @test: test font
 * @msg: 将日期转换成一年中的第几周
 * @param {*} date
 * @return {*}
 */
const getYearWeek = async (date: number) => {
    const checkDate = new Date(date)
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7))
    const time = checkDate.getTime()
    checkDate.setMonth(0)
    checkDate.setDate(1)
    const week = Math.floor(Math.round((time - (checkDate as any)) / 86400000) / 7) + 2
    return week
}
/**
 * @name: 获取数据
 */
const getData = async () => {
    const res = await getKLine(data.params)
    const isHasData = (res && res.data && res.data.length > 0)
    // const resData = res.data || []
    // 假的数据
    const mockData = [
        {
            time: '1671120000000',
            value: '0.21',
            quality: 2,
            maxValue: '0.25',
            minValue: '0.2',
            firstValue: '0.2',
            lastValue: '0.25'
        },
        {
            time: '1671206400000',
            value: '0.23',
            quality: 2,
            maxValue: '0.28',
            minValue: '0.19',
            firstValue: '0.28',
            lastValue: '0.19'
        },
        {
            time: '1671292800000',
            value: '0.18',
            quality: 2,
            maxValue: '0.19',
            minValue: '0.17',
            firstValue: '0.19',
            lastValue: '0.18'
        },
        {
            time: '1671379200000',
            value: '0.18',
            quality: 2,
            maxValue: '0.19',
            minValue: '0.18',
            firstValue: '0.18',
            lastValue: '0.19'
        },
        {
            time: '1671465600000',
            value: '0.18',
            quality: 2,
            maxValue: '0.2',
            minValue: '0.16',
            firstValue: '0.18',
            lastValue: '0.16'
        },
        {
            time: '1671552000000',
            value: '0.07',
            quality: 1,
            maxValue: '0.17',
            minValue: '0.02',
            firstValue: '0.17',
            lastValue: '0.02'
        },
        {
            time: '1671638400000',
            value: '0.51',
            quality: 3,
            maxValue: '0.02',
            minValue: '0.02',
            firstValue: '0.02',
            lastValue: '0.02'
        }
    ]
    const resData: any = isHasData ? res?.data : mockData
    const klineData = {
        xAxis: [] as strNum[], kData: [] as strNum[][], values: [] as strNum[], quality: [] as number[]
    }
    resData.forEach((item: Record<string, any>) => {
        item.maxValue = Number(item.maxValue)
        item.minValue = Number(item.minValue)
        if (props.timeType === 'week')
            klineData.xAxis.push(`${getYearWeek(+item.time)}周`)
        else
            klineData.xAxis.push(dayjs.unix(Number(item.time) / 1000).format('MM-DD'))

        klineData.kData.push([item.minValue, item.firstValue, item.value, item.lastValue, item.maxValue])
        klineData.values.push(item.value)
        klineData.quality.push(item.quality)
    })
    const maxObj = maxBy(resData, 'maxValue')
    const minObj = minBy(resData, 'minValue')
    nextTick()
    option.value = await dayKLine(klineData, maxObj?.maxValue, minObj?.minValue, data.factorName, data.unit, timeStrList[props.timeType as keyof typeof timeStrList])
}
/**
 * 最近7天汪家埠氨氮K线与日变化趋势图
 * @param xData
 * @param Data
 * @returns
 */
const dayKLine = async (data: {
    xAxis: strNum[]
    kData: strNum[][]
    values: strNum[]
    quality: number[]
}, min: number, max: number, factorName: string, unit: string, timeStr: string) => {
    const { xAxis, kData, values, quality } = data
    const res: any = await waterSurfaceListAll({})
    const gradeList = res?.entries ?? []
    const option = {
        grid: [
            {
                top: 45,
                left: 45,
                right: 22,
                height: 60
            },
            {
                left: 45,
                right: 32,
                top: 140,
                height: '20%'
            }
        ],
        tooltip: {
            link: { xAxisIndex: 'all' },
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter(param: any) {
                param = param[0]
                if (param.axisIndex === 0) {
                    return [`${param.marker + param.seriesName} ${param.name}`, `最大值 ${param.data[5]}`, `最后一个值: ${param.data[4]}`, `平均值: ${param.data[3]}`, `第一个值: ${param.data[2]}`, `最小值: ${param.data[1]}`].join('<br/>')
                }
                else {
                    const level = !quality[param.dataIndex] && quality[param.dataIndex] !== 0
                        ? '--'
                        : gradeList.find((item: any) => {
                            return item.level === (quality[param.dataIndex] || 1)
                        })?.name ?? ''
                    const value_ = !param.value ? '--' : param.value
                    return [`${param.marker + param.seriesName} ${param.name}`, `${factorName}：${value_}${unit}`, `水质等级：${level}`].join('<br/>')
                }
            }
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'var(--dv-color-text-primary)',
                        fontFamily: 'var(--dv-font-family-number)',
                        fontSize: 'var(--dv-text-number2)'
                    }
                },
                axisTick: {
                    show: false
                },
                data: xAxis
            },
            {
                type: 'category',
                show: false,
                gridIndex: 1,
                boundaryGap: true,
                axisTick: {
                    show: false
                },
                data: xAxis
            }
        ],
        yAxis: [
            {
                // k线
                type: 'value',
                name: unit,
                nameTextStyle: {
                    align: 'right',
                    color: 'var(--dv-color-text-secondary)',
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: 'var(--dv-text-number2)',
                },
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: 'var(--dv-color-text-secondary)',
                        fontFamily: 'var(--dv-font-family-number)',
                        fontSize: 'var(--dv-text-number2)',
                    }
                },
                axisLine: {
                    show: false,
                },
                axisPointer: {
                    snap: true
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['transparent', 'var(--dv-color-fill-lighter)'],
                    },
                },
                splitLine: { show: false },
                axisTick: { show: false },
                max,
                min
            },
            {
                // 日变化柱状图
                type: 'value',
                gridIndex: 1,
                axisLabel: {
                    show: false
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
                name: 'K线',
                type: 'boxplot',
                yAxisIndex: 0,
                itemStyle: {
                    color: 'transparent',
                    borderColor: 'var(--dv-color-index)'
                },
                data: kData
            },
            {
                name: `${timeStr}变化`,
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                barWidth: 20,
                itemStyle: {
                    color: (params: any) => {
                        const level = quality[params.dataIndex] // 水质等级
                        const currData = gradeList.filter((item: any) => {
                            return level ? Number(item.level) === Number(level.toString()) : false
                        })
                        if (level != null)
                            return currData.length ? currData[0].color : '#6D7278' // 水质等级颜色
                    }
                },
                // 等级数字转等级文字信息
                // data: values
                data: values.map((item, index) => {
                    const colorList = ['#03A9F4', '#1976D2', '#85C941', '#D9CC4C', '#EE8E00', '#E12234']
                    return {
                        value: item,
                        itemStyle: {
                            color: colorList[index]
                        }
                    }
                })
            }
        ]
    }
    return option
}
const { title } = toRefs(data)
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
