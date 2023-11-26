<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 14:45:12
 * @Description: 水质-雨量-水位趋势对比图
-->
<template>
    <div class="dv-wgms-station-water-quality-statistics">
        <popupTable :option="option" :data="tableData" :header-line-style="{ padding: 0 }" :line-style="{ padding: 0, height: '32px' }">
            <template #level="scope">
                <span class="tab-item" :style="{ background: scope.row.levelColor }">{{ scope.row.levelName }}</span>
            </template>
            <template #target="scope">
                <span class="tab-item" :style="{ background: scope.row.targetColor }">{{ scope.row.targetName }}</span>
            </template>
            <template #yoyLevel="scope">
                <span class="tab-item" :style="{ background: scope.row.yoyLevelColor }">{{ scope.row.yoyLevelName }}</span>
            </template>
        </popupTable>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import popupTable from '../common/popup-table.vue'
import { waterQualityStatistic } from './api'
import type { STATION_WATER_QUALITY_STATISTICS_API_REQUEST, STATION_WATER_QUALITY_STATISTICS_API_RESPONSE } from './api/types'

type PropStatic = STATION_WATER_QUALITY_STATISTICS_API_REQUEST.waterQualityStatistic
    & {
        data: (STATION_WATER_QUALITY_STATISTICS_API_RESPONSE.waterQualityStatistic & { index: number })[]
        isLazy: boolean
    }
const props = withDefaults(defineProps<PropStatic>(), {
    treeId: '3301',
    treeType: 1,
    year: '2023',
    isLazy: false
})

const option = ref([
    { label: '排名', key: 'index', flex: 0.6, class: 'table-number' },
    { label: '站点', key: 'siteName', flex: 1.4 },
    { label: '数据时间', key: 'dataTime', class: 'table-number' },
    { label: '水质类别', key: 'level', class: 'table-number' },
    { label: '水质目标', key: 'target', class: 'table-number' },
    { label: '同期水质', key: 'yoyLevel', class: 'table-number' },
])

const tableData = ref<PropStatic['data']>([])

const getData = async () => {
    const params = {
        ...props
    }
    const { data } = await waterQualityStatistic(params)
    tableData.value = (data || []).map((item, index) => {
        return {
            index: index + 1,
            ...item
        }
    })
}

watch([() => props.data, () => props.treeId, () => props.treeType, () => props.year, () => props.isLazy], () => {
    if (props.isLazy) return
    if (props.data) {
        tableData.value = props.data
        return
    }
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
