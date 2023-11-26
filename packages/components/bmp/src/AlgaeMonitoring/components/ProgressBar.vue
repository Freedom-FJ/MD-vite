<template>
    <svg viewBox="0 0 100 100" class="progress-bar">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop class="grad1-stop1" offset="0%" />
                <stop class="grad1-stop2" :offset="leftOffset" :stop-opacity="leftColorOPacity" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop class="grad2-stop1" offset="0%" :stop-opacity="leftColorOPacity" />
                <stop class="grad2-stop2" :offset="rightOffset" />
            </linearGradient>
        </defs>
        <path
            v-if="leftPathShow"
            d="M50,55 m0,-48, a43,43,0,1,0,0,86"
            fill="none"
            stroke="url(#grad1)"
            stroke-width="6"
            :stroke-dasharray="leftDasharray"
        />
        <path
            v-if="rightPathShow"
            d="M50,55 m0,-48, a43,43,0,1,0,0,86"
            fill="none"
            stroke="url(#grad2)"
            stroke-width="6"
            :stroke-dasharray="rightDasharray"
            transform="rotate(180 50,50)"
        />
    </svg>
</template>

<script setup lang="ts">
// const props = defineProps()

const props = withDefaults(defineProps<{
    // 查询参数
    rate?: number
}>(), {
    rate: 0
})

// 圆的半径
const r = ref<number>(45)
// π的值
const pie = 3.141592653
const perimeter: number = r.value * pie * 2
// 左侧半圆是否可见
const leftPathShow = ref<boolean>(false)
// 左侧虚线长度
const leftDasharray = ref<string>('')
// 左侧偏移量
const leftOffset = ref<string>('0%')
// 左侧终点颜色
const leftColorOPacity = ref<number>(0)
// 右侧半圆是否可见
const rightPathShow = ref<boolean>(false)
// 右侧虚线长度
const rightDasharray = ref<string>('')
// 右侧偏移量
const rightOffset = ref<string>('0%')

watchEffect(() => {
    if (props.rate === 0) {
        // 全部隐藏
        leftPathShow.value = false
        rightPathShow.value = false
    }
    else if (props.rate <= 0.5) {
        // 如果比例小于50%,隐藏右侧的半圆
        leftPathShow.value = true
        rightPathShow.value = false
        // 计算虚线长度
        leftDasharray.value = `${perimeter * props.rate} ${perimeter * (0.5 - props.rate)}`
        leftOffset.value = `${props.rate * 200}%`
        // 颜色计算
        leftColorOPacity.value = 1
    }
    else {
        // 全部显示
        leftPathShow.value = true
        rightPathShow.value = true
        leftDasharray.value = `${perimeter} 0`
        leftOffset.value = '100%'
        const rightRate = props.rate - 0.5
        rightDasharray.value = `${perimeter * rightRate} ${perimeter * (0.5 - rightRate)} `
        rightOffset.value = `${rightRate * 200}%`
        // 颜色计算
        leftColorOPacity.value = 0.5 / props.rate
        // rightColor.value = colorIndexColor
    }
})
</script>

<style scoped lang="scss">
.progress-bar {
    width: 100%;
    height: 100%;

    #grad1 {
        .grad1-stop1 {
            stop-color: var(--dv-color-index);
            stop-opacity: 0.01;
        }

        .grad1-stop2 {
            stop-color: var(--dv-color-index);
        }
    }

    #grad2 {
        .grad2-stop1 {
            stop-color: var(--dv-color-index);
        }

        .grad2-stop2 {
            stop-color: var(--dv-color-index);
        }
    }
}
</style>
