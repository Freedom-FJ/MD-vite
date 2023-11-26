<!--
 * @Author: mjh
 * @Date: 2023-08-25 10:34:24
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-25 14:47:40
 * @Description:
-->
<template>
    <div class="container-layout" :style="{ 'background-image': `url(${themeData?.layoutPanel.mapImg})` }">
        <div class="container-bg" :style="{ 'background-image': `url(${themeData?.layoutPanel.img})` }" />
        <panelSide v-model="leftData" style="height: 160%;transform: scale(0.55);transform-origin: left top;" :panel-data="themeData?.basePanel" />
        <panelSide v-model="rightData" style="height: 160%;transform: scale(0.55);transform-origin: right top;" side="right" :panel-data="themeData?.basePanel" />
        <!-- <div class="title-layout">
            {{ themeData?.title }}
        </div> -->
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { PanelOption, ThemeDic } from '../types/panel'
import panelSide from './panel-side.vue'
const props = defineProps({
    themeData: {
        type: Object as PropType<ThemeDic>,
    }
})

const leftData = ref<PanelOption>({
    midDistance: 25,
    top: 96,
    left: 20,
    id: 1,
    panelLine: [
        {
            type: 'column',
            id: 2,
            panelList: [
                {
                    id: 3,
                    title: '一级标题',
                    height: 250,
                    type: 'wgms',
                    component: ''
                }
            ]
        },
        {
            type: 'column',
            id: 4,
            panelList: [
                {
                    id: 5,
                    title: '一级标题',
                    height: 250,
                    type: 'wgms',
                    component: ''
                }
            ]
        },
        {
            type: 'column',
            id: 6,
            panelList: [
                {
                    id: 7,
                    title: '一级标题',
                    height: 250,
                    type: 'wgms',
                    component: ''
                }
            ]
        },
        {
            type: 'column',
            id: 8,
            panelList: [
                {
                    id: 9,
                    title: '一级标题',
                    height: 250,
                    type: 'aims',
                    component: ''
                }
            ]
        }
    ]
})

const rightData = ref<PanelOption>({
    midDistance: 25,
    top: 96,
    right: 20,
    id: 10,
    panelLine: [
        {
            type: 'column',
            id: 11,
            panelList: [
                {
                    id: 12,
                    title: '一级标题',
                    height: 338,
                    type: 'wgms',
                    component: ''
                }
            ]
        },
        {
            type: 'column',
            id: 13,
            panelList: [
                {
                    id: 15,
                    title: '一级标题',
                    height: 338,
                    type: 'wgms',
                    component: ''
                }
            ]
        },
        {
            type: 'column',
            id: 16,
            panelList: [
                {
                    id: 17,
                    title: '一级标题',
                    height: 338,
                    type: 'wgms',
                    component: ''
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
    background-repeat: no-repeat;
    background-size: 100% 100%;
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
