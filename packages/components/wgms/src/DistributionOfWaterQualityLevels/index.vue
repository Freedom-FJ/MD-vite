<!--
 * @Author: Tian
 * @Date: 2023-08-24 15:06:48
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 17:21:12
 * @Description: 水质等级分布
-->
<template>
    <div class="dv-wgms-water-quality-level-list">
        <div v-for="item, index in levelList" :key="index" class="dv-wgms-water-quality-level-list-item">
            <div class="data-base" :class="isDark ? '' : 'light'">
                {{ item.percent === null ? '--' : `${item.percent}%` }}
            </div>
            <div class="line-value">
                <div class="text">
                    {{ item.levelName }}
                </div>
                <div class="value">
                    <span class="val">{{ item.count === null ? '--' : item.count }}</span>
                    <span class="split">/</span>
                    <span>{{ item.totalCount === null ? '--' : item.totalCount }}</span>
                </div>
            </div>
            <div class="line-compare">
                <div class="text">
                    环比
                </div>
                <div class="value dv-wgms-flex-left-center">
                    <span class="mgr4" :style="{ color: item.qoqPercent === null ? 'var(--dv-color-text-placeholder)' : item.qoqPercent > 0 ? 'var(--dv-color-success)' : item.qoqPercent < 0 ? 'var(--dv-color-danger)' : 'var(--dv-color-index)' }">{{ item.qoqPercent === null ? '--' : item.qoqPercent === 0 ? '持平' : `${item.qoqPercent}%` }}</span>
                    <common-arrow v-if="item.qoqPercent !== null" :direction="item.qoqPercent > 0 ? 'up' : item.qoqPercent < 0 ? 'down' : 'flat'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import commonArrow from '../common/common-arrow.vue'
import { useThemeHook } from '../../../utils'
import { waterQualityLevel } from './api'
import type { WATER_QUALITY_LEVEL_RES } from './api/types'
const props = defineProps({
    params: {
        type: Object as PropType<WATER_QUALITY_LEVEL_RES.ParamsRequest>,
        default: () => {
            return {
                treeId: 3301,
                treeType: 1,
                year: dayjs().format('YYYY')
            }
        }
    },
    data: {
        type: Array as PropType<WATER_QUALITY_LEVEL_RES.DataResponse[]>,
        default: () => []
    },
    isLazy: {
        type: Boolean,
        default: false
    }
})
const { isDark } = useThemeHook()
const levelList = ref<WATER_QUALITY_LEVEL_RES.DataResponse[]>()
const getResData = async () => {
    if (props.data && props.data.length) {
        levelList.value = props.data
        return
    }
    const { data: res } = await waterQualityLevel(props.params)
    res && (levelList.value = res)
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
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
