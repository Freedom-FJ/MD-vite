<!--
 * @Author: mjh
 * @Date: 2023-08-17 19:18:48
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-24 11:47:05
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
                <el-menu-item index="colorVar">
                    light 明亮模式
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
                <el-button @click="inputCssFile()">
                    导入
                </el-button>
            </div>
            <div v-show="activeIndex !== 'size'" class="palette-body-content">
                <div v-for="item, index in valueList" :key="index">
                    <h1 class="type-title">
                        {{ item.title }}
                    </h1>
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
            <div v-show="activeIndex === 'size'" class="palette-size-body">
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
import type { record } from '@ued_fpi/element-plus-expand/lib/src/fpi-el-form/types'
import { useThemeValue } from '../../../components/utils'
import { useThemeStore } from '../store/theme'
import { inputCss } from '../utils/tools'
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const themeStore = useThemeStore()
const isShowPalette = useModel(props, 'modelValue')
const activeIndex = ref('colorVar')
const styleVar = ref<record>()
const fontSizeVar = ref<record>()

const reset = () => {
    const val = themeStore.getCurrStyleVar
    if (!val) return
    styleVar.value = { ...val?.color }
    fontSizeVar.value = { ...val?.fontSize }
    initColorTheme()
}

const valueList = ref<any[]>([])
const fontSizeList = ref<any[]>([])

const initColorTheme = () => {
    const htmlDom = document.querySelector('html')
    if (!htmlDom) return
    if (fontSizeVar.value) {
        Object.keys(fontSizeVar.value).forEach(async (key) => {
            const currValue = (fontSizeVar.value as record)[key]
            if (useThemeValue(key) === currValue) return
            htmlDom.style.setProperty(key, currValue)
        })
        initFontList()
    }
    if (!styleVar.value) return
    Object.keys(styleVar.value).forEach((key) => {
        const currObj: any = (styleVar.value as record)[key]
        Object.keys(currObj).forEach(async (subKey) => {
            const currValue = currObj[subKey]
            if (useThemeValue(subKey) === currValue) return
            htmlDom.style.setProperty(subKey, currValue)
        })
    })
    upDataColor()
}

const upDataColor = () => {
    const staticValue = styleVar.value as record
    valueList.value = Object.keys(staticValue).map((key) => {
        const currKeyVar = staticValue[key]
        return {
            title: key,
            list: Object.keys(currKeyVar).map(subKey => ({ varStr: subKey, value: currKeyVar[subKey] }))
        }
    })
}

const initFontList = () => {
    const staticFontSizeVar = fontSizeVar.value as record
    fontSizeList.value = Object.keys(staticFontSizeVar).map(subKey => ({ varStr: subKey, value: staticFontSizeVar[subKey] }))
}

const changeColor = (item: { varStr: string; value: string }) => {
    const { value, varStr } = item
    value && document.documentElement.style.setProperty(varStr, value)
}

const inputCssFile = () => {
    // 创建 input 元素
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = '.css'

    // 添加 change 事件监听器
    fileInput.addEventListener('change', (event: any) => {
        const file = event.target.files[0]
        if (file && file.type === 'text/css') {
            // 使用 FileReader 读取文件内容
            const reader = new FileReader()
            reader.onload = () => {
                const fileContent = reader.result as string
                if (!fileContent) return
                const cssObj = inputCss(fileContent || '')
                getSameColor(cssObj)
                initColorTheme()
            }
            reader.readAsText(file)
        }
        else {
            // 文件类型不符合要求，给出提示或执行其他操作
            console.log('请选择 .css 文件')
        }
    })

    // 模拟点击事件
    fileInput.click()
}

const getSameColor = (cssObj: {
    fontSize: Record<string, string>
    color: Record<string, Record<string, string>>
}) => {
    const { fontSize, color } = cssObj
    const currFontSize = fontSizeVar.value as record
    const currStyle = styleVar.value as record
    Object.keys(currFontSize).forEach((fontKey) => {
        const newData = fontSize[fontKey]
        if (!newData) return
        currFontSize[fontKey] = newData
    })
    Object.keys(currStyle).forEach((styleTypeKey) => {
        const newStyleObj = currStyle[styleTypeKey]
        const newColorObj = color[styleTypeKey]
        if (!newColorObj) return
        Object.keys(newStyleObj).forEach((styleKey) => {
            const newData = newColorObj[styleKey]
            if (!newData) return
            newStyleObj[styleKey] = newData
        })
    })
}
const exportCSSFile = () => {
    if (activeIndex.value === 'size') {
        let cssString = 'html {'
        Object.keys(fontSizeVar.value as record).forEach((key) => {
            cssString += `
    ${key}: ${useThemeValue(key)};`
        })
        cssString += ` 
           
        /* font-family */
        --dv-font-family-number: Oswald;
}`
        exportOutCSSFile(cssString, 'data-visual-var-size.css')
        return
    }
    // 调用示例
    let cssString = 'html {'
    Object.keys(styleVar.value as record).forEach((key) => {
        cssString += `
    /* ${key} */`
        Object.keys((styleVar.value as record)[key]).forEach((subKey) => {
            cssString += `
    ${subKey}: ${useThemeValue(subKey)};`
        })
    })
    cssString += `
}`
    exportOutCSSFile(cssString, 'data-visual-var.css')
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

const changeMenu = (menu: 'size' | 'colorVar') => {
    activeIndex.value = menu
}

const outPutVar = () => {
    return {
        fontSize: fontSizeVar.value,
        color: styleVar.value
    }
}

watch(() => themeStore.getCurrStyleVar, () => {
    reset()
}, { immediate: true })

defineExpose({
    outPutVar
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

            span,
            .palette-font-box {
                color: var(--dv-color-text-primary);
            }
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

        .type-title {
            margin: 10px 0;
            color: var(--dv-color-text-primary);
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
</style>

<style lang="scss">
.el-drawer__body {
    padding: 0 !important;
}

.el-overlay {
    background-color: transparent !important;
}
</style>
