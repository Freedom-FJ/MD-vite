<!--
 * @Author: mjh
 * @Date: 2023-08-17 19:18:48
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-18 10:38:50
 * @Description:
-->
<template>
    <div class="color-palette">
        <el-tooltip content="显示调色板">
            <div v-show="!isShowPalette" class="item-box" @click="isShowPalette = true">
                <div class="palette-box" />
                <div class="palette-box" />
                <div class="palette-box" />
            </div>
        </el-tooltip>
    </div>
    <el-drawer v-model="isShowPalette" style="width: 40vw;" size="40%" direction="ltr" :append-to-body="true" :with-header="false">
        <div class="color-palette-body">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="changeMenu"
            >
                <el-menu-item index="light">
                    light 明亮模式
                </el-menu-item>
                <el-menu-item index="dark">
                    dark 暗黑模式
                </el-menu-item>
                <el-menu-item index="size">
                    fontSize 字体大小
                </el-menu-item>
            </el-menu>
            <div class="btn-line">
                <el-button @click="reset()">
                    重制
                </el-button>
                <el-button @click="exportCSSFile()">
                    导出
                </el-button>
            </div>
            <div v-if="activeIndex !== 'size'" class="palette-body-content">
                <div v-for="item, index in valueList" :key="index">
                    <h1>{{ item.title }}</h1>
                    <div class="palette-body-type">
                        <div v-for="detail, deIndex in item.list" :key="deIndex" class="palette-item">
                            <span>{{ detail.varStr }}</span>
                            <div class="palette-item-color" :style="detail.varStr.includes('box-shadow') ? `box-shadow: var(${detail.varStr});` : `background-color: var(${detail.varStr});`" />
                            <div class="input-box">
                                <el-input v-model="detail.value" size="small" @change="changeColor(detail)" />
                                <el-color-picker v-if="!detail.varStr.includes('box-shadow')" v-model="detail.value" :show-alpha="detail.varStr.includes('text-shadow')" size="small" @change="changeColor(detail)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="palette-size-body">
                <div v-for="item, index in fontSizeList" :key="index">
                    <div class="palette-size-item">
                        <span>{{ item.varStr }}</span>
                        <div class="palette-font-box" :style="`font-size: var(${item.varStr});`">
                            {{ item.varStr.includes('number') ? '23.1' : '调色板' }}
                        </div>
                        <el-input v-model="item.value" style="margin-top: 5px;" size="small" @change="changeColor(item)" />
                    </div>
                </div>
            </div>
        </div>
    </el-drawer>
</template>

