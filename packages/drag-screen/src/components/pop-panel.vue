<!--
 * @Author: Tian
 * @Date: 2023-01-06 09:13:46
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-25 14:05:01
 * @Description: 公共面板组件
-->
<template>
    <div
        class="common-panel" :class="[isBlur ? 'bf-blur' : ''] "
        :style="{ height: `${height}px`, width: `${width}px` }"
    >
        <div class="common-panel-bg" :style="{ 'border-image-source': `url(${bgImg})` }" />
        <div class="relative-box">
            <div class="panel-content">
                <div v-if="hasTitle" class="top-title">
                    <div class="text-box">
                        <span>{{ title }}</span>
                    </div>
                    <div class="right-slot">
                        <slot name="rightTitle" />
                        <div class="close" @click="close" />
                    </div>
                </div>
                <div class="common-content">
                    <slot name="mainContent" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type PropType, useModel } from 'vue'
// import { usePopStore } from '@/store/pop-control'
import { useThemeStore } from '../store/theme'
const props = defineProps({
    /**
     * 面板高度
     */
    height: {
        type: Number,
        default: 176,
    },
    /**
     * 面板宽度
     */
    width: {
        type: Number,
        default: 440,
    },
    /**
     * 背景图
     */
    panelBg: {
        type: String,
        default: 'panel-1',
    },
    /**
     * 标题
     */
    title: {
        type: String,
        default: '',
    },
    /**
     * 是否显示标题
     */
    hasTitle: {
        type: Boolean,
        default: true,
    },
    /**
     * 面板是否可点击
     */
    isClick: {
        type: Boolean,
        default: false,
    },
    /**
     * 点击面板对应弹框的名称
     */
    popupName: {
        type: String,
        default: '',
    },
    modelValue: {
        type: [Boolean, String, Number],
        default: undefined
    },
    selectItemStyle: {
        type: [String, Object],
    },
    size: {
        type: String as PropType<'default' | 'small'>,
        default: 'default'
    },
    /**
     * 弹框参数
     */
    popupData: {
        type: [Object, String, Array],
        default: '',
    },
    selectList: {
        type: Array as PropType<Array<{ name: string; value: string | boolean | number }>>,
        default: () => []
    },
    panel: {
        type: Object,
    }
})
const emit = defineEmits(['changeSelect', 'close'])
const themeStore = useThemeStore()
const modelValue = useModel(props, 'modelValue')
const attr: { onSubArrowClick?: () => void } = useAttrs()
const slot = useSlots()
const isHasRightTitle = ref(!!slot.rightTitle)
const bgImg = computed(() => {
    const panel = props.panel || themeStore.getCurrTheme.popPanel
    return panel.img
})
const isBlur = computed(() => {
    const panel = props.panel || themeStore.getCurrTheme.popPanel
    return panel.isBlur
})
const openBlock = () => {
    if (attr.onSubArrowClick) attr.onSubArrowClick()
}

const changeSelect = (item: { name: string; value: string | boolean | number }) => {
    modelValue.value = item.value
    emit('changeSelect', item.value, item)
}

/**
 * @name: 面板关闭事件
 * @emit close
 */
const close = () => {
    emit('close')
}
</script>

<style lang="scss" scoped>
.common-panel {
    position: absolute;
    top: 96px;
    left: 480px;
    z-index: 2;
    box-sizing: border-box;
    width: 400px;

    .relative-box {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .panel-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .top-title {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        padding-right: 10px;
        padding-left: 40px;

        .text-box {
            display: flex;
            align-items: center;
            font-family: PangMenZhengDao;
            font-size: 20px;
            font-weight: normal;
            background: linear-gradient(180deg, #fff 20%, #cce4ff 80%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;

            img.arrow {
                width: 12px;
                height: 12px;
                margin-right: 6px;
            }
        }
    }

    .right-slot {
        display: flex;
        gap: 16px;
        align-items: center;

        .select-list {
            display: flex;
            gap: 2px;

            div {
                box-sizing: border-box;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                height: 24px;
                padding: 0 12px;
                font-size: 14px;
                font-weight: 500;
                line-height: 24px;
                color: #fff;
                text-align: center;
                letter-spacing: 0;
                cursor: pointer;
                background: #001f4c;
                border: 1px solid #003580;
                border-radius: 2px;
            }

            .active-select {
                background-color: #0069ff;
                border-color: #0069ff;
            }
        }

        .arrow-icon {
            flex: none;
            height: 16px;
            margin-right: 19px;
        }
    }

    .common-content {
        padding: 12px;
    }
}

.common-panel-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border-top: 160px solid transparent;
    border-right: 160px solid transparent;
    border-bottom: 160px solid transparent;
    border-left: 320px solid transparent;
    border-image-slice: 160 160 160 320 fill;
    transform: scale(0.5);
    transform-origin: left top;
}

.close {
    position: relative;
    width: 12px;
    height: 12px;
    cursor: pointer;
}

.close::before {
    position: absolute;
    top: 0;
    left: 37%;
    width: 2px;
    height: 13px;
    content: "";
    background-color: #007ab2;
    transform: rotate(45deg);
}

.close::after {
    position: absolute;
    top: 0;
    left: 37%;
    width: 2px;
    height: 13px;
    content: "";
    background-color: #007ab2;
    transform: rotate(-45deg);
}
</style>
