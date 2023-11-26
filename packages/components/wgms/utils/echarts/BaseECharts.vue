<!--
 * @Author: mjh
 * @Date: 2023-08-11 10:53:10
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-11 14:42:00
 * @Description:
-->
<template>
    <div ref="domBox" :style="{ width, height }">
        <div ref="domRef" :style="{ width, height }" />
    </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import type { ECharts } from 'echarts'
import { replaceVarStrings, useThemeHook } from '../../../utils'
import echarts from './index'
const props = defineProps({
    width: {
        type: String,
        default: '100%',
    },
    height: {
        type: String,
        default: '100%',
    },
    loading: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Object,
        default: null,
    },
})
const { isDark } = useThemeHook()

const domRef = ref(null)
const domBox = ref(null)
let chartObj: null | ECharts = null
let observer: null | MutationObserver = null // dom 监听

onMounted(() => {
    if (!chartObj && domRef.value)
        chartObj = (echarts.init(domRef.value) as any)
    if (!chartObj) return
    chartObj.showLoading({
        text: '',
        color: '#409eff',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, .95)',
        zlevel: 0,
        lineWidth: 2,
    })
    if (!props.loading) {
        chartObj.hideLoading()
        drawOption()
    }
    if (props.options)
        drawOption()

    observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList)
            if (mutation.target === domBox.value) chartObj && chartObj.resize()
    })

    nextTick(() => {
        domBox.value && (observer as MutationObserver).observe(domBox.value, {
            attributes: true,
            childList: false,
            characterData: true,
            subtree: true
        })
    })

    setTimeout(() => {
        chartObj && chartObj.resize()
    }, 1000)
})

onUnmounted(() => {
    if (chartObj) {
        chartObj.dispose()
        chartObj = null
    }
    observer && observer.disconnect()
})

watch(() => props.options, () => {
    drawOption()
},
)
watch(() => isDark.value, () => {
    drawOption()
})

const drawOption = () => {
    chartObj && chartObj.setOption(replaceVarStrings(props.options))
}
</script>
