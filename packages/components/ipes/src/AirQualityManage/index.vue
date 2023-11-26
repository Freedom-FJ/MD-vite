<template>
    <div class="dv-ipes-real-timeAir-quality-manage">
        <RealTimeAir :air-quality-obj="airQualityObj" :height="height" :width="width" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import RealTimeAir from '../common/RealTimeAir.vue'
import request from '../../service/request'
import type { AirQuality } from './type'

const props = withDefaults(defineProps<{
    width?: number | string
    height?: number | string
}>(), {
    width: '100%',
    height: 96,

})

const airQualityObj = ref<AirQuality>({
    time: '',
    aqiValue: null,
    aqiColor: '',
    aqiLevel: '',
    mainPolluter: '',
})

// 获取数据
async function getAqmsManage() {
    try {
        const res = await request({
            method: 'get',
            url: '/ipes-data-aggregation-server/api/v1/env-protection/aqms-manage',
        })
        const {
            aqiValue,
            aqiColor,
            aqiLevel,
            mainPolluter,
            time,
        } = res.data as AirQuality

        airQualityObj.value = {
            aqiValue,
            aqiColor,
            aqiLevel,
            mainPolluter,
            time,
        }
    }
    catch (error) {
        console.log(error)
    }
}
getAqmsManage()
</script>

<script lang="ts">
export default {
    name: 'DvIpesAirQualityManage',
    title: '空气质量管理',
}
</script>
