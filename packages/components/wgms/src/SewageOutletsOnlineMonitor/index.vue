<!--
 * @Author: mjh
 * @Date: 2023-07-12 09:59:04
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-15 08:58:53
 * @Description:
-->
<template>
    <div class="dv-wgms-outlet-online">
        <div class="toggle-list dv-wgms-flex-between-center">
            <div v-for="item, index in toggleList" :key="index" :class="activeIndex === index ? 'active' : ''" class="list-one dv-wgms-flex-center-center" @click="changeList(index)">
                {{ item.label }}
            </div>
        </div>
        <div class="chart-content dv-wgms-flex-between-center">
            <div class="left">
                <div class="total">
                    <span>总数：</span>
                    <span>{{ total }}</span>
                </div>
                <div ref="pieChart" class="pie-chart" />
            </div>
            <div class="legend">
                <div v-for="item, index in optionData" :key="index" class="legend-one dv-wgms-flex-between-center">
                    <div class="left-c dv-wgms-flex-left-center">
                        <div class="circle" :style="{ background: colorArr[index] }" />
                        <div class="name">
                            {{ item.name }}
                        </div>
                    </div>
                    <div class="righ-c dv-wgms-flex-left-center">
                        <div class="num">
                            {{ item.value }}
                        </div>
                        <div class="split">
                            /
                        </div>
                        <div class="rate">
                            {{ (item.value / total * 100).toFixed(2) }}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import 'echarts-gl'
import echarts from '../../utils/echarts'
import { getPie3D } from '../../utils/echarts/3dChartOptions'
import { getOutletsOnlineData } from './api'
import type { OUTLETS_ONLINE_RES } from './api/types'
const props = withDefaults(defineProps<{
    params: {
        regionCode: string
    }
    colorArr: string[]
    isLazy: boolean
}>(), {
    params: () => {
        return {
            regionCode: '3301'
        }
    },
    colorArr: () => {
        return ['#F84439', '#FDBD00', '#15F3A3', '#00DEFF', '#1976D2', '#F2BE32', '#00E87E']
    },
    isLazy: false

})
const wgmsData = reactive({
    toggleList: [
        { label: '入河排污口', value: '0' },
        { label: '入海排污口', value: '1' }
    ],
    activeIndex: 0,
    total: 0,
    optionData: [] as OUTLETS_ONLINE_RES.DataResponse['outletOnlineDetailList']
})
const pieChart = ref()
onMounted(async () => {
    !props.isLazy && getResData()
})

watch([() => props.params, () => props.isLazy], () => {
    !props.isLazy && getResData()
}, { deep: true })

const getResData = async () => {
    const { data: res } = await getOutletsOnlineData({
        ...props.params,
        outletType: wgmsData.toggleList[wgmsData.activeIndex].value as '0' | '1'
    })
    if (res) {
        wgmsData.total = res.total
        if (res.outletOnlineDetailList && res.outletOnlineDetailList.length) {
            wgmsData.optionData = res.outletOnlineDetailList.map((item) => {
                return {
                    ...item,
                    value: item.onlineCount,
                }
            })
            console.log(wgmsData.optionData, 'dffffg')
            await nextTick()
            initChart()
        }
    }
}
const initChart = () => {
    const pieHeight = wgmsData.optionData.length && wgmsData.optionData.length === 1 ? 1.8 : 15
    const options = getPie3D(wgmsData.optionData as any, props.colorArr, 0.6, 185, 38, pieHeight, 0.5)
    echarts.draw(pieChart.value, options)
}
const changeList = (index: number) => {
    wgmsData.activeIndex = index
    getResData()
}
const {
    toggleList,
    activeIndex,
    total,
    optionData,
} = toRefs(wgmsData)
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./index";
</style>
