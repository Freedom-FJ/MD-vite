<template>
    <div :class="`${clsfix}-container`">
        <div :class="`${clsfix}-top`">
            <div :class="`${clsfix}-top-item`">
                <div class="title">
                    实时AQI
                </div>
                <div class="aqi-container">
                    <div class="aqiValue" :style="{ color: realtimeData.hourColor }">
                        {{ realtimeData.hourV }}
                    </div>
                    <div class="aqiInfo">
                        <span class="pollution-zh" :style="{ color: realtimeData.hourColor }">{{
                            realtimeData.hourPollutionZh }}
                        </span>
                        <div class="main">
                            <span class="text">首污</span>
                            <span
                                class="value" :style="{
                                    color:
                                        realtimeData.hourMainPollutants === '--'
                                            ? noDataColor
                                            : undefined,
                                }"
                            >{{ realtimeData.hourMainPollutants }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="`${clsfix}-top-item`">
                <div class="title">
                    今日AQI
                </div>
                <div class="aqi-container">
                    <div class="aqiValue" :style="{ color: realtimeData.dayColor }">
                        {{ realtimeData.dayV }}
                    </div>
                    <div class="aqiInfo">
                        <span class="pollution-zh" :style="{ color: realtimeData.dayColor }">{{ realtimeData.dayPollutionZh
                        }}
                        </span>
                        <div class="main">
                            <span class="text">首污</span>
                            <span
                                class="value" :style="{
                                    color:
                                        realtimeData.dayMainPollutants === '--'
                                            ? noDataColor
                                            : undefined,
                                }"
                            >{{ realtimeData.dayMainPollutants }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="`${clsfix}-center`">
            <span>污染物浓度</span>
            <span>（ 单位：μg/m³, CO：mg/m³ ）</span>
        </div>
        <ul :class="`${clsfix}-bottom`">
            <li class="bottom-left-title">
                <span>实时</span>
                <span>今日</span>
            </li>
            <li v-for="item in realtimeData.factorList" :key="item.code" :class="`${clsfix}-bottom-item`">
                <span class="name">{{ item.name }}</span>
                <span class="value" :style="{ color: item.hourColor }">{{
                    item.hourV
                }}</span>
                <span class="line" :style="{ backgroundColor: item.hourColor }" />
                <span class="value" :style="{ color: item.dayColor }">{{
                    item.dayV
                }}</span>
                <span class="line" :style="{ backgroundColor: item.dayColor, marginBottom: 0 }" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { BASE_FACTOR, factorToColor, factorToLevel } from 'fpi-tg-factor-tools'
import dayjs from 'dayjs'
import { getAirQuality } from './api'
import type { GetAirQualityParams } from './api'

/**
 * 定义props
 */
const props = withDefaults(
    defineProps<{
        // 查询参数
        apiParams?: Pick<GetAirQualityParams, 'gridCode' | 'time'>
    }>(),
    {
        apiParams: () => ({
            time: dayjs().subtract(2, 'h').valueOf(),
            gridCode: '0101000000',
        }),
    }
)

/**
 * 定义 emits
 */
// defineEmits({})

/**
 * className 前缀
 */
const clsfix = 'dv-aims-air-quality-realtime-and-day'

/**
 * 主体内容相关
 */
// 无数据颜色
const noDataColor = 'var(--dv-color-text-secondary)'
// 实时空气质量数据 默认无数据
const realtimeData = reactive({
    hourV: '--',
    hourColor: noDataColor,
    hourPollutionZh: '--',
    hourMainPollutants: '--',
    dayV: '--',
    dayColor: noDataColor,
    dayPollutionZh: '--',
    dayMainPollutants: '--',
    factorList: BASE_FACTOR.filter(item => item.code !== 'aqi').map(
        (item) => {
            return {
                name: item.name,
                code: item.code,
                key: item.key,
                hourV: '--',
                hourColor: noDataColor,
                dayV: '--',
                dayColor: noDataColor,
            }
        }
    ),
})
// 请求数据
const fetchData = () => {
    const p1 = getAirQuality({ ...props.apiParams, timeType: 'hour' })
    const p2 = getAirQuality({ ...props.apiParams, timeType: 'day' })
    Promise.all([p1, p2]).then((res) => {
        let hourData: any = null
        let dayData: any = null
        let factorList = realtimeData.factorList
        if (res[0] && res[0].data) {
            const data = res[0].data
            const level = factorToLevel('aqi', data.aqi, 'hour')
            hourData = {
                hourV: data.aqi,
                hourColor:
                    level >= 0
                        ? factorToColor('aqi', data.aqi, 'hour')
                        : noDataColor,
                hourPollutionZh: data.airQuality,
                hourMainPollutants: data.mainPollutants,
            }
            factorList = factorList.map((item) => {
                const obj = data.commonFactors.find(
                    c => c.key === item.key
                )
                return {
                    ...item,
                    hourV: obj?.value ? obj.value : '--',
                    hourColor: obj && obj.value && obj.value !== '--'
                        ? factorToColor(item.code, obj.value, 'hour')
                        : noDataColor,
                }
            })
        }
        if (res[1] && res[1].data) {
            const data = res[1].data
            const level = factorToLevel('aqi', data.aqi, 'day')
            dayData = {
                dayV: data.aqi,
                dayColor:
                    level >= 0
                        ? factorToColor('aqi', data.aqi, 'day')
                        : noDataColor,
                dayPollutionZh: data.airQuality,
                dayMainPollutants: data.mainPollutants,
            }
            factorList = factorList.map((item) => {
                const obj = data.commonFactors.find(
                    c => c.key === item.key
                )
                return {
                    ...item,
                    dayV: obj?.value ? obj.value : '--',
                    dayColor: obj && obj.value && obj.value !== '--'
                        ? factorToColor(item.code, obj.value, 'day')
                        : noDataColor,
                }
            })
        }

        Object.assign(realtimeData, hourData, dayData, { factorList, })
    })
}
onMounted(() => {
    fetchData()
})
watch(
    () => props.apiParams,
    () => {
        fetchData()
    }
)
</script>

<style lang="scss">
@import "./style/index";
</style>
