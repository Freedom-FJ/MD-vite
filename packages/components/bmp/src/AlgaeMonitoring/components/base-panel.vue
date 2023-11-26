<template>
    <div class="common-panel bf-blur" :style="{ height: `${height}px`, width: `${width}px` }" :class="[isClick && popStore.getCurrentPop === popupName ? 'panel-checked' : '']" @click="clickPanel">
        <div class="panel-content">
            <div v-if="hasTitle" class="top-title" :style="{ padding: !isDifferentTitle ? '16px' : '6px 8px' }">
                <div class="text-box">
                    <img v-if="isDifferentTitle" class="img-diff" src="@/assets/images/panel/rect.png" alt="">
                    <img v-else src="@/assets/images/panel/triangle.png" class="img" alt="">
                    <span>{{ title }}</span>
                    <img v-if="isHasMore" class="more-icon" src="@/assets/images/panel/more.png" @click.stop="clickMore">
                </div>
                <div class="right-slot">
                    <slot name="rightTitle" />
                </div>
                <!-- 另一种标题样式的底部线条 -->
                <!-- src="@/assets/images/panel/line.png" -->
                <img v-if="isDifferentTitle" class="img-bg" :style="imgStyle" :src="getAssetsFile(`panel/${titleImgBg || 'line'}.png`)" alt="">
            </div>
            <div class="common-content">
                <slot name="mainContent" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// import { usePopStore } from '@/store/pop-control'
import { getAssetsFile } from '@/utils/tools'
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
        default: undefined
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
        default: false
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
    },
    /**
     * 是否是另一种标题
     */
    isDifferentTitle: {
        type: Boolean,
        default: false
    },
    /**
     * 是否标题带 更多图标
     */
    isHasMore: {
        type: Boolean,
        default: false
    },
    /**
     * 标题背景图片
     */
    titleImgBg: {
        type: String,
        default: 'line'
    },
    /**
     * 图片样式
     */
    imgStyle: {
        type: Object,
        default: () => {}
    }
})
const $emit = defineEmits(['clickMore'])
// const popStore = usePopStore()
// const clickPanel = () => {
//     if (props.isClick)

//         popStore.upDatePopup({ currentPop: props.popupName, popData: props.popupData })
// }
/**
 * @name: clickMore
 * @test: test font
 * @msg: 点击更多
 * @return {*}
 */
const clickMore = () => {
    $emit('clickMore')
}
</script>

<style lang="scss" scoped>
.common-panel {
    position: relative;
    box-sizing: border-box;
    width: 360px;
    margin: 0 15px;
    background: rgba(0, 95, 213, 0.1);
    border: 1px solid rgba(0, 123, 172, 0.5);
    border-radius: 4px;
    backdrop-filter: blur(30px);

    .common-bg {
        position: absolute;
        width: 100%;
        border-top: 30px solid;
        border-right: 70px solid;
        border-bottom: 30px solid;
        border-left: 70px solid;
        border-image-slice: 30 70 30 70 fill;
    }

    .panel-content {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .top-title {
        position: relative;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 16px;

        .text-box {
            display: flex;
            align-items: center;
            font-family: PangMenZhengDao;
            font-size: 20px;
            color: #fff;
            text-shadow: 0 0 4px 0 #0091ff;

            .img {
                width: 8px;
                height: 8px;
                margin-right: 10px;
                transform: scale(6);
            }

            .img-diff {
                margin-right: 10px;
            }

            .more-icon {
                width: 20px;
                margin-left: 4px;
                cursor: pointer;
            }
        }

        .img-bg {
            position: absolute;
            bottom: 0;
            left: 8px;

            // background: url("@/assets/images/panel/line.png");
        }
    }
}
</style>

