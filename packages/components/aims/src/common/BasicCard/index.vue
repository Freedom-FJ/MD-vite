<template>
    <div
        :class="{
            [`${clsfix}-container`]: true,
            [`${clsfix}-container-checked`]: checked,
        }"
        :style="{
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            cursor: canChecked ? 'pointer' : undefined,
        }"
        @click="onClickCard"
    >
        <header :class="`${clsfix}-header`">
            <div :class="`${clsfix}-header-left`">
                <span :class="`${clsfix}-header-title`">{{ title }}</span>
                <span :class="`${clsfix}-header-sub-title`">{{ subTitie }}</span>
                <slot name="headerLeft" />
            </div>
            <div>
                <slot name="headerRight" />
                <ElIcon v-if="showCopy" style="cursor: pointer;" @click="onCopy">
                    <CopyDocument />
                </ElIcon>
            </div>
        </header>
        <div
            :class="[`${clsfix}-content`, contentClass]"
            :style="contentStyle"
        >
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { StyleValue, } from 'vue'
import { ElIcon } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'
import { copyText, messageBox } from '../../../utils/tools'
/**
 * 定义 props
 */
const props = withDefaults(defineProps<{
    width?: number | string
    height?: number | string
    title?: string
    subTitie?: string
    canChecked?: boolean
    checked?: boolean
    contentClass?: any
    contentStyle?: StyleValue
    showCopy?: boolean
    copyStr?: string
}>(), {
    width: 400,
    height: '',
    title: '',
    subTitie: '',
    canChecked: false,
    checked: false,
    contentClass: '',
    contentStyle: undefined,
    showCopy: false,
    copyStr: ''
})

/**
 * 定义 emits
 */
const emits = defineEmits<{
    (e: 'clickCard'): void
}>()
const clsfix = 'dv-aims-basic-card'
const onClickCard = () => {
    emits('clickCard')
}
const onCopy = () => {
    copyText(props.copyStr)
    messageBox('复制成功', 'success')
}
</script>

<style lang="scss">
@import "./style/index";
</style>
