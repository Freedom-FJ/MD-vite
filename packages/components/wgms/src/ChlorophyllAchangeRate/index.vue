<!--  藻类研判分析：叶绿素a变化率  -->
<template>
    <div class="dv-wgms-chlorophyll-a-change-rate" :style="{ '--height': getHeight }">
        <div class="change-rate">
            <div v-for="(item, index) in list" :key="index" class="rate-one">
                <div class="value">
                    <span :style="{ color: Number(item.rate) > 0 ? 'var(--dv-color-danger)' : Number(item.rate) < 0 ? 'var(--dv-color-success)' : 'var(--dv-color-index)' }"> {{ item.rate }}%</span>
                </div>

                <div class="trend">
                    <img v-show="Number(item.rate)" alt="" :src="Number(item.rate) > 0 ? upImg : downImg">
                    <div v-show="!Number(item.rate)" style="height: 10px;" />
                </div>

                <img alt="" class="zao" src="./images/zao.png">

                <div class="label">
                    {{ item.label }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, toRefs, watch } from 'vue'
import { getChangeRateData } from './api'
import upImg from './images/up.png'
import downImg from './images/down.png'

const props = defineProps({
    height: {
        type: [String, Number],
        default: '200px'
    },
    type: {
        default: 'automatic', // 默认自动数据 manual（手工数据）
        type: String
    },
    // 时间类型
    timeType: {
        type: String,
        required: false // day
    },
    siteCode: {
        type: String,
        required: false // zaoleishougong
    },
    stationCode: {
        type: String,
        required: false, // w01016
    },
    startTime: {
        type: [String, Number],
        required: false // 1663257600000
    },
    endTime: {
        type: [String, Number],
        required: false // 1663257600000
    },
    data: {
        type: Object,
        required: false
    },
})

const state = reactive({
    list: [
        { label: '环比', rate: '' },
        { label: '同比', rate: '' },
        { label: '近24条数据\n变化率均值', rate: '' },
    ]
})

watch([
    () => props.type,
    () => props.timeType,
    () => props.siteCode,
    () => props.stationCode,
    () => props.startTime,
    () => props.endTime,
    () => props.data,
], () => {
    if (!props.data) {
        getData()
    }
    else {
        const res = props.data
        state.list[0].rate = res?.qoqPercent ?? '--'
        state.list[1].rate = res?.yoyPercent ?? '--'
        state.list[2].rate = res?.late24Percent ?? '--'
    }
}, { immediate: true })

/**
 * 获取数据
 */
async function getData() {
    const params = {
        timeType: props.timeType,
        siteCode: props.siteCode,
        stationCode: props.stationCode,
        endTime: props.endTime,
        startTime: props.startTime,
        dataType: props.type === 'automatic' ? 0 : 1, // 数据类型 自动/手工(0/1)
    }
    const res = await getChangeRateData(params)
    state.list[0].rate = res?.data?.qoqPercent ?? '--'
    state.list[1].rate = res?.data?.yoyPercent ?? '--'
    state.list[2].rate = res?.data?.late24Percent ?? '--'
}

/**
 * 获取宽度
 */
const getHeight = computed(() => {
    if (typeof props.height === 'string')
        return props.height
    else if (typeof props.height === 'number')
        return `${props.height}px`
    else
        return '100%'
})

const { list } = toRefs(state)
</script>

<style scoped lang="scss">
@import "../../styles/mixins";
@import "./style/index";
</style>
