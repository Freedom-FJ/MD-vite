export const basePanelStr = `<template>
    <div class="common-panel" :style="{ height: height + 'px', width: width + 'px' }" :class="[isClick && popStore.getCurrentPop === popupName ? 'panel-checked' : '']" @click="clickPanel">
        <div class="common-bg" />
        <div class="panel-content">
            <div v-if="hasTitle" class="top-title">
                <div class="text-box">
                    <slot name="title">
                        <span>{{ title }}</span>
                    </slot>
                </div>
                <div class="right-slot">
                    <slot name="rightTitle" />
                </div>
            </div>
            <div class="common-content">
                <slot name="mainContent" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getAssetsFile } from '@/utils/tools'
import { usePopStore } from '@/store/pop-control'
const props = defineProps({
    /**
     * 面板高度
     */
    height: {
        type: Number,
        default: 176
    },
    /**
     * 面板宽度
     */
    width: {
        type: Number,
        default: 400
    },
    /**
     * 背景图
     */
    panelBg: {
        type: String,
        default: 'panel-1'
    },
    /**
     * 标题
     */
    title: {
        type: String,
        default: ''
    },
    /**
     * 是否显示标题
     */
    hasTitle: {
        type: Boolean,
        default: true
    },
    /**
     * 面板是否可点击
     */
    isClick: {
        type: Boolean,
        default: false
    },
    /**
     * 点击面板对应弹框的名称
     */
    popupName: {
        type: String,
        default: ''
    },
    /**
     * 弹框参数
     */
    popupData: {
        type: [Object, String, Array],
        default: ''
    }
})
const popStore = usePopStore()
const clickPanel = () => {
    if (props.isClick)
        popStore.upDatePopup({ currentPop: props.popupName, popData: props.popupData })
}
</script>

<style lang="scss" scoped>
.common-panel {
    position: relative;
    box-sizing: border-box;
    width: 400px;

    .common-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        border-top: 160px solid transparent;
        border-right: 160px solid transparent;
        border-bottom: 160px solid transparent;
        border-left: 320px solid transparent;
        border-image-source: url(./images/panel.png);
        border-image-slice: 160 160 160 320 fill;
        transform: scale(0.5);
        transform-origin: left top;
    }

    .panel-content {
        position: absolute;
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
        }
    }
}
</style>`

export const layoutBgStr = `<template>
    <div class="container-bg" />
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.container-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-image: url(./images/layout.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>`

export const appStr = `
<template>
    <ElConfigProvider :locale="locale">
        <div id="mainApp" :style="{ transform: 'scale(' +scaleNum+ ')', width, height, transformOrigin: 'left top' }">
            <component :is="layout" v-for="layout in layouts" :key="layout.name" />
            <router-view />
            <!-- 框架背景图 -->
            <layoutBg></layoutBg>
        </div>
    </ElConfigProvider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
import layoutBg from '@/layouts/layout-bg/index.vue'
import { useRouter } from 'vue-router'
import layouts from './layouts'
import { useRouterControlStore } from '@/store/router-control'
import { getScaleNum } from '@/utils/tools'
const routerControlStore = useRouterControlStore()
const router = useRouter()
const locale = zhCn
const data = reactive({
    scaleNum: getScaleNum(),
    width: '',
    height: '',
})
watch(() => routerControlStore.getRouter, (val) => {
    router.push({ path: val.path, query: val.data })
})
onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
})
/**
 * 监听浏览器大小变化
 */
const handleResize = () => {
    if (window.innerHeight < 1080) {
        data.scaleNum = window.innerHeight / 1080
        data.width = document.body.clientWidth/data.scaleNum + 'px'
        data.height = (window.innerHeight / getScaleNum()) > 1080 ? window.innerHeight / getScaleNum() + 'px' : '1080px'
    }
    else {
        data.scaleNum = 1
        data.width = '100%'
        data.height = '100%'
    }
}
const {
    scaleNum,
    width,
    height
} = toRefs(data)
</script>

<style lang="scss">
@import url("element-plus/theme-chalk/dark/css-vars.css");
@import url("./styles/base.scss");
@import url("./styles/map.scss");
@import url("./styles/common.scss");
@import url("./assets/font/font.css");

.el-table .cell {
    font-family: Oswald;
    font-size: 14px;
    color: #fff;
}

.el-table .el-table__header .cell {
    color: rgba(255, 255, 255, 0.6);
}

// 时间控件分钟不显示
.noneMinute {
    .el-time-spinner__wrapper {
        width: 100% !important;
    }

    .el-scrollbar:nth-of-type(2) {
        display: none;
    }
}

body {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
}

#mainApp {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 12px;
    color: #fff;
}
</style>`

