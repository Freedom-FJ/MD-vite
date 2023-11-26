<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 17:30:52
 * @Description: 水质状况
-->
<template>
    <div class="dv-wgms-water-quality">
        <div v-for="item, index in list" :key="index" class="dv-wgms-water-quality-status">
            <div class="dv-wgms-water-quality-status-top dv-wgms-flex-between-center">
                <div class="dv-wgms-label">
                    {{ item.name }}
                </div>
                <div class="dv-wgms-rate">
                    {{ item.reachStandardRate === null ? '--' : `${item.reachStandardRate}%` }}
                </div>
            </div>
            <ProgressBar :percentage="item.reachStandardRate === null ? 0 : item.reachStandardRate" />
            <div class="dv-wgms-water-quality-status-bottom dv-wgms-flex-between-center">
                <div class="dv-wgms-target">
                    <span class="dv-wgms-text">目标</span>
                    <span class="dv-wgms-value">{{ item.target === null ? '--' : `${item.target}%` }}</span>
                </div>
                <div class="dv-wgms-same flex-left-center">
                    <span class="dv-wgms-text">同比</span>
                    <span :style="{ color: item.yoy === null ? 'var(--dv-color-text-placeholder)' : item.yoy > 0 ? 'var(--dv-color-success)' : item.yoy < 0 ? 'var(--dv-color-danger)' : 'var(--dv-color-index)' }" class="dv-wgms-value">{{ item.yoy === null ? '--' : item.yoy === 0 ? '持平' : `${item.yoy}%` }}</span>
                    <CommonArrow v-if="item.yoy !== null" :direction="item.yoy > 0 ? 'up' : item.yoy < 0 ? 'down' : 'flat'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import dayjs from 'dayjs'
import ProgressBar from '../common/ProgressBar.vue'
import CommonArrow from '../common/common-arrow.vue'
import { getReachStandardData } from './api/index'
import type { REACH_STANDARD_RES } from './api/types'
const props = withDefaults(defineProps<{
    params: REACH_STANDARD_RES.ParamsRequest
    data: REACH_STANDARD_RES.DataResponse[]
    isLazy: boolean
}>(), {
    params: () => {
        return {
            regionCode: 3301,
            startTime: dayjs().startOf('year').valueOf(),
            endTime: dayjs().endOf('year').valueOf()
        }
    },
    data: () => {
        return []
    },
    isLazy: false

})
const wgmsData = reactive({
    list: [] as REACH_STANDARD_RES.DataResponse[]
})
const getResData = async () => {
    if (props.data && props.data.length) {
        wgmsData.list = props.data
        return
    }
    const { data: res } = await getReachStandardData(props.params)
    res && (wgmsData.list = res)
}

onMounted(() => {
    !props.isLazy && getResData()
})

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
