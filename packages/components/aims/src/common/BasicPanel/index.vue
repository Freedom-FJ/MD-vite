<!--
 * @Author: mjh
 * @Date: 2023-07-05 17:17:58
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-05 17:23:06
 * @Description:
-->
<template>
    <div
        :style="{
            top: typeof top === 'number' ? `${top}px` : top,
            height: typeof height === 'number' ? `${height}px` : height,
            left: placement === 'left' ? 0 : 'unset',
            right: placement === 'right' ? 0 : 'unset',
        }"
        :class="`${clsfix}-container`"
    >
        <el-scrollbar height="100%">
            <div
                :class="[`${clsfix}-scroll-container`, scrollContainerClass]" :style="{
                    paddingLeft: placement === 'left' ? '16px' : '10px',
                    paddingRight: placement === 'right' ? '16px' : '10px',
                    ...scrollContainerStyle,
                }"
            >
                <slot />
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
/**
 * 定义 props
 */
defineProps({
    // 设置高度
    height: {
        type: [Number, String],
        default: 'calc(100vh - 130px)',
    },
    // 设置方位 left right
    placement: {
        type: String,
        required: true,
    },
    // 设置距离顶部的 top
    top: {
        type: [Number, String],
        default: 120,
    },
    // 滚动包裹容器的样式
    scrollContainerClass: {
        type: String,
        default: '',
    },
    // 滚动包裹容器的样式
    scrollContainerStyle: {
        type: Object,
        default: () => ({}),
    },
})
const clsfix = 'dv-aims-basic-panel'
</script>

<style lang="scss">
@import "./style/index";
</style>