export const popPanelStr = `<template>
    <div
    class="popup-container"
    :class="[type]"
    :style="{
        height: valueOrStr(height),
        width: valueOrStr(width), 
        right: valueOrStr(right), 
        left: valueOrStr(left), 
        top: valueOrStr(top), 
        bottom: valueOrStr(bottom), 
        position: isMapPop ? 'static' : 'absolute'
    }">
        <div class="common-bg" :class="isMapPop ? 'map-bg' : 'pop-bg'"/>
        <div class="pop-detail">
            <div class="pop-body">
                <div class="title-line" >
                    <div class="left">
                        <slot name="title">
                            <div class="left-title text-14">
                                {{ title }}
                            </div>
                        </slot>
                    </div>

                    <div class="close" @click="close" />
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { usePopStore } from '@/store/pop-control'
import MapUtil from '@/utils/map/map-utils'

const props = defineProps({
    /**
     * 标题
     */
    title: {
        type: String,
        default: ''
    },
    /**
     * 高度
     */
    height: {
        type: [Number, String],
        default: undefined
    },
    /**
     * 宽度
     */
    width: {
        type: [Number, String],
        default: 320
    },
    type: {
        type: String as PropType<'left' | 'right' | 'center'>,
        default: 'left'
    },
    /**
     * 是否是地图弹框
     */
    isMapPop: {
        type: Boolean,
        default: false
    },
    /**
     * 动画名称
     */
    name: {
        type: String,
        default: 'opacity-left'
    },
    top: {
        type: [Number, String],
        default: 240
    },
    left: {
        type: [Number, String],
        default: undefined
    },
    right: {
        type: [Number, String],
        default: undefined
    },
    bottom: {
        type: [Number, String],
        default: undefined
    },
    /**
     * 自定义close方法
     */
    initClose: {
        type: Boolean,
        default: false
    }
})
const $emit = defineEmits(['close'])
const popStore = usePopStore()

const valueOrStr = (val: string | number | undefined) => {
    if (typeof val === 'string') return val
    return val + 'px'
}
/**
 * @name: 面板关闭事件
 * @emit close
*/
const close = () => {
    $emit('close')
    if (!props.initClose) {
        if (!props.isMapPop) popStore.initPop()
        else MapUtil._removeMapboxPopup()
    }
}
</script>

<style scoped lang="scss">
.left {
    left: 360px;
}

.right {
    right: 360px;
}

.center {
    left: 50%;
    transform: translateX(-50%);
}

.popup-container {
    max-height: 800px;
    padding: 1px;

    .common-bg {
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

    .map-bg {
        border-image-source: url(./images/map-panel.png);
    }

    .pop-bg {
        border-image-source: url(./images/pop-panel.png);
    }

    .pop-detail {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .title-line {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        padding-right: 10px;
        padding-left: 40px;

        .left {
            display: flex;
            align-items: center;
        }
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
}
</style>
`

