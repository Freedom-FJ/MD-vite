<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: admin
 * @LastEditTime: 2023-07-27 09:52:53
 * @Description: 辅助研判
-->
<template>
    <div class="dv-wgms-auxiliary-judgment">
        <div class="conclusion-box">
            <div v-for="(item, index) in resultData" :key="index" class="conclusion-text">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { onMounted, reactive, toRefs, watch } from 'vue'
import { analysisResult } from './api'
const props = defineProps({
    startTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    endTime: {
        type: Number,
        default: dayjs().endOf('year').valueOf()
    },
    factorId: {
        type: Number,
        default: 27
    },
    siteCode: {
        type: String,
        default: ''
    },
    timeType: {
        type: String,
        default: 'hour'
    },
    // 经纬度
    latitude: {
        type: [Number, String],
        default: 30.3992
    },
    // 经纬度
    longitude: {
        type: [Number, String],
        default: 119.9681
    }
})
const data = reactive({
    resultData: [] as string[], // 研判结论返回
    params: {
        endTime: 1656691200000,
        factorId: 27,
        latitude: 30.3992,
        longitude: 119.9681,
        siteCode: 'GKA330100_2009',
        startTime: 1653926400000,
        timeType: 'hour'
    } as any
})
/**
 * @name: getConclusion
 * @test: test font
 * @msg: 结论
 * @return {*}
 */
const getConclusion = () => {
    analysisResult(data.params).then((res) => {
        data.resultData = res?.data ?? []
    })
}
/**
 * @name: initData
 * @test: test font
 * @msg: 初始化数据
 * @return {*}
 */
const initData = () => {
    data.params = {
        startTime: props?.startTime,
        endTime: props?.endTime,
        factorId: props?.factorId,
        siteCode: props?.siteCode,
        timeType: props?.timeType,
        latitude: props?.latitude,
        longitude: props?.longitude,
    }
    getConclusion()
}
// 监听参数变化
watch(() => [props.startTime, props.endTime, props.factorId, props.siteCode, props.latitude, props.longitude, props.timeType], () => {
    initData()
}, { deep: true })
onMounted(async () => {
    initData()
})
const { params, resultData } = toRefs(data)
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
