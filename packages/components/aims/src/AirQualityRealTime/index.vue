<template>
    <div :class="`${clsfix}-container`">
        <div :class="`${clsfix}-top`">
            <div :class="`${clsfix}-top-left`">
                <div class="aqiValue" :style="{ color: realtimeData.aqiColor }">
                    {{ realtimeData.aqiVal }}
                </div>
                <div class="aqiInfo">
                    <span>AQI</span>
                    <span :style="{ color: realtimeData.aqiColor }">{{
                        realtimeData.aqiPollutionZh
                    }}</span>
                </div>
            </div>
            <div :class="`${clsfix}-top-right`">
                <span class="data-time">{{ realtimeData.dataTime }}</span>
                <span class="text">首要污染物</span>
                <span class="value" :style="{ color: realtimeData.firstPollution === '--' ? noDataColor : undefined }">{{
                    realtimeData.firstPollution }}</span>
            </div>
        </div>
        <div :class="`${clsfix}-center`">
            <span>{{ props.timeType === 'hour' ? '实时' : '今日' }}浓度</span>
            <span>（ 单位：μg/m³, CO：mg/m³ ）</span>
        </div>
        <ul :class="`${clsfix}-bottom`">
            <li v-for="item in realtimeData.factorList" :key="item.code" :class="`${clsfix}-bottom-item`">
                <span class="value" :style="{ color: item.color }">{{ item.value }}</span>
                <span class="line" :style="{ backgroundColor: item.color }" />
                <span class="name">{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { BASE_FACTOR, FACTOR_LEVEL_TEXT, factorToColor, factorToLevel } from 'fpi-tg-factor-tools'
import dayjs from 'dayjs'
import { getAirQuality } from './api'
import type { GetAirQualityParams } from './api'

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 查询参数
    apiParams?: GetAirQualityParams
    // dateType 时间维度
    timeType?: 'hour' | 'day'
}>(), {
    apiParams: () => ({
        time: dayjs().valueOf(),
        gridCode: '01010000',
        gridLevelNickName: 'city'
    }),
    timeType: 'hour'
})

/**
 * 定义 emits
 */
// defineEmits({})

/**
 * className 前缀
 */
const clsfix = 'dv-aims-air-quality-realtime'

/**
 * 主体内容相关
 */
// 无数据颜色
const noDataColor = 'var(--dv-color-text-secondary)'
// 实时空气质量数据 默认无数据
const realtimeData = reactive({
    aqiVal: '--',
    aqiColor: noDataColor,
    aqiPollutionZh: '--',
    firstPollution: '--',
    dataTime: '--',
    factorList: BASE_FACTOR.filter(item => item.code !== 'aqi').map(
        (item) => {
            return {
                name: item.name,
                code: item.code,
                key: item.key,
                value: '--',
                color: noDataColor,
            }
        }
    ),
})

// 请求数据
const fetchData = () => {
    getAirQuality(props.apiParams).then((res) => {
        if (res.data) {
            realtimeData.dataTime = res.data.time
            const rawData = res.data.list && res.data.list[0] ? res.data.list[0] : null
            if (rawData) {
                realtimeData.aqiVal = String(props.timeType === 'hour' ? rawData.realAQI : rawData.dayAQI)
                const level = factorToLevel('aqi', realtimeData.aqiVal, props.timeType)
                realtimeData.aqiColor = level >= 0 ? factorToColor('aqi', realtimeData.aqiVal, props.timeType) : noDataColor
                realtimeData.aqiPollutionZh = level >= 0 ? FACTOR_LEVEL_TEXT[level].label : '--'
                if (realtimeData.aqiPollutionZh !== '--' && realtimeData.aqiPollutionZh.length > 1)
                    realtimeData.aqiPollutionZh = `${realtimeData.aqiPollutionZh}污染`
                realtimeData.firstPollution = props.timeType === 'hour' ? rawData.realPollution : rawData.dayPollution
                realtimeData.factorList = realtimeData.factorList.map((item) => {
                    const obj = rawData.concTrend.find(c => c.factorCode === item.code)
                    const value = props.timeType === 'hour' ? obj?.realFactorValue : obj?.dayFactorValue
                    return {
                        ...item,
                        value: value || '--',
                        color: value && value !== '--' ? factorToColor(item.code, value, props.timeType) : noDataColor
                    }
                })
            }
        }
    })
}
onMounted(() => {
    fetchData()
})
watch([() => props.apiParams, () => props.timeType], () => {
    fetchData()
})
</script>

<style lang="scss">
@import "./style/index";
</style>
