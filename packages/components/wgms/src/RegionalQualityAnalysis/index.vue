<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 14:53:14
 * @Description: 水质-雨量-水位趋势对比图
-->
<template>
    <div class="dv-wgms-regional-quality-analysis">
        <popupTable :option="option" :data="tableData" :header-line-style="{ padding: 0 }" :line-style="{ padding: 0, height: '32px' }">
            <template #changePercent="scope">
                <span style="margin-right: 4px;" :class="classObj[scope.row.type]">{{ scope.row.changePercent }}</span>
                <img v-if="scope.row.type === '-1'" src="./images/-1.svg" alt="">
                <img v-if="scope.row.type === '1'" src="./images/1.svg" alt="">
                <img v-if="scope.row.type === '0'" src="./images/0.svg" alt="">
            </template>
        </popupTable>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import popupTable from '../common/popup-table.vue'
import { synthesisIndex } from './api'
import type { REGIONAL_QUALITY_ANALYSIS_API_REQUEST, REGIONAL_QUALITY_ANALYSIS_API_RESPONSE } from './api/types'

type PropStatic = REGIONAL_QUALITY_ANALYSIS_API_REQUEST.synthesisIndex
    & {
        data: (REGIONAL_QUALITY_ANALYSIS_API_RESPONSE.synthesisIndex & { index: number; type: string })[]
        isLazy: boolean
    }

const props = withDefaults(defineProps<PropStatic>(), {
    treeId: '3301',
    treeType: 1,
    year: '2023'
})
const option = [
    { label: '排名', key: 'index', flex: 0.6, class: 'table-number' },
    { label: '区域', key: 'regionName', flex: 1.4 },
    { label: '本期', key: 'currentPeriod', class: 'table-number' },
    { label: '同期', key: 'yoyPeriod', class: 'table-number' },
    { label: '变化率', key: 'changePercent', class: 'table-number' },
]
const classObj: Record<string, any> = {
    '1': 'up-num',
    '-1': 'down-num',
    '0': 'same-num',
}
const tableData = ref<PropStatic['data']>([])

const getData = async () => {
    const params = {
        ...props
    }
    const { data } = await synthesisIndex(params)
    tableData.value = (data || []).map((item, index) => {
        const { changePercent } = item
        return {
            index: index + 1,
            type: changePercent > 0 ? '1' : changePercent < 0 ? '-1' : '0',
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
