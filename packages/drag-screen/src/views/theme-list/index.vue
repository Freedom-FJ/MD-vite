<!--
 * @Author: mjh
 * @Date: 2023-09-22 12:25:28
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-25 14:32:13
 * @Description:
-->
<template>
    <div class="theme-list">
        <div class="top-title">
            可视化大屏模板库
        </div>
        <div class="list-body">
            <div v-for="item, index in themeListData" :key="index" class="theme-panel">
                <div class="theme-body-flow" @click="checkTheme(item)">
                    <div class="theme-body">
                        <ContainerItem :theme-data="item" />
                    </div>
                </div>
                <div class="theme-title">
                    {{ item.title }}
                </div>
            </div>
            <div class="add-btn" @click="addTheme">
                +
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ContainerItem from '../../components/container-item.vue'
import { useThemeStore } from '../../store/theme'
import { dark, fontSize, light } from '../../../../remote/src/theme/var'
import { listTheme } from '../../api/theme'
import { useThemeValue } from '../../../../components/utils'
import type { ThemeDic } from '../../types/panel'
const $emit = defineEmits(['addTheme'])

const themeStore = useThemeStore()
const clearTheme = {
    title: '自定义主题',
    name: '',
    popPanel: {
        img: '',
        isBlur: true
    },
    basePanel: {
        img: '',
        isBlur: true
    },
    mapPanel: {
        img: '',
        isBlur: true
    },
    layoutPanel: {
        img: '',
        mapImg: 'http://ued.fpi-inc.site/file-base-server/api/v1/sys/download-preview/6f7a7c2af4734e63a21505a2a63d738d',
        isBlur: true
    },
} as ThemeDic
const themeListData = ref<ThemeDic[]>([])
onMounted(() => {
    getList()
    initColorTheme()
})

const checkTheme = (item: ThemeDic) => {
    if (!item.styleInfo) return
    themeStore.setTheme(item)
    const styleInfo = item.styleInfo
    themeStore.setStyleVar({
        color: styleInfo.color,
        fontSize: styleInfo.fontSize
    })
    $emit('addTheme')
}

const addTheme = () => {
    themeStore.setTheme(clearTheme)
    themeStore.setStyleVar({
        color: light,
        fontSize
    })
    $emit('addTheme')
}

const getList = async () => {
    const res = await listTheme()
    const resData = res.data || []
    const backList = resData.map((item) => {
        const currItem = {
            code: item.code,
            name: item.name === 'undefined' ? '' : item.name || '',
            title: item.title,
            popPanel: detailJsonString(item.popPanel),
            basePanel: detailJsonString(item.basePanel),
            mapPanel: detailJsonString(item.mapPanel),
            layoutPanel: detailJsonString(item.layoutPanel),
            styleInfo: detailJsonString(item.styleInfo),
        } as ThemeDic
        currItem.layoutPanel.mapImg = currItem.layoutPanel.mapImg || 'http://ued.fpi-inc.site/file-base-server/api/v1/sys/download-preview/6f7a7c2af4734e63a21505a2a63d738d'
        return {
            ...currItem,
            backColor: currItem.styleInfo?.color?.background?.['--dv-color-background-base']
        } as ThemeDic
    })
    themeListData.value = backList
}
const detailJsonString = (json: string) => {
    if (!json) return json
    if (json.includes('undefined')) return ''
    return JSON.parse(json)
}

const initColorTheme = () => {
    if (fontSize) {
        Object.keys(fontSize).forEach(async (key) => {
            const currValue = (fontSize as any)[key]
            if (useThemeValue(key) === currValue) return
            document.documentElement.style.setProperty(key, currValue)
        })
    }
    Object.keys(dark).forEach((key) => {
        const currObj = (dark as any)[key]
        Object.keys(currObj).forEach(async (subKey) => {
            const currValue = currObj[subKey]
            if (useThemeValue(subKey) === currValue) return
            document.documentElement.style.setProperty(subKey, currValue)
        })
    })
}
</script>

<style scoped lang="scss">
.theme-list {
    width: 100%;
    height: 100%;

    .top-title {
        width: 100%;
        height: 80px;
        font-family: PangMenZhengDao;
        font-size: 36px;
        font-weight: normal;
        line-height: 80px;
        color: #fff;
        text-align: center;
        background: #0069ff;
    }

    .list-body {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        width: 100%;
        height: calc(100% - 80px);
        padding: 40px;
        background: #000b1a;

        .add-btn {
            width: 320px;
            height: 180px;
            font-size: 48px;
            font-weight: normal;
            line-height: 180px;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
            background: rgba(255, 255, 255, 0.15);
        }
    }

    .list-body > div {
        cursor: pointer;
    }

    .theme-panel {
        width: 320px;
        height: 212px;

        .theme-body-flow {
            box-sizing: default;
            width: 100%;
            height: 180px;
            overflow: hidden;
        }

        .theme-body-flow:hover {
            border: 2px dashed #0069ff;
        }

        .theme-body {
            // width: 100%;
            // height: 180px;
            width: 1272px;
            height: 712px;
            transform: scale(0.25);
            transform-origin: left top;
        }

        .theme-title {
            margin-top: 10px;
            font-size: 16px;
            color: #fff;
            text-align: center;
        }
    }
}
</style>
