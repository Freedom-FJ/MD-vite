<!--
 * @Author: Tian
 * @Date: 2023-07-05 21:25:48
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-18 10:02:09
 * @Description:
-->
<template>
    <el-config-provider :locale="zhCn">
        <div id="mainApp">
            <div class="nav">
                <RouterLink to="/ipes/index">
                    ipes
                </RouterLink>
                <RouterLink to="/aims/index">
                    aims
                </RouterLink>
                <RouterLink to="/wgms/index">
                    wgms
                </RouterLink>
                <RouterLink to="/bmp/index">
                    bmp
                </RouterLink>
                <el-switch v-model="isLight" @click="toggle()" />
            </div>
            <RouterView @click="isShowColorPalette = false" />
            <colorPalette v-model="isShowColorPalette" :is-light="isLight" @change="paletteChange()" />
        </div>
    </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useDark } from '@vueuse/core'
import { useToggle } from '@vueuse/shared'
import colorPalette from '../../packages/host/src/color-palette.vue'

const isDark = useDark({
    // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
    storageKey: 'useDarkKEY',
    // 暗黑class名字
    valueDark: 'dark',
    // 高亮class名字
    valueLight: 'light',
})
const isShowColorPalette = ref(false)
const isLight = ref(!isDark.value)
const toggle = useToggle(isDark)

const paletteChange = () => {
    toggle()
    isLight.value = !isLight.value
}
</script>

<style lang="scss">
@import "./styles/base";
@import "../../packages/remote/src/theme/data-visual-var.css";
@import "../../packages/host/src/font/font.css";
@import "element-plus/theme-chalk/dark/css-vars.css";
@import "../../packages/remote/src/theme/element-dark.css";

.dark #mainApp {
    background-color: rgb(3, 17, 32) !important;
}

#mainApp {
    width: 100%;
    height: 100%;
    background-color: white !important;
}

.dark a {
    color: white !important;
}

#mainApp .nav a {
    color: black;
}

.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 500px;
    height: 100px;
    margin: 0 auto;
    color: white;
}
</style>

