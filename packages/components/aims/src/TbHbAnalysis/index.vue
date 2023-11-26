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
import { factorKeyTransform } from 'fpi-tg-factor-tools'
import BasicEcharts from '../common/BasicEcharts'
import { getTbHbData } from './api'
import type { GetTbHbDataParams } from './api'

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 查询参数
    apiParams?: GetTbHbDataParams
}>(), {
    apiParams: () => ({
        dataType: 'month',
        startTime: dayjs().subtract(11, 'M').valueOf(),
        endTime: dayjs().valueOf(),
        factorCode: 'cieq',
        codeType: 'grid',
        code: '0101000000',
    })
})
const upSvg = `<i style='width: 14px;font-size: 14px;display: inline-block;'>
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="red" d="M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 438.633a28.913 28.913 0 0 1-42.646 0 33.43 33.43 0 0 1 0-45.236l271.058-288.045a28.913 28.913 0 0 1 42.647 0L834.5 393.397a33.43 33.43 0 0 1 0 45.176 28.913 28.913 0 0 1-42.647 0l-219.618-233.23z"></path></svg>
</i>`
const downSvg = `<i style='width: 14px;font-size: 14px;display: inline-block;'>
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="green" d="M544 805.888V168a32 32 0 1 0-64 0v637.888L246.656 557.952a30.72 30.72 0 0 0-45.312 0 35.52 35.52 0 0 0 0 48.064l288 306.048a30.72 30.72 0 0 0 45.312 0l288-306.048a35.52 35.52 0 0 0 0-48 30.72 30.72 0 0 0-45.312 0L544 805.824z"></path></svg>
</i>`
/**
 * 定义 emits
 */
// defineEmits({})

/**
 * className 前缀
 */
const clsfix = 'dv-aims-tb-hb-analysis'

/**
 * 图表相关
 */
const chartsFullOptions = ref<any>({ options: null })
const generateOption = (xData: string[], series: any[]) => {
    return {
        options: {
            grid: {
                left: 20,
                bottom: 10,
                right: 20,
                top: 40,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                padding: 8,
                background: 'rgba(1, 11, 18, 0.6)',
                formatter: (params: any) => {
                    const title = getTootipName()
                    const strArr = params.map((item: any) => {
                        let str1 = `<div>
                                ${item.marker}
                                <span style="display: inline-block;width: 100px;">${item.data.leftTitle}</span>
                                <span style="display: inline-block;text-align: right;width: 60px;">${item.value}${item.data.unit !== '--' && item.unit ? item.unit : ''}</span>
                            </div>`
                        if (item.data.type !== 'current') {
                            str1 += `
                            <div>
                                ${item.marker}
                                <span style="display: inline-block;width: 100px;">${item.data.leftTitle2}</span>
                                <span style="display: inline-flex;align-items: center;justify-content: flex-end;width: 60px;">
                                    ${item.data.leftTitle2Value}
                                </span>
                                ${item.data.upOrDown}
                            </div>
                            `
                        }
                        return str1
                    })
                    const str = strArr.join('')
                    return `<div>
                        <div>${title}</div>
                        ${str}
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
                data: xData,
            },
            yAxis: {
                type: 'value',
                name: getUnit(),
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
                splitNumber: 3,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['var(--dv-color-border-light)']
                    }
                },
            },
            legend: {
                show: true,
                top: 0,
                itemGap: 3,
                textStyle: {
                    color: 'var(--dv-color-text-primary)',
                    fontSize: 12,
                },
                itemWidth: 16,
                itemHeight: 8,
            },
            series,
        },
    }
}

const getTootipName = () => {
    if (props.apiParams.factorCode === 'cieq')
        return '综合指数'
    else
        return factorKeyTransform(props.apiParams.factorCode, 'name')
}
const getUnit = () => {
    return factorKeyTransform(props.apiParams.factorCode, 'unit')
}
const fetchData = () => {
    getTbHbData(props.apiParams).then((res) => {
        if (res.data && res.data) {
            const data = res.data
            const xData: string[] = data.times.map((time: string) =>
                ['quarter', 'month', 'week', 'day'].includes(props.apiParams.dataType)
                    ? time.slice(5)
                    : ['hour'].includes(props.apiParams.dataType)
                        ? time.slice(-2)
                        : time
            )
            const list = [
                {
                    name: '本期',
                    id: 'current',
                    color: '#409eff',
                    key1: 'currentPeriodValue',
                    key3: 'times',
                },
                {
                    name: '上期',
                    id: 'last',
                    color: '#fb9905',
                    key1: 'lastPeriodValue',
                    key2: 'lastPeriodRatio',
                    key3: 'lastTimes',
                },
                {
                    name: '同期',
                    id: 'same',
                    color: '#fb6868',
                    key1: 'samePeriodValue',
                    key2: 'samePeriodRatio',
                    key3: 'sameTimes'
                }
            ]
            const series = list.map((item) => {
                const values = data[item.key1 as keyof typeof data]
                const radios = data[item.key2 as keyof typeof data]
                const times = data[item.key3 as keyof typeof data]
                return {
                    name: item.name,
                    type: 'line',
                    data: (values as []).map((c: any, index) => {
                        const radioV = radios ? Number(radios[index]) : NaN
                        let upOrDown = ''
                        if (!Number.isNaN(radioV)) {
                            if (radioV > 0)
                                upOrDown = upSvg

                            else if (radioV < 0)
                                upOrDown = downSvg

                            else
                                upOrDown = ''
                        }
                        return {
                            value: c,
                            type: item.id,
                            unit: data.unit,
                            leftTitle: `${item.name} ${times[index]}`,
                            leftTitle2: item.id === 'same' ? '同比变化率' : item.id === 'last' ? '环比变化率' : '',
                            leftTitle2Value: Number.isNaN(radioV) ? '--' : `${Math.abs(radioV)}%`,
                            upOrDown,
                        }
                    }),
                    itemStyle: {
                        color: item.color
                    }
                }
            })
            chartsFullOptions.value = generateOption(xData, series)
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
