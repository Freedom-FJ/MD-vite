<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 14:55:11
 * @Description: 水质-雨量-水位趋势对比图
-->
<template>
    <div class="dv-wgms-water-quality">
        <!-- 地表水 -->
        <div v-for="item, index in list" :key="index">
            <div class="dv-wgms-top-box dv-wgms-mb-12">
                <div class="dv-wgms-left-box">
                    <div class="left-title">
                        {{ item.stationTypeName }}
                    </div>
                    <div class="dv-wgms-water-bg">
                        <span>{{ item.total }}</span>
                    </div>
                </div>
                <div class="dv-wgms-right-box">
                    <div class="dv-wgms-top-text">
                        <span class="dv-body1">I-III类优良比例</span>
                        <span class="dv-number1">{{ item.excellentPercent }}%</span>
                    </div>
                    <div class="dv-wgms-mb-8">
                        <ProgressBar :percentage="item.excellentPercent" />
                    </div>
                    <div class="dv-wgms-flex-bw-c dv-body1">
                        <div>
                            <span class="dv-secondary dv-mr-4">目标</span>
                            <span class="dv-number1">{{ item.targetPercent }}%</span>
                        </div>
                        <div>
                            <span class="dv-secondary dv-mr-4">同比</span>
                            <span class="dv-mr-4 dv-number1 up-num" :style="{ color: getCompare(item.yoyPercent).color }">{{ item.yoyPercent }}%</span>
                            <span class="dv-mr-6 up-num" :style="{ color: getCompare(item.yoyPercent).color }">{{ getCompare(item.yoyPercent).label }}</span>
                            <img style="height: 12px;" :src="getCompare(item.yoyPercent).img" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="item.childList" class="dv-wgms-flex-bw-c dv-wgms-mb-12 dv-wgms-mt--4">
                <div v-for="child in item.childList" :key="child.stationTypeName" class="dv-wgms-item dv-wgms-flex-bw-c">
                    <div class="dv-body1">
                        {{ child.stationTypeName }}
                    </div>
                    <div class="right-value">
                        <span class="dv-mr-8 dv-number1 dv-index">{{ item.excellentPercent }}%</span>
                        <span class="dv-mr-2 dv-number1 dv-danger" :style="{ color: getCompare(item.yoyPercent).color }">{{ item.yoyPercent }}%</span>
                        <img style="height: 12px;" :src="getCompare(item.yoyPercent).img" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ProgressBar from '../common/ProgressBar.vue'
import { waterQualityStatus } from './api'
import up from './images/1.svg'
import down from './images/-1.svg'
import same from './images/0.svg'
import type { WATER_QUALITY_SITUATION_API_REQUEST, WATER_QUALITY_SITUATION_API_RESPONSE } from './api/types'

type PropStatic = WATER_QUALITY_SITUATION_API_REQUEST.waterQualityStatus
    & {
        data: WATER_QUALITY_SITUATION_API_RESPONSE.waterQualityStatus[]
        isLazy: boolean
    }

const props = withDefaults(defineProps<PropStatic>(), {
    treeId: '3301',
    treeType: 1,
    year: '2023',
    isLazy: false
})

const list = ref<PropStatic['data']>([])
const getCompare = computed(() => (yoy: number) => {
    if (yoy > 0) {
        return {
            label: '上升',
            img: up,
            color: 'var(--dv-color-success)'
        }
    }
    else if (yoy < 0) {
        return {
            label: '下降',
            img: down,
            color: 'var(--dv-color-danger)'
        }
    }

    return {
        label: '持平',
        img: same,
        color: 'var(--dv-color-index)'
    }
})

const getData = async () => {
    const params = {
        ...props
    }
    const { data } = await waterQualityStatus(params)
    list.value = data || []
}

watch([() => props.data, () => props.treeId, () => props.treeType, () => props.year, () => props.isLazy], () => {
    if (props.isLazy) return
    if (props.data) {
        list.value = props.data
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