<script setup lang="ts">
import { useModel } from 'vue'
import { useThemeValue } from '../../components/utils'
import { dark, fontSize, light } from '../../remote/src/theme/var'
const props = defineProps({
    isLight: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['change'])
const isShowPalette = useModel(props, 'modelValue')
const activeIndex = ref(props.isLight ? 'light' : 'dark')

watch(() => props.isLight, (val) => {
    if (activeIndex.value !== 'size') activeIndex.value = val ? 'light' : 'dark'
})
const valueList = ref<any[]>([])
const fontSizeList = ref<any[]>([])

const changeColor = (item: { varStr: string; value: string }) => {
    const { value, varStr } = item
    value && document.documentElement.style.setProperty(varStr, value)
}

const exportCSSFile = () => {
    if (activeIndex.value === 'size') {
        let cssString = 'html {'
        Object.keys(fontSize).forEach((key) => {
            cssString += `
    ${key}: ${useThemeValue(key)};`
        })
        cssString += `
}`
        exportOutCSSFile(cssString, 'data-visual-var-size.css')
        return
    }
    // 调用示例
    let cssString = `html ${props.isLight ? '' : '.dark'} {`
    Object.keys(light).forEach((key) => {
        cssString += `
    /* ${key} */`
        Object.keys((light as any)[key]).forEach((subKey) => {
            cssString += `
    ${subKey}: ${useThemeValue(subKey)};`
        })
    })
    cssString += `
}`
    exportOutCSSFile(cssString, `data-visual-var-${props.isLight ? 'light' : 'dark'}.css`)
}
function exportOutCSSFile(cssString: string, fileName: string) {
    // 创建 Blob 对象
    const blob = new Blob([cssString], { type: 'text/css' })

    // 创建 URL 对象
    const url = URL.createObjectURL(blob)

    // 创建 <a> 标签
    const link = document.createElement('a')
    link.href = url
    link.download = fileName

    // 创建并触发点击事件
    const event = document.createEvent('MouseEvents')
    event.initEvent('click')
    link.dispatchEvent(event)

    // 释放资源
    URL.revokeObjectURL(url)
}

const reset = () => {
    if (activeIndex.value === 'size') {
        Object.keys(fontSize).forEach(async (key) => {
            const currValue = (fontSize as any)[key]
            if (useThemeValue(key) === currValue) return
            document.documentElement.style.setProperty(key, currValue)
        })
        initFontList()
        return
    }
    const colorVar = props.isLight ? light : dark
    Object.keys(colorVar).forEach((key) => {
        const currObj: any = (colorVar as any)[key]
        Object.keys(currObj).forEach(async (subKey) => {
            const currValue = currObj[subKey]
            if (useThemeValue(subKey) === currValue) return
            document.documentElement.style.setProperty(subKey, currValue)
        })
    })
    upDataColor()
}

const changeMenu = (menu: 'size' | 'light' | 'dark') => {
    activeIndex.value = menu
    if (menu === 'size') {
        initFontList()
        return
    }
    if (menu === (props.isLight ? 'light' : 'dark')) return
    emits('change')
    nextTick(upDataColor)
}

const upDataColor = () => {
    valueList.value = Object.keys(light).map((key) => {
        return {
            title: key,
            list: Object.keys((light as any)[key]).map(subKey => ({ varStr: subKey, value: useThemeValue(subKey) }))
        }
    })
}

const initFontList = () => {
    fontSizeList.value = Object.keys(fontSize).map(subKey => ({ varStr: subKey, value: useThemeValue(subKey) }))
}

onMounted(() => {
    upDataColor()
})
</script>

<style scoped lang="scss">
.color-palette {
    position: fixed;
    top: 50%;
    left: 0;
    z-index: 3;
    transform: translateY(-50%);

    .item-box {
        width: 30px;
        height: 45px;
        overflow: hidden;
        cursor: pointer;
        border-radius: 0 4px 4px 0;
        transition: all 0.3s;
        transform: translateX(-50%);

        &:hover {
            transform: translateX(0);
        }

        .palette-box {
            width: 100%;
            height: 15px;
        }

        div:nth-child(1) {
            background-color: red;
        }

        div:nth-child(2) {
            background-color: yellow;
        }

        div:nth-child(3) {
            background-color: blue;
        }
    }
}
</style>

<style lang="scss">
.color-palette-body {
    width: 40vw;
    height: 100vh;
    overflow: hidden;
    background: var(--dv-color-background-base);
    border: 1px solid var(--dv-color-border-base);
    border-radius: 0 10px 10px 0;

    .palette-size-body {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        padding: 20px;

        .palette-size-item {
            width: 200px;
            margin-bottom: 40px;
        }

        .palette-font-box {
            height: 60px;
            line-height: 60px;
        }
    }

    .input-box {
        display: flex;
        gap: 2px;
        align-items: center;
        margin-top: 15px;
    }

    .palette-body-type {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .palette-body-content {
        height: calc(100% - 125px);
        padding: 20px;
        overflow: auto;

        h1 {
            margin: 10px 0;
        }
    }

    .palette-item {
        width: 200px;
        margin-top: 10px;
        font-size: var(--dv-text-headline2);
        line-height: 20px;
        color: var(--dv-color-text-primary);
        text-align: center;
    }

    .palette-item-color {
        height: 40px;
        background: var(--dv-color-background-base);
        border-radius: 8px;
    }
}

.btn-line {
    padding-left: 20px;
    margin: 10px 0;
}

.el-drawer__body {
    padding: 0 !important;
}

.el-overlay {
    background-color: transparent !important;
}
</style>
