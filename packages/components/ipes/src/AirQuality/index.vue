<template>
    <div class="dv-ipes-air-quality">
        <div class="year-air-quality">
            <div v-for="(item, index) in factorList" :key="index" class="table-col-body">
                <div class="row-body1">
                    {{ item.NAME }}
                </div>
                <div class="row-body2" :style="{ color: item.color }">
                    {{ item.factorValue }}
                </div>
                <div class="row-body3">
                    {{ item.UNIT }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import request from '../../service/request'
import type { AirQuality, Factor } from './type'

withDefaults(defineProps<{
    width?: number | string
    height?: number | string
}>(), {
    width: '100%',
    height: 96,
})

const lottieAnimationUrl = new URL('./lottie/cloud.json', import.meta.url).href

const factorList = ref<Factor[]>([])
// 获取数据
async function getAqmsManage() {
    try {
        const res = await request({
            method: 'get',
            url: '/ipes-monitor-server/api/v2/special-analysis/aqms/area-aqi-real-data',
        })
        const {
            factor
        } = res.data as AirQuality

        factorList.value = factor.map((item: Factor) => {
            const { NAME, color, factorValue, UNIT } = item
            return {
                NAME,
                factorValue,
                UNIT,
                color,
            }
        }) as Factor[]
    }
    catch (error) {
        console.log(error)
    }
}
getAqmsManage()
</script>

<script lang="ts">
export default {
    name: 'DvIpesAirQuality',
    title: '空气质量'
}
</script>

<style lang="scss">
@import "./style/index";
</style>
