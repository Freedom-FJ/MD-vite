<template>
    <Teleport to="body">
        <transition name="basicDialogAnimation">
            <div
                v-show="visible" :style="{
                    width: typeof width === 'number' ? `${width}px` : width,
                    height: typeof height === 'number' ? `${height}px` : height,
                    zIndex,
                    transform: `translateX(-50%) translateY(160px)`,
                }" :class="`${clsfix}-container`"
            >
                <header :class="`${clsfix}-header`">
                    <div :class="`${clsfix}-header-left`">
                        <span :class="`${clsfix}-header-title`">{{ title }}</span>
                        <slot name="headerLeft" />
                    </div>
                    <div :class="`${clsfix}-header-right`">
                        <slot name="headerRight" />
                        <svg
                            :class="`${clsfix}-close`" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1" width="10.473535537719727" height="10.473535537719727"
                            viewBox="0 0 10.473535537719727 10.473535537719727" fill="currentColor" @click="onClickClose"
                        >
                            <g>
                                <path
                                    d="M0.292786,0.292786C0.480314,0.105315,0.734622,0,0.999786,0C1.26495,0,1.51926,0.105315,1.70679,0.292786C1.70679,0.292786,5.24279,3.82879,5.24279,3.82879C5.24279,3.82879,8.77879,0.292786,8.77879,0.292786C8.96739,0.110628,9.21999,0.00983396,9.48219,0.0121124C9.74438,0.0143908,9.9952,0.11956,10.1806,0.304968C10.366,0.490376,10.4712,0.741189,10.4735,1.00339C10.4757,1.26558,10.3749,1.51818,10.1928,1.70679C10.1928,1.70679,6.65679,5.24279,6.65679,5.24279C6.65679,5.24279,10.1928,8.77879,10.1928,8.77879C10.3749,8.96739,10.4757,9.21999,10.4735,9.48219C10.4712,9.74438,10.366,9.9952,10.1806,10.1806C9.9952,10.366,9.74438,10.4712,9.48219,10.4735C9.21999,10.4757,8.96739,10.3749,8.77879,10.1928C8.77879,10.1928,5.24279,6.65679,5.24279,6.65679C5.24279,6.65679,1.70679,10.1928,1.70679,10.1928C1.51818,10.3749,1.26558,10.4757,1.00339,10.4735C0.741189,10.4712,0.490376,10.366,0.304968,10.1806C0.11956,9.9952,0.0143908,9.74438,0.0121124,9.48219C0.00983396,9.21999,0.110628,8.96739,0.292786,8.77879C0.292786,8.77879,3.82879,5.24279,3.82879,5.24279C3.82879,5.24279,0.292786,1.70679,0.292786,1.70679C0.105315,1.51926,0,1.26495,0,0.999786C0,0.734622,0.105315,0.480314,0.292786,0.292786C0.292786,0.292786,0.292786,0.292786,0.292786,0.292786C0.292786,0.292786,0.292786,0.292786,0.292786,0.292786Z"
                                    fill-opacity="1" fill="currentColor"
                                />
                            </g>
                        </svg>
                    </div>
                </header>
                <div v-if="destroyOnClose" :class="`${clsfix}-content`">
                    <template v-if="visible">
                        <slot />
                    </template>
                </div>
                <div v-else :class="`${clsfix}-content`">
                    <slot />
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import getZIndex from './util'
/**
 * 定义 props
 */
const props = defineProps({
    // 设置宽度
    width: {
        type: [Number, String],
        default: 800
    },
    // 设置高度
    height: {
        type: [Number, String],
        default: ''
    },
    // 设置标题
    title: {
        type: String,
        default: '',
    },
    // 是否显示弹窗
    visible: {
        type: Boolean,
        default: false,
    },
    // 是否在关闭弹窗后销毁内容区元素
    destroyOnClose: {
        type: Boolean,
        default: false,
    }
})
/**
 * 定义 emits
 */
const emits = defineEmits<{
  (e: 'close'): void
}>()
const clsfix = 'dv-aims-basic-dialog'
const zIndex = ref(0)
watch(() => props.visible, () => {
    if (props.visible)
        zIndex.value = getZIndex()
}, {
    immediate: true
})

const onClickClose = () => {
    emits('close')
}
</script>

<style lang="scss">
@keyframes basic-dialog-animation-enter {
    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(100px);
    }

    100% {
        opacity: 1;
    }
}
</style>

<style lang="scss">
@import "./style/index";
</style>
