<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 14:49:14
 * @Description: 水质-雨量-水位趋势对比图
-->
<template>
    <div class="dv-wgms-water-quality-regional-comprehensive" red="barBox">
        <BaseEcharts :options="options" />
    </div>
</template>

<script lang="ts" setup>
import { shallowRef, watch } from 'vue'
import BaseEcharts from '../../utils/echarts/BaseECharts.vue'
import { comprehensiveWaterQualityOption } from '../../utils/echarts/echartsOptions'
import { synthesisIndexChange } from './api'
import type { WATER_QUALITY_REGIONAL_API_REQUEST } from './api/types'

type PropStatic = WATER_QUALITY_REGIONAL_API_REQUEST.synthesisIndexChange
    & {
        isLazy: boolean
    }

const props = withDefaults(defineProps<PropStatic>(), {
    treeId: '3301',
    treeType: 1,
    year: '2023',
    isLazy: false
})

const options = shallowRef()

const getData = async () => {
    const { data } = await synthesisIndexChange({ ...props })
    const yData: number[] = []
    const xData: string[] = []
    data?.forEach((item) => {
        yData.push(item.synthesisIndex)
        xData.push(item.time)
    })
    options.value = comprehensiveWaterQualityOption(xData, yData)
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
