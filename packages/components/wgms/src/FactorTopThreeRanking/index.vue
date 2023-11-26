<!--   藻类研判分析：排名前三关联因子  -->
<template>
    <div class="dv-wgms-chlorophyll-a-change-rate" :style="{ '--height': getHeight }">
        <div id="dv-wgms-linkFactorChart" ref="chartRef" class="dv-wgms-chart">
            <BaseECharts :options="option" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import BaseECharts from '../../utils/echarts/BaseECharts.vue'
import { getTopThreeData } from './api'
const props = defineProps({
    height: {
        type: [String, Number],
        default: '200px'
    },
    type: {
        default: 'automatic', // 默认自动数据 manual（手工数据）
        type: String
    },
    // 时间类型
    timeType: {
        type: String,
        required: false // day
    },
    siteCode: {
        type: String,
        required: false // zaoleishougong
    },
    stationCode: {
        type: String,
        required: false, // w01016
    },
    startTime: {
        type: Number,
        required: false // 1663257600000
    },
    endTime: {
        type: Number,
        required: false // 1663257600000
    },
    data: {
        type: Object,
        required: false
    },
})

const chartRef = ref()
const option = ref<any>(undefined)
watch([
    () => props.type,
    () => props.timeType,
    () => props.siteCode,
    () => props.stationCode,
    () => props.startTime,
    () => props.endTime,
    () => props.data,
], () => {
    if (!props.data) {
        getData()
    }
    else {
        nextTick(() => {
            initChart(props.data || [])
        })
    }
}, { immediate: true })

/**
 * 获取数据
 */
async function getData() {
    const params = {
        timeType: props.timeType,
        siteCode: props.siteCode,
        stationCode: props.stationCode,
        endTime: props.endTime,
        startTime: props.startTime,
        dataType: props.type === 'automatic' ? 0 : 1, // 数据类型 自动/手工(0/1)
    }
    const res = await getTopThreeData(params)
    initChart(res.data || [])
}

const initChart = (res: any) => {
    const resData = res ?? []
    const upData = resData.map((item: Record<string, any>) => {
        if (item.factorValue >= 0)
            return item.factorValue === 0 ? 0 : item.factorValue
        else
            return ''
    })
    const downData = resData.map((item: Record<string, any>) => {
        if (item.factorValue < 0)
            return item.factorValue

        else
            return ''
    })
    const xData = resData.map((item: Record<string, any>) => item.factorName)
    option.value = getAlgaeBarOptions(xData, upData, downData)
}
/**
 * 获取宽度
 */
const getHeight = computed(() => {
    if (typeof props.height === 'string')
        return props.height
    else if (typeof props.height === 'number')
        return `${props.height}px`
    else
        return '100%'
})
const getAlgaeBarOptions = (Xdata: string[], dataUp: (number | null)[], dataDown: (null | number)[]) => {
    return {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: Xdata,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'var(--dv-color-fill-lighter)'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    fontSize: 'var(--dv-text-body1)',
                    color: 'var(--dv-color-text-primary)'
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                data: Xdata
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                stack: 'Total',
                barWidth: 24,
                color: 'var(--dv-color-success)',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        offset: [0, -4],
                        formatter: '{c}',
                        textStyle: {
                            color: 'var(--dv-color-success)',
                            fontFamily: 'var(--dv-font-family-number)',
                            fontSize: 'var(--dv-text-number1)',
                        }
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: dataUp // [320, 302, 341, 374, 390, 450, 420]
            },
            {
                name: '',
                type: 'bar',
                stack: 'Total',
                barWidth: 24,
                color: 'var(--dv-color-warning)',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        offset: [0, -4],
                        formatter: '{c}',
                        textStyle: {
                            color: 'var(--dv-color-warning)',
                            fontFamily: 'var(--dv-font-family-number)',
                            fontSize: 'var(--dv-text-number1)',
                        }
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: dataDown // [-120, -132, -101, -134, -190, -230, -210]
            }
        ]
    }
}
</script>

<style scoped lang="scss">
@import "../../styles/mixins";
@import "./style/index";
</style>
