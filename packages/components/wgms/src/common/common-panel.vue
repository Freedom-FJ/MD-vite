<template>
    <div class="dv-wgms-common-panel dv-wgms-bf-blur" :style="{ height: pxToRem(props.height), width: pxToRem(props.width) }" />
    <div class="panel-content">
        <div class="top-title" :style="{ marginTop: pxToRem(props.bigBgTop) }">
            <div class="text-box">
                <div class="left">
                    <el-tooltip
                        v-if="title.length > 16"
                        class="box-item"
                        effect="dark"
                        :content="title"
                        placement="top"
                    >
                        <div class="main-title">
                            {{ title }}
                        </div>
                    </el-tooltip>

                    <div v-else class="main-title">
                        {{ title }}
                    </div>
                    <div class="sub">
                        <slot name="subTitle">
                            <span>{{ subTitle }}</span>
                        </slot>
                    </div>
                </div>
                <div class="right">
                    <slot name="rightTitle" />
                </div>
            </div>
        </div>
        <div class="common-content">
            <slot name="mainContent" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    /**
   * 背景图高度
   */
    height: {
        type: Number,
        default: 176
    },
    /**
   * 背景图宽度
   */
    width: {
        type: Number,
        default: undefined
    },
    /**
   * 背景图
   */
    panelBg: {
        type: String,
        default: 'panel-1'
    },
    /**
   * 主标题
   */
    title: {
        type: String,
        default: ''
    },
    /**
   * 副标题
   */
    subTitle: {
        type: String,
        default: ''
    },
    /**
   * 当图片为panel-big时，主标题的marginTop
   */
    bigBgTop: {
        type: Number,
        default: 0
    }
})
/**
 * 将px转换成rem
 * @param px 设计图像素值
 * @returns rem
 */
const pxToRem = (px?: number | string) => {
    if (typeof px === 'number') return `${px / 192}rem`
    return px
}
</script>

<style lang="scss" scoped>
@import "./style/common-panel";
</style>
