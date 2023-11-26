<!--
 * @Author: mjh
 * @Date: 2023-08-25 10:34:24
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-25 14:47:25
 * @Description:
-->
<template>
    <div class="container-layout">
        <staticMap :map-img="mapImg" />
        <div class="container-bg" :style="{ 'background-image': `url(${bgImg})` }" />
        <panelSide v-model="leftData" :is-show-components="isShowComponents" :style="`transform: scale(${scaleNum}); height: ${85 / scaleNum}%`" class="scale-left" @check-pop="isShowPop = true" />
        <panelSide v-model="rightData" :is-show-components="isShowComponents" :style="`transform: scale(${scaleNum});height: ${85 / scaleNum}%`" class="scale-right" side="right" @check-pop="isShowPop = true" />
        <popLayout v-show="isShowPop" class="scale-left" :scale-num="scaleNum" :is-show-components="isShowComponents" :style="`transform: scale(${scaleNum})`" @close="isShowPop = false" />
        <!-- <div class="title-layout scale-center" :style="`transform: translateX(-50%) scale(${scaleNum}) `">
            {{ title }}
        </div> -->
    </div>
</template>

<script setup lang="ts">
// import { downloadZip } from './down.js'
import type { PanelOption } from '../../../types/panel'
import panelSide from '../../../components/panel-side.vue'
import { useThemeStore } from '../../../store/theme'
import popLayout from './pop-layout.vue'
import staticMap from './static-map.vue'

defineProps({
    scaleNum: {
        type: Number,
        default: 1
    },
    isShowComponents: {
        type: Boolean,
        default: false
    }
})
const themeStore = useThemeStore()
const isShowPop = ref(false)
const bgImg = computed(() => {
    return themeStore.getCurrTheme.layoutPanel.img
})

const mapImg = computed(() => {
    return themeStore.getCurrTheme.layoutPanel.mapImg
})

const title = computed(() => {
    return themeStore.getCurrTheme.title
})

const leftData = ref<PanelOption>({
    midDistance: 12,
    top: 96,
    left: 40,
    id: 1,
    panelLine: [
        {
            type: 'column',
            id: 2,
            panelList: [
                {
                    id: 3,
                    title: '藻类研判分析：叶绿素a变化率',
                    height: 250,
                    type: 'wgms',
                    component: 'DvWgmsChlorophyllAChangeRate'
                }
            ]
        },
        {
            type: 'column',
            id: 4,
            panelList: [
                {
                    id: 5,
                    title: '断面相关性系数排名及最近报警统计',
                    height: 250,
                    type: 'wgms',
                    component: 'DvWgmsCrossSectionCorrelation'
                }
            ]
        },
        {
            type: 'column',
            id: 6,
            panelList: [
                {
                    id: 7,
                    title: '饮用水源地达标率',
                    height: 250,
                    type: 'wgms',
                    component: 'DvWgmsRegionalQualityAnalysis'
                }
            ]
        },
        {
            type: 'column',
            id: 8,
            panelList: [
                {
                    id: 9,
                    title: '站点因k线与日变化',
                    height: 250,
                    type: 'wgms',
                    component: 'DvWgmsSevenDayKline'
                }
            ]
        }
    ]
})

const rightData = ref<PanelOption>({
    midDistance: 12,
    top: 96,
    right: 40,
    id: 10,
    panelLine: [
        {
            type: 'column',
            id: 11,
            panelList: [
                {
                    id: 12,
                    title: '年度主要污染物占比',
                    height: 338,
                    type: 'aims',
                    component: 'DvAimsMainPollutionYearRatio2'
                }
            ]
        },
        {
            type: 'column',
            id: 13,
            panelList: [
                {
                    id: 15,
                    title: '下级排名',
                    height: 338,
                    type: 'wgms',
                    component: 'DvWgmsSubordinateRanking'
                }
            ]
        },
        {
            type: 'column',
            id: 16,
            panelList: [
                {
                    id: 17,
                    title: '年度主要污染物占比列表展示',
                    height: 338,
                    type: 'aims',
                    component: 'DvAimsMainPollutionYearRatioList'
                }
            ]
        },
    ]
})
</script>

<style lang="scss" scoped>
.container-layout {
    position: relative;
    width: 100%;
    height: 100%;
}

.container-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.scale-left {
    transform-origin: left top;
}

.scale-right {
    transform-origin: right top;
}

.scale-center {
    transform-origin: center top;
}

.title-layout {
    position: absolute;
    top: 1.9%;
    left: 50%;
    z-index: 3;
    font-family: PangMenZhengDao;
    font-size: 36px;
    font-weight: normal;
    line-height: 36px;
    color: var(--dv-color-text-primary);
    transform: translateX(-50%);
}
</style>
