<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-15 09:19:01
 * @Description: 水质类别
-->
<template>
    <div class="dv-wgms-water-category">
        <div ref="chartPie" class="chart-pie">
            <BaseECharts :options="option" />
        </div>
        <!-- 自定义图例 -->
        <div class="section-water-quality-lengend">
            <div v-for="item in list" :key="item.waterQuality" class="lengend-item">
                <span class="icon" :style="{ background: item.waterQualityColor }" />
                <span class="name">{{ item.waterQuality }}</span>
                <div class="flex-num">
                    <span class="num">{{ item.count === null ? '--' : item.count }}</span>
                    <span class="split">/</span>
                    <span class="percent">{{ item.percent === null ? '--' : `${item.percent}%` }}</span>
                </div>
                <span class="text">同比</span>
                <span class="compare" :style="{ color: item.yoyPercent === null ? '--' : item.yoyPercent > 0 ? 'var(--dv-color-success)' : (item.yoyPercent < 0 ? 'var(--dv-color-danger)' : 'var(--dv-color-index)') }">{{ item.yoyPercent === null ? '--' : `${Math.abs(item.yoyPercent)}%` }}</span>
                <div class="arrow-compare">
                    <CommonArrow v-if="item.yoyPercent !== null" :direction="item.yoyPercent > 0 ? 'up' : item.yoyPercent < 0 ? 'down' : 'flat'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import dayjs from 'dayjs'
import { sumBy } from 'lodash-es'
import CommonArrow from '../common/common-arrow.vue'
import { pieChartOptions } from '../../utils/echarts/echartsOptions'
import BaseECharts from '../../utils/echarts/BaseECharts.vue'
import { getWaterQualityData } from './api/index'
import type { WATER_QUALITY_PERCENT_RES } from './api/types'

const props = withDefaults(defineProps<{
    params: WATER_QUALITY_PERCENT_RES.ParamsRequest
    data: WATER_QUALITY_PERCENT_RES.DataResponse[]
    isLazy: boolean
}>(), {
    params: () => {
        return {
            controlLevel: '001',
            treeId: '3301',
            startTime: dayjs().startOf('year').valueOf(),
            endTime: dayjs().endOf('year').valueOf(),
            timeType: 'day'
        }
    },
    data: () => {
        return []
    },
    isLazy: false

})

const chartPie = ref()
const option = ref<any>(undefined)
const wgmsData = reactive({
    list: [] as WATER_QUALITY_PERCENT_RES.DataResponse[]
})
onMounted(() => {
    !props.isLazy && getResData()
})

const getResData = async () => {
    if (props.data && props.data.length) {
        wgmsData.list = props.data
        await nextTick()
        loadChart(wgmsData.list)
        return
    }
    const { data: res } = await getWaterQualityData(props.params)
    res && (wgmsData.list = res)
    await nextTick()
    loadChart(wgmsData.list)
}
const loadChart = (list: WATER_QUALITY_PERCENT_RES.DataResponse[]) => {
    const seriesData = list.map((item) => {
        return {
            name: item.waterQuality,
            value: item.count
        }
    })
    const colorList = list.map((item) => {
        return item.waterQualityColor
    })
    const total = sumBy(list, (o: WATER_QUALITY_PERCENT_RES.DataResponse) => { return o.count })
    option.value = pieChartOptions(seriesData, colorList, total)
}

watch([() => props.params, () => props.data, () => props.isLazy], () => {
    !props.isLazy && getResData()
}, { deep: true })

defineExpose({
    reload: getResData
})
const {
    list
} = toRefs(wgmsData)
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>

