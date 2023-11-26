<!--
 * @Author: mjh
 * @Date: 2023-09-06 15:14:14
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-25 11:08:31
 * @Description:
-->
<template>
    <div class="edit-view">
        <containerLayout :is-show-components="isShowComponents" :scale-num="scaleNum" style="width: 80%;" />
        <editTools v-model:isShowComponents="isShowComponents" style="width: 20%;" @save="saveData" @back-list="$emit('backList')" @out-put="outPutData" />
        <colorPalette ref="colorPaletteDom" v-model="isShowColorPalette" />
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'
import { throttle } from 'lodash-es'
import colorPalette from '../../components/color-palette.vue'
import { saveTheme } from '../../api/theme/index'
import type { ThemeDic } from '../../types/panel'
import { downloadZip } from '../../utils/out-put'
import containerLayout from './components/container-layout.vue'
import editTools from './components/edit-tools.vue'
const $emit = defineEmits(['backList'])
const colorPaletteDom = ref()
const isShowColorPalette = ref(false)
const scaleNum = ref(1)
const isShowComponents = ref(false)
onMounted(() => {
    window.addEventListener('resize', methods)
    setScale()
})
onUnmounted(() => {
    window.removeEventListener('resize', methods)
})

const saveData = async (theme: ThemeDic) => {
    const style = colorPaletteDom.value?.outPutVar()
    const res = await saveTheme({
        name: theme.name,
        code: theme.code,
        title: theme.title,
        popPanel: JSON.stringify(theme.popPanel),
        basePanel: JSON.stringify(theme.basePanel),
        mapPanel: JSON.stringify(theme.mapPanel),
        layoutPanel: JSON.stringify(theme.layoutPanel),
        styleInfo: JSON.stringify(style),
    })
    if (res?.code === 200) {
        ElMessage({
            type: 'success',
            message: '保存成功',
        })
        setTimeout(() => {
            $emit('backList')
        }, 200)
    }
    else {
        ElMessage({
            type: 'warning',
            message: '保存失败'
        })
    }
}

const outPutData = (theme: ThemeDic) => {
    const style = colorPaletteDom.value?.outPutVar()
    downloadZip({ ...theme, style })
}
const setScale = () => {
    const baseWidth = 1920
    const app = document.getElementById('mainApp')
    if (!app) return

    const currNum = app.clientWidth / baseWidth
    scaleNum.value = currNum > 1 ? 1 : currNum
}
const methods = throttle(() => {
    setScale()
}, 300)
</script>

<style scoped lang="scss">
.edit-view {
    display: flex;
    width: 100%;
    height: 100%;
}
</style>
