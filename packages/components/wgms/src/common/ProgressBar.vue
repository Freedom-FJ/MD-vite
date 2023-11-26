<!--
 * @Author: mjh
 * @Date: 2023-07-04 17:00:21
 * @LastEditors: Tian
 * @LastEditTime: 2023-08-11 08:43:40
 * @Description:
-->
<template>
    <div class="dv-wgms-bar-box" :style="{ height: `${barHeight}px`, background: bgColor }">
        <div class="stand-bar" :style="{ width: `${percentage}%`, background: activeColor }" />
        <div class="bar-head" :style="handleStyle" />
    </div>
</template>

<script lang="ts" setup>
defineProps({
    /**
     * 进度条高度
     */
    barHeight: {
        type: Number,
        default: 8
    },
    /**
     * 进度条背景色
     */
    bgColor: {
        type: String,
        default: 'var(--dv-color-fill-lighter)'
    },
    /**
     * 激活部分背景色
     */
    activeColor: {
        type: String,
        default: 'linear-gradient(270deg, var(--dv-color-index) 0%, var(--dv-color-index-30) 100%)'
    },
    /**
     * 百分比
     */
    percentage: {
        type: Number,
        default: 0
    },
    /**
     * 手柄颜色
     */
    handleStyle: {
        type: Object,
        default: () => {
            return {
                background: 'var(--dv-color-index)',
                width: '2px',
                height: '12px'
            }
        }
    }
})
</script>

<style lang="scss">
@import "./style/ProgressBar";
</style>
