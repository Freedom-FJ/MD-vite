<!--
 * @Author: mjh
 * @Date: 2023-07-05 17:13:59
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-18 19:08:11
 * @Description:
-->
<template>
    <div :class="`${className}-container`">
        <div v-for="item in list" :key="item.name" :class="`${className}-list`">
            <span class="condition">{{ item.name }}</span>
            <img :src="isDark ? item.backgroundUrl : item.whiteBackgroundUrl" :class="{ white: !isDark }">
            <span class="condition-value">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { onMounted, ref, watch } from 'vue'
import { useThemeHook } from '../../../utils'
import { getAirQuality } from './api'
import type { GetAirQualityParams } from './api'
import wind_direction from './images/wind_direction.svg'
import wind_speed from './images/wind_speed.svg'
import temperature from './images/temperature.svg'
import pressure from './images/pressure.svg'
import humidity from './images/humidity.svg'
import precipitation from './images/precipitation.svg'
import white_wind_direction from './images/white_wind_direction.svg'
import white_humidity from './images/white_humidity.svg'
import white_precipitation from './images/white_precipitation.svg'
import white_pressure from './images/white_pressure.svg'
import white_temperature from './images/white_temperature.svg'
import white_wind_speed from './images/white_wind_speed.svg'
/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 查询参数
    apiParams?: GetAirQualityParams
}>(), {
    apiParams: () => ({
        time: dayjs().subtract(1, 'h').valueOf(),
        gridCode: '0101000000',
        timeType: 'hour'
    }),
})

const { isDark } = useThemeHook()

const className = 'dv-aims-weather-condition'
// 列表数据
const list = ref([
    {
        name: '风向',
        value: '--',
        unit: '',
        key: 'windDirection',
        backgroundUrl: wind_direction,
        whiteBackgroundUrl: white_wind_direction,
    },
    {
        name: '风级',
        value: '--',
        unit: '--',
        key: 'windScale',
        backgroundUrl: wind_speed,
        whiteBackgroundUrl: white_wind_speed,
    },
    {
        name: '温度',
        value: '--',
        unit: '°C',
        key: 'temperature',
        backgroundUrl: temperature,
        whiteBackgroundUrl: white_temperature,
    },
    {
        name: '气压',
        value: '--',
        unit: 'hPa',
        key: 'pres',
        backgroundUrl: pressure,
        whiteBackgroundUrl: white_pressure,
    },
    {
        name: '湿度',
        value: '--',
        unit: '%',
        key: 'humidity',
        backgroundUrl: humidity,
        whiteBackgroundUrl: white_humidity,
    },
    {
        name: '降水量',
        value: '--',
        unit: 'mm',
        key: 'rain',
        backgroundUrl: precipitation,
        whiteBackgroundUrl: white_precipitation,
    },
])
// 请求数据
const fetchData = () => {
    getAirQuality(props.apiParams).then((res) => {
        if (res.data) {
            const data = res.data
            list.value = list.value.map((item) => {
                const obj = data.weatherFactors.find(c => c.key === item.key)
                return {
                    ...item,
                    unit: obj?.unit ? obj.unit : '--',
                    value: obj?.value ? obj.value : '--',
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
