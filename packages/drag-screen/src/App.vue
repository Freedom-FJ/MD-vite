<!--
 * @Author: Tian
 * @Date: 2023-07-05 21:25:48
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-23 13:09:06
 * @Description:
-->
<template>
    <el-config-provider :locale="zhCn">
        <div id="mainApp">
            <themeList v-if="isShowList" @add-theme="addTheme" />
            <editView v-else @back-list="backList" />
        </div>
    </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import editView from './views/edit-view/index.vue'
import themeList from './views/theme-list/index.vue'

const isShowList = ref(true)

const addTheme = () => {
    isShowList.value = false
}
const backList = () => {
    isShowList.value = true
}
</script>

<style lang="scss">
@import "../../../play/src/styles/base";
@import "./style/font.css";
@import "../../host/src/font/font.css";
@import "./style/data-visual-var.css";
@import "./style/element.css";

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

#root {
    width: 100%;
    height: 100%;
}

.dark #mainApp {
    width: 100%;
    height: 100%;
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

.el-menu {
    background-color: var(--dv-color-fill-blank) !important;
    border-bottom: 1px solid var(--dv-color-border-base) !important;
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

/* 若浏览器支持 backdrop-filter，则透明度为 50%，并启用毛玻璃 */
@supports (-webkit-backdrop-filter: blur(30px)) or (backdrop-filter: blur(30px)) {
    .bf-blur {
        background-color: rgba(#000, 0.1);
        backdrop-filter: blur(30px);
    }
}

/* 若浏览器器不支持，则使用 MaterialDesign 的风格 */
@supports not ((-webkit-backdrop-filter: blur(30px)) or (backdrop-filter: blur(30px))) {
    .bf-blur {
        background-color: rgba(#000, 0.1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18), 0 6px 10px rgb(0, 0, 0, 0.22);
    }
}
</style>

