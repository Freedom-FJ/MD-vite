<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2023/6/30 10:23
 * @Description: 危险品车辆管理
-->
<template>
    <div class="dv-ipes-hazardous-vehicle-manage">
        <!-- 实时动态 S -->
        <div class="sealing-row">
            <div class="sealing-header">
                <div class="sealing-header__title">
                    <span>实时动态</span>
                    <span class="sealing-header__title--sub">（{{ today }}）</span>
                </div>
                <div class="sealing-header__extra">
                    <el-select v-model="parkType" :popper-append-to-body="false" class="fpi-select" @change="handleParkTypeChange">
                        <el-option
                            v-for="item in parkOptions"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        />
                    </el-select>
                </div>
            </div>
            <div class="hazardous-statistics">
                <div class="hazardous-statistics-item">
                    <div class="hazardous-statistics-item__type">
                        {{ hazardousCar.ynCountTitle }}
                    </div>
                    <div class="hazardous-statistics-item__total">
                        <span>{{ hazardousCar.ynCount }}</span>
                    </div>
                    <div class="hazardous-statistics-item__detail">
                        <div class="hazardous-statistics-item__col">
                            <div class="hazardous-statistics-item__label">
                                {{ hazardousCar.dnCountTitle }}
                            </div>
                            <div class="hazardous-statistics-item__value">
                                {{ hazardousCar.dnCount }}
                            </div>
                        </div>
                        <div class="hazardous-statistics-item__col">
                            <div class="hazardous-statistics-item__label">
                                {{ hazardousCar.sfCountTitle }}
                            </div>
                            <div class="hazardous-statistics-item__value">
                                {{ hazardousCar.sfCount }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hazardous-statistics-item">
                    <div class="hazardous-statistics-item__type">
                        {{ hazardousCar.zxPercentTitle }}
                    </div>
                    <div class="hazardous-statistics-item__total">
                        <span>{{ hazardousCar.zxPercent.toFixed(1) }}%</span>
                    </div>
                    <div class="hazardous-statistics-item__detail">
                        <div class="hazardous-statistics-item__col">
                            <div class="hazardous-statistics-item__label">
                                {{ hazardousCar.zxCountTitle }}
                            </div>
                            <div class="hazardous-statistics-item__value">
                                {{ hazardousCar.zxCount }}
                            </div>
                        </div>
                        <div class="hazardous-statistics-item__col">
                            <div class="hazardous-statistics-item__label">
                                {{ hazardousCar.lxCountTitle }}
                            </div>
                            <div class="hazardous-statistics-item__value">
                                {{ hazardousCar.lxCount }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, } from 'vue'
import dayjs from 'dayjs'
import Echarts from '../common/Echarts.vue'
import { getCssValue, getFontFamily } from '../../utils/tools'
import type { ICarData, Props } from './types'
import { defaultProps } from './types'

/**
 * props
 */
const props = withDefaults(defineProps<Props>(), {
    ...defaultProps
})

/**
 * emits
 */
const emit = defineEmits({
    onParkTypeChange: (value: string) => value,
})

const colors = [
    {
        color: 'rgba(10, 174, 255, 1)',
        shadowColor: 'rgba(10, 174, 255, 0.3)',
    },
    {
        color: 'rgba(255, 180, 67, 1)',
        shadowColor: 'rgba(255, 180, 67, 0.3)',
    },
]

/**
 * data
 */
// 当天日期
const today = ref<string>(dayjs().format('YYYY-MM-DD'))
const parkType = ref<string>('')
interface chartOptionType {
    options: {
        [propName: string]: any
    }
}
const chartLoading = ref<boolean>(true)
const chartOption: chartOptionType = reactive({
    options: {},
})

// methods
const handleParkTypeChange = (value: string) => {
    emit('onParkTypeChange', value)
}

// tooltip格式化
const toolTipFormatter = (params: []): string => {
    // https://echarts.apache.org/zh/option.html#tooltip.formatter
    const data: any = [...params]
    const field = data.map((item: any) => {
        const { marker, seriesName, value } = item
        return `
                      <div class="tool-tips__row">
                          <div class="tool-tips__label"><span class="tool-tips__marker">${marker}</span>${seriesName}</div>
                          <div class="tool-tips__value"><span>${value}</span><span class="tool-tips__suffix">辆</span></div>
                      </div>
                `
    })
    // 添加title
    field.unshift(`<div class="tool-tips__row tool-tips__title">${data[0]?.name}</div>`)
    return field.join('')
}

// 设置图表数据
const setOptions = (list: ICarData[]) => {
    chartOption.options = {
        // 网格位置
        grid: {
            top: '33px',
            left: '10px',
            right: '12px',
            bottom: '3px',
            containLabel: true,
        },
        // 全局字体样式
        textStyle: {
            color: getCssValue('--dv-color-text-primary'),
            fontSize: 16,
            fontFamily: getFontFamily('--font-family-text'),
        },
        // 提示框
        tooltip: {
            confine: true, // 不让超出显示
            trigger: 'axis',
            formatter: toolTipFormatter,
            padding: [8, 12, 8, 12],
            className: 'echarts-tooltip tool-tips__panel',
            backgroundColor: 'rgba(7, 29, 51, 0.95)',
            borderColor: 'rgba(0, 212, 255, 0.2)',
            borderWidth: 1,
        },
        // 图例组件
        legend: {
            // 图例项
            data: list.map((item: ICarData) => {
                return {
                    name: item.name,
                    textStyle: {
                        color: getCssValue('--dv-color-text-primary'),
                        fontSize: 16,
                    },
                }
            }),
            // 图例样式
            icon: 'circle', // 圆
            // 图例大小
            itemHeight: 10,
            itemWidth: 10,
        },
        // X轴
        xAxis: {
            // 坐标轴名称。
            name: '',
            // 坐标轴类型。 category-->类目轴
            type: 'category',
            // 最近十天的数据
            data: new Array(list[0]?.data?.length || 10)
                .fill('')
                .map((_, idx) => `${dayjs().subtract(idx, 'day').format('MM.DD')}`)
                .reverse(),
            // 距离坐标原点是否有间隙
            boundaryGap: true,
            axisLine: {
                // 是否显示坐标轴轴线。
                show: false,
            },
            axisTick: {
                // 是否显示坐标轴刻度。
                show: false,
            },
        },
        // Y轴
        yAxis: {
            // 分割线及样式
            splitLine: {
                show: true,
                lineStyle: { color: ['rgba(27, 121, 211, 0.5)'] },
            },
            // 坐标轴类型
            type: 'value',
            // 坐标轴刻度标签的相关设置。
            axisLabel: {
                color: getCssValue('--dv-color-text-primary'),
                fontSize: 16,
                opacity: 0.6,
            },
            axisLine: {
                // 是否显示坐标轴轴线。
                show: false,
            },
            // 坐标轴名称与轴线之间的距离。
            nameGap: 4,
        },
        // 折线图
        series: list.map((item: { name: string; data: any }, idx: number) => {
            return {
                // 系列名称，用于tooltip的显示，legend 的图例筛选
                name: item.name,
                // 鼠标悬浮标记的图形
                symbol: 'emptyCircle', // 默认emptyCircle
                // 标记的大小
                symbolSize: 4,
                type: 'line',
                data: item.data,
                // 折线拐点标志的样式。
                itemStyle: {
                    color: colors[idx % colors.length].color,
                    shadowColor: colors[idx % colors.length].shadowColor,
                    shadowBlur: 8,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3,
                },
            }
        }),
    }
}

// watch
watch(
    () => props.carData,
    (newVal) => {
        if (newVal) {
            chartLoading.value = true
            /**
             * [
             *                 {
             *                     name: '危险品车辆',
             *                     data: [1, 3, 2],
             *                 },
             *             ]
             */
            setOptions(newVal)
            chartLoading.value = false
        }
    },
    { immediate: true }
)
</script>

<script lang="ts">
export default {
    name: 'DvIpesHazardousVehicleManage',
    title: '危险品车辆管理'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>

<style lang="scss">
@import "./style/hazardous-list";
</style>
