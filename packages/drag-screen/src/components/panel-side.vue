<!--
 * @Author: mjh
 * @Date: 2023-09-05 11:14:03
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-25 14:07:06
 * @Description:
-->
<template>
    <div
        v-if="leftData"
        :class="{ 'is-hover-panel': !isCheckIngId && isHoverId === leftData.id, 'left-container': side === 'left', 'right-container': side === 'right' }"
        @mouseenter="$event => mouseenter($event, leftData)"
        @mouseleave="$event => mouseleave($event, leftData)"
        @click.stop="$event => mouseCheck($event, leftData)"
        @dragstart="dragstart"
        @mousedown="onMouseDownBorder($event, leftData)"
        @drag="$event => drag($event, leftData)"
        @dragend="$event => dragend($event, leftData)"
    >
        <div v-if="isCheckIngId === leftData.id" class="show-checking" />
        <div
            v-for="item, index in leftData.panelLine"
            :key="index"
            class="relative"
            :class="{ 'is-hover-panel': !isCheckIngId && isHoverId === item.id }"
            @mouseenter="$event => mouseenter($event, item)"
            @mouseleave="$event => mouseleave($event, item)"
            @click.stop="$event => mouseCheck($event, item)"
        >
            <div v-if="isCheckIngId === item.id" class="show-checking" />
            <div
                v-for="panel, panelIndex in item.panelList"
                :key="panelIndex"
                class="check-panel relative"
                :class="{ 'is-hover-panel': !isCheckIngId && isHoverId === panel.id }"
                @mouseenter="$event => mouseenter($event, panel)"
                @mouseleave="$event => mouseleave($event, panel)"
                @click.stop="$event => mouseCheck($event, panel)"
            >
                <div v-if="isCheckIngId === panel.id" class="show-checking" />
                <basePanel :title="isShowComponents ? panel.title : ''" :height="panel.height" :width="panel.width" :panel-data="panelData">
                    <template #mainContent>
                        <component :is="componentsObj[panel.type] && componentsObj[panel.type][panel.component]" v-if="isShowComponents" />
                    </template>
                </basePanel>
            </div>
            <div class="mid-box" :style="`height: ${leftData.midDistance}px;`" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ComType, PanelOption } from '../types/panel'
import basePanel from './base-panel.vue'

const props = defineProps({
    modelValue: {
        type: Object as PropType<PanelOption>,
        default: null
    },
    side: {
        type: String as PropType<'left' | 'right'>,
        default: 'left'
    },
    panelData: {
        type: Object as PropType<{ img: string; isBlur: boolean }>,
    },
    isShowComponents: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['check-pop'])
const leftData = ref<PanelOption | null>()

watch(() => props.modelValue, (val) => {
    leftData.value = val
}, { immediate: true })
const componentsObj = shallowRef<Record<ComType, any>>({
    wgms: null,
    aims: null,
    ipes: null,
    bmp: null
})
onMounted(async () => {
    const [wgms, ipes, aims, bmp] = await Promise.all([
        import('data-visual/wgms'),
        import('data-visual/ipes'),
        import('data-visual/aims'),
        import('data-visual/bmp'),
    ])
    componentsObj.value = {
        wgms,
        aims,
        ipes,
        bmp
    }
})

const isHoverId = ref(null)
const isCheckIngId = ref(null)

const mouseenter = (event: MouseEvent, item: any) => {
    isHoverId.value = item.id
}

const mouseleave = (event: MouseEvent, item: any) => {
    if (isHoverId.value === item.id) isHoverId.value = null
}

let listener: any
const mouseCheck = (event: any, item: any) => {
    const dom = event.target
    isCheckIngId.value = item.id
    if (listener) listener.removeEventListener()
    if (!dom) return
    // 添加点击事件监听器
    listener = document.addEventListener('click', (event) => {
        // 检查点击的元素是否为目标元素或目标元素的子元素
        const isClickedInsideTarget = dom.contains(event.target)

        // 如果点击的是目标元素或目标元素的子元素，则给目标元素添加高亮类名；否则移除高亮类名
        if (!isClickedInsideTarget) {
            isCheckIngId.value = null
            listener && listener.removeEventListener()
        }
    })
    emit('check-pop')
}
let dragstartObj = {
    x: 0,
    y: 0
}
const dragstart = (e: any) => {
    dragstartObj = {
        x: e.clientX,
        y: e.clientY
    }
}

const drag = (e: any, item: any) => {

}

const dragend = (e: any, item: any) => {

}

/**
 * 鼠标按下边
 */
const onMouseDownBorder = (e: any, item: any) => {
    const startX = e.clientX
    const startY = e.clientY
    const ele: HTMLDivElement = e.target
    const mouseMoveHander = (e: MouseEvent, isInit?: boolean) => {
        const endX = e.clientX
        const endY = e.clientY
        const left = item.left - (startX - endX)
        const top = item.top - (startY - endY)
        ele.style.left = `${left}px`
        ele.style.top = `${top}px`
        if (!isInit) return
        item.top = top
        item.left = left
    }

    // const moving = document.addEventListener('mousemove', mouseMoveHander)
    // const mouseUpHander = (e: MouseEvent) => {
    //     document.removeEventListener('mousemove', mouseMoveHander)
    //     document.removeEventListener('mouseup', mouseUpHander)
    // }
    // document.addEventListener('mouseup', (e) => {
    //     document.removeEventListener('mousemove', mouseMoveHander)
    //     const endX = e.clientX
    //     const endY = e.clientY
    //     const left = item.left - (startX - endX)
    //     const top = item.top - (startY - endY)
    //     item.top = top
    //     item.left = left
    // })
}
</script>

<style lang="scss" scoped>
.left-container {
    position: absolute;
    top: 10%;
    left: 2%;
    z-index: 2;
    flex-direction: column;
    width: fit-content;
    height: 85%; // -96-56
    padding: 0 10px;
    overflow-x: hidden;
    overflow-y: auto;
    cursor: pointer;
}

.right-container {
    position: absolute;
    top: 10%;
    right: 2%;
    z-index: 2;
    flex-direction: column;
    width: fit-content;
    height: 85%; // -96-56
    padding: 0 10px;
    overflow-x: hidden;
    overflow-y: auto;
    cursor: pointer;
}

.mid-box {
    height: 16px;
}

.is-hover-panel {
    position: relative;

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        width: 100%;
        height: 100%;
        pointer-events: none;
        cursor: pointer;
        content: "";
        border: 1px dotted #51d6a9;
        border-radius: 5px;
    }
}

.show-checking {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: rgba(81, 214, 169, 0.05);
    border: 3px solid #51d6a9;
}

.relative {
    position: relative;
}

// 自动移滚动条样式
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

// 滑块部分
::-webkit-scrollbar-thumb {
    background-color: rgba(144, 147, 153, 0.3);
    border-radius: 1em;
}

// 辊道部分
::-webkit-scrollbar-track {
    background-color: rgba(144, 147, 153, 0);
    border-radius: 1em;
}
</style>

