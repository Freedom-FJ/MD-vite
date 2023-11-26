<template>
    <div ref="echartRef" :class="className" :style="{ height, width }" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
const props = defineProps({
    className: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '100%',
    },
    height: {
        type: String,
        default: '300px',
    },
    loading: {
        type: Boolean,
        default: true,
    },
    fullOptions: {
        type: Object,
        default: () => ({}),
        required: true
    },
})

const echartRef = ref<HTMLDivElement | null>(null)

// 获取 dom 和 父组件数据 并定义"myChart"用于初始化图表
let myChart = null as any
// 重绘图表函数
const resizeHandler = () => {
    myChart.resize()
}
// 设置防抖，保证无论拖动窗口大小，只执行一次获取浏览器宽高的方法
const debounce = (fun: { (): void; (): void }, delay: number | undefined) => {
    let timer: NodeJS.Timeout | undefined
    return function () {
        if (timer)
            clearTimeout(timer)

        timer = setTimeout(() => {
            fun()
        }, delay)
    }
}
const cancalDebounce = debounce(resizeHandler, 50)
// 页面成功渲染，开始绘制图表
onMounted(() => {
    initChart()
})

// 页面销毁前，销毁事件和实例
onBeforeUnmount(() => {
    window.removeEventListener('resize', cancalDebounce)
    myChart.dispose()
})
// 监听图表数据时候变化，重新渲染图表
watch(() => [props.fullOptions.options, props.loading], () => {
    if (!myChart) initChart()
    if (!myChart) return
    if (!props.loading) {
        myChart.hideLoading()
        myChart.setOption(props.fullOptions.options, true)
    }
}, { deep: true })

const initChart = () => {
    if (!echartRef.value || !(window as any)?.echarts) return
    // 配置为 svg 形式，预防页面缩放而出现模糊问题；图表过于复杂时建议使用 Canvas
    myChart = (window as any).echarts.init(echartRef.value, { renderer: 'svg' })
    myChart.showLoading({
        text: '',
        color: '#409eff',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, .95)',
        zlevel: 0,
        lineWidth: 2,
    })
    if (!props.loading) {
        myChart.hideLoading()
        myChart.setOption(props.fullOptions.options, true)
    }
    // 自适应不同屏幕时改变图表尺寸
    window.addEventListener('resize', cancalDebounce)
}
</script>

<style lang="scss" scoped>
@import "./style/Echarts";
</style>