export const dataVisualVarElementStr = `html {
    /* primary */
    --el-color-primary: var(--dv-color-primary);
    --el-color-primary-light-3: var(--dv-color-primary-70);
    --el-color-primary-light-5: var(--dv-color-primary-50);
    --el-color-primary-light-7: var(--dv-color-primary-30);
    --el-color-primary-light-8: var(--dv-color-primary-20);
    --el-color-primary-light-9: var(--dv-color-primary-10);
    --el-color-primary-dark-2: var(--dv-color-primary-110);

    /* success */
    --el-color-success: var(--dv-color-success);
    --el-color-success-light-3: var(--dv-color-success-70);
    --el-color-success-light-5: var(--dv-color-success-50);
    --el-color-success-light-7: var(--dv-color-success-30);
    --el-color-success-light-8: var(--dv-color-success-20);
    --el-color-success-light-9: var(--dv-color-success-10);
    --el-color-success-dark-2: var(--dv-color-success-110);

    /* warning */
    --el-color-warning: var(--dv-color-warning);
    --el-color-warning-light-3: var(--dv-color-warning-70);
    --el-color-warning-light-5: var(--dv-color-warning-50);
    --el-color-warning-light-7: var(--dv-color-warning-30);
    --el-color-warning-light-8: var(--dv-color-warning-20);
    --el-color-warning-light-9: var(--dv-color-warning-10);
    --el-color-warning-dark-2: var(--dv-color-warning-110);

    /* danger */
    --el-color-danger: var(--dv-color-danger);
    --el-color-danger-light-3: var(--dv-color-danger-70);
    --el-color-danger-light-5: var(--dv-color-danger-50);
    --el-color-danger-light-7: var(--dv-color-danger-30);
    --el-color-danger-light-8: var(--dv-color-danger-20);
    --el-color-danger-light-9: var(--dv-color-danger-10);
    --el-color-danger-dark-2: var(--dv-color-danger-110);

    /* error */

    /* --el-color-error: var(--dv-color-error);
    --el-color-error-light-3: var(--dv-color-error-70);
    --el-color-error-light-5: var(--dv-color-error-50);
    --el-color-error-light-7: var(--dv-color-error-30);
    --el-color-error-light-8: var(--dv-color-error-20);
    --el-color-error-light-9: var(--dv-color-error-10);
    --el-color-error-dark-2: var(--dv-color-error-110); */

    /* info */
    --el-color-info: var(--dv-color-info-100);
    --el-color-info-light-3: var(--dv-color-info-70);
    --el-color-info-light-5: var(--dv-color-info-50);
    --el-color-info-light-7: var(--dv-color-info-30);
    --el-color-info-light-8: var(--dv-color-info-20);
    --el-color-info-light-9: var(--dv-color-info-10);
    --el-color-info-dark-2: var(--dv-color-info-110);

    /* bg */
    --el-bg-color-page: var(--dv-color-background-page);
    --el-bg-color: var(--dv-color-background-base);
    --el-bg-color-overlay: var(--dv-color-background-overlay);

    /* text */
    --el-text-color-primary: var(--dv-color-text-primary);
    --el-text-color-regular: var(--dv-color-text-regular);
    --el-text-color-secondary: var(--dv-color-text-secondary);
    --el-text-color-placeholder: var(--dv-color-text-placeholder);
    --el-text-color-disabled: var(--dv-color-text-disable);

    /* border */
    --el-border-color-darker: var(--dv-color-border-darker);
    --el-border-color-dark: var(--dv-color-border-dark);
    --el-border-color: var(--dv-color-border-base);
    --el-border-color-light: var(--dv-color-border-light);
    --el-border-color-lighter: var(--dv-color-border-lighter);
    --el-border-color-extra-light: var(--dv-color-border-extra-light);

    /* fill */
    --el-fill-color-darker: var(--dv-color-fill-darker);
    --el-fill-color-dark: var(--dv-color-fill-dark);
    --el-fill-color: var(--dv-color-fill-base);
    --el-fill-color-light: var(--dv-color-fill-light);
    --el-fill-color-lighter: var(--dv-color-fill-lighter);
    --el-fill-color-extra-light: var(--dv-color-fill-extra-light);
    --el-fill-color-blank: var(--dv-color-fill-blank);

    /* disabled */
    --el-disabled-bg-color: var(--dv-color-fill-light);
    --el-disabled-text-color: var(--dv-text-color-placeholder);
    --el-disabled-border-color: var(--dv-color-border-lighter);
}
`
