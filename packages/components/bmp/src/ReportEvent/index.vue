<template>
    <div class="dv-bmp-tab-item" :style="{ height: `${height}px`, width: `${width}px` }">
        <div class="title">
            {{ title }}
        </div>
        <div class="today-line">
            <div class="label">
                今日
            </div>
            <div class="today-right">
                <div class="value">
                    {{ todayData.done }}
                </div>
                <div class="text">
                    /
                </div>
                <div class="label-num">
                    {{ todayData.total }}
                </div>
                <div class="chart">
                    <BaseECharts :options="options" />
                </div>
            </div>
        </div>
        <div class="year-line">
            <div class="year-label">
                年累计
            </div>
            <div class="year-right">
                <div class="year-value">
                    {{ annualCumulativeData.done }}
                </div>
                <div class="year-text">
                    /
                </div>
                <div class="year-total">
                    {{ annualCumulativeData.total }}
                </div>
            </div>
        </div>
        <div class="bottom-bar">
            <div class="bar-value" :style="{ width: `${annualCumulativeData.percent}%` }" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { PropType } from 'vue'
import { nextTick, onMounted, reactive, ref } from 'vue'
import BaseECharts from '../../../wgms/utils/echarts/BaseECharts.vue'
import { pieChartOptions } from './utils/echarts/echartsOptions'
import { countOfTodayNewAndStatus } from './api'

const props = defineProps({
    /**
     * 当前年份
     */
    year: {
        type: String,
        default: dayjs().format('YYYY')
    },
    /**
     * 标题
     */
    title: {
        type: String,
        default: '上报事件'
    },
    /**
     * 高度
     */
    height: {
        type: Number,
        default: 136
    },
    /**
     * 宽度
     */
    width: {
        type: Number,
        default: 182
    },
    /**
     * 区域站点list
     */
    regionCodeList: {
        type: Array as PropType<string[]>,
        default: () => []
    },
    /**
     * 环境要素
     */
    envTypeCode: {
        type: String,
        default: 'water'
    },
    // 是否使用内置接口进行数据查询
    isUseBuiltInApi: {
        type: Boolean,
        default: true
    },
    // 不使用内部接口查询时，组件使用的数据
    data: {
        type: Object,
        default: () => {}
    }
})
// 今日数据
const todayData = reactive({
    done: 0,
    total: 0
})
// 年累计数据
const annualCumulativeData = reactive({
    done: 0,
    total: 0,
    percent: 0
})

// echarts 的 ref
const options = ref<any>()

onMounted(async () => {
    if (props.isUseBuiltInApi) {
        getTodayData()
        getAnnualCumulativeData()
    }
    else {
        todayData.done = props.data.todayData.done
        todayData.total = props.data.todayData.total
        annualCumulativeData.done = props.data.annualCumulativeData.done
        annualCumulativeData.total = props.data.annualCumulativeData.total
        annualCumulativeData.percent = Math.round((annualCumulativeData.done / annualCumulativeData.total) * 100)
    }
})
// 获取今日数据
const getTodayData = async () => {
    const startTime = dayjs().startOf('day').valueOf()
    const endTime = dayjs().valueOf()
    const { unhandledCount, handlingCount, handledCount } = await getData(startTime, endTime)
    todayData.done = handledCount
    todayData.total = unhandledCount + handlingCount + handledCount
    nextTick(() => {
        drawChart(todayData)
    })
}
// 获取年累计数据
const getAnnualCumulativeData = async () => {
    const startTime = dayjs(props.year).startOf('year').valueOf()
    const endTime = dayjs(props.year).add(1, 'years').startOf('year').valueOf()
    const { unhandledCount, handlingCount, handledCount } = await getData(startTime, endTime)
    const total = unhandledCount + handlingCount + handledCount
    annualCumulativeData.done = handledCount
    annualCumulativeData.total = total
    annualCumulativeData.percent = Math.round((handledCount / total) * 100)
}

const drawChart = (pie: { done: number; total: number }) => {
    const pieData = pie.total
        ? [
            { name: '完成', value: pie.done },
            { name: '未完成', value: pie.total - pie.done },
        ]
        : []
    options.value = pieChartOptions(pieData)
}
/**
 * @name: 获取事件上报统计
 * @return {*}
 */
const getData = async (startTime: number, endTime: number) => {
    try {
        const params = {
            regionCode: props.regionCodeList?.join(','),
            startTime,
            endTime,
            envTypeCodeList: props.envTypeCode?.split(',')
        }
        const { data } = await countOfTodayNewAndStatus(params)
        return data || {
            unhandledCount: 0,
            handlingCount: 0,
            handledCount: 0,
        }
    }
    catch (error) {
        return {
            unhandledCount: 0,
            handlingCount: 0,
            handledCount: 0,
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./styles/index";
</style>
