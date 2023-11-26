<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 14:51:16
 * @Description: 水质-雨量-水位趋势对比图
-->
<template>
    <div class="dv-wgms-water-quality-states-analysis" red="barBox">
        <BaseEcharts :options="options" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, shallowRef } from 'vue'
import BaseEcharts from '../../utils/echarts/BaseECharts.vue'
import { getDizhouQualityAnalysisOption } from '../../utils/echarts/echartsOptions'
import { waterQualityAnalyze } from './api'
import type { WATER_QUALITY_STATES_ANALYSIS_API_REQUEST } from './api/types'

type PropStatic = WATER_QUALITY_STATES_ANALYSIS_API_REQUEST.waterQualityAnalyze
    & {
        isLazy: boolean
    }

const props = withDefaults(defineProps<PropStatic>(), {
    treeId: '3301',
    treeType: 1,
    year: '2023'
})
const options = shallowRef()

const getData = async () => {
    const { data } = await waterQualityAnalyze({ ...props })
    const xData: string[] = []
    const goodList: number[] = []
    const badList: number[] = []
    data?.forEach((item) => {
        xData.push(item.regionName)
        goodList.push(item.excellentPercent)
        badList.push(item.minorVPercent)
    })
    options.value = getDizhouQualityAnalysisOption(xData, goodList, badList)
}

watch([() => props.treeId, () => props.treeType, () => props.year, () => props.isLazy], () => {
    if (props.isLazy) return
    getData()
}, { immediate: true })

defineExpose({
    reload: getData
})
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
