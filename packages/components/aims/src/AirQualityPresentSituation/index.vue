<template>
    <div :class="`${clsfix}-container`">
        <div :class="`${clsfix}-top`">
            <div :class="`${clsfix}-top-item`">
                <span class="title">综合指数</span>
                <div class="content">
                    <span class="value">{{ realtimeData.cieqVal }}</span>
                    <div class="main">
                        <span class="text">主要污染物</span>
                        <span
                            class="factor" :style="{
                                color:
                                    realtimeData.firstPollution === '--'
                                        ? noDataColor
                                        : undefined,
                            }"
                        >{{ realtimeData.firstPollution }}</span>
                    </div>
                </div>
            </div>
            <div :class="`${clsfix}-top-item`">
                <span class="title">优良率</span>
                <div class="content">
                    <span class="value">{{ realtimeData.fineRate }}</span>
                    <span class="per">%</span>
                </div>
            </div>
        </div>
        <div :class="`${clsfix}-center`">
            <span>污染物浓度</span>
            <span>（ 单位：μg/m³, CO：mg/m³ ）</span>
        </div>
        <ul :class="`${clsfix}-bottom`">
            <li v-for="item in realtimeData.factorList" :key="item.code" :class="`${clsfix}-bottom-item`">
                <span class="value" :style="{ color: item.color }">{{
                    item.value
                }}</span>
                <span class="line" :style="{ backgroundColor: item.color }" />
                <span class="name">{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { BASE_FACTOR, factorToColor } from 'fpi-tg-factor-tools'
import dayjs from 'dayjs'
import { getCityDetail } from './api'
import type { GetCityDetailParams } from './api'

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 查询参数
    apiParams?: GetCityDetailParams
}>(), {
    apiParams: () => ({
        time: dayjs().subtract(1, 'h').valueOf(),
        gridCode: '0101000000',
        timeType: 'year'
    }),
})
/**
 * 定义 emits
 */
// defineEmits({})

/**
 * className 前缀
 */
const clsfix = 'dv-aims-air-quality-present-situation'

/**
 * 主体内容相关
 */
// 无数据颜色
const noDataColor = 'var(--dv-color-text-secondary)'
// 实时空气质量数据 默认无数据
const realtimeData = reactive({
    cieqVal: '--',
    firstPollution: '--',
    fineRate: '--',
    factorList: BASE_FACTOR.filter(item => item.code !== 'aqi').map(
        (item) => {
            return {
                ...item,
                name: item.name,
                code: item.code,
                value: '--',
                color: noDataColor,
            }
        }
    ),
})
// 数据查询
const fetchData = () => {
    getCityDetail(props.apiParams).then((res) => {
        if (res.data) {
            realtimeData.cieqVal = Number.isNaN(Number(res.data.cieq)) ? '--' : Number(res.data.cieq).toFixed(2)
            realtimeData.firstPollution = res.data.mainPollutants
            realtimeData.factorList = realtimeData.factorList.map((item) => {
                const obj = res.data?.commonFactorData.find(c => c.code === item.code)
                return {
                    ...item,
                    value: obj ? obj.value : '--',
                    color: obj && obj.value !== '--' ? factorToColor(item.code, obj.value, 'day') : noDataColor,
                }
            })
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
