<!--
 * @Author: mjh
 * @Date: 2023-08-11 12:16:33
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-11 14:12:45
 * @Description:
-->
<template>
    <div class="dv-ipes-real-time-air">
        <div class="real-title-box">
            <span class="real-title">实时空气质量</span>
            <span class="real-time">{{ airQualityObj.time }}</span>
        </div>
        <div class="pollute-div" :class="{ 'value-length': String(airQualityObj.aqiValue).length >= 3 }">
            <span class="real-number" :style="{ color: `${airQualityObj.aqiColor}` }">{{ airQualityObj.aqiValue }}</span>
            <div class="pollute-flex">
                <span class="factor-name">AQI</span><span class="factor-status" :style="{ color: `${airQualityObj.aqiColor}` }">{{ airQualityObj.aqiLevel || '--' }}</span>
            </div>
            <div class="first-pollute-flex">
                <span class="first-pollute">首要污染物</span>
                <div class="other-factore">
                    <el-tooltip class="item" effect="dark" :content="airQualityObj.mainPolluter" :disabled="String(airQualityObj.mainPolluter).length <= 10" placement="top">
                        <div class="text">
                            {{ airQualityObj.mainPolluter }}
                        </div>
                    </el-tooltip>
                </div>
            </div>
        </div>
        <LottieAnimation class="canvas-class" :width="width" :height="height" :url="cloudJson" />
    </div>
</template>

<script setup lang="ts">
import LottieAnimation from './LottieAnimation.vue'
import type { AirQuality } from './types'

const props = defineProps({
    width: {
        default: '100%',
        type: String as PropType<string | number>,
    },
    height: {
        default: 96,
        type: Number as PropType<string | number>,
    },
    lottieAnimationUrl: {
        default: '',
        type: String,
    },
    airQualityObj: {
        default: () => ({}),
        type: Object as PropType<AirQuality>,
    },
})

const cloud = new URL('./lottie/cloud.json', import.meta.url).href

const cloudJson = computed(() => {
    return props.lottieAnimationUrl || cloud
})
</script>

<script lang="ts">
export default {
    name: 'DvIpesRealTimeAir',
    title: '实时空气质量',
}
</script>

<style lang="scss">
@import "./style/RealTimeAir";
</style>
