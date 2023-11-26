<!--
 * @Name: Preview.vue
 * @Author: forguo
 * @Date: 2023/6/30 15:00
 * @Description: Preview
-->
<template>
    <div class="ipes-pane">
        <el-scrollbar height="100%" view-class="ipes-pane-view">
            <el-card v-for="(item, idx) in componentsList" :key="idx">
                <template #header>
                    {{ item.title || item.name }}
                    <ElIcon style="cursor: pointer;" @click="onCopy(item.name)">
                        <CopyDocument />
                    </ElIcon>
                </template>
                <component :is="item.name as string" class="component-box" />
            </el-card>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import * as components from '@data-visual/ipes'
import type { Component } from 'vue'
import { reactive } from 'vue'
import { ElIcon } from 'element-plus'
import { copyText, messageBox } from '@data-visual/aims/utils/tools'
import { CopyDocument } from '@element-plus/icons-vue'

interface ICom {
    name?: string
    title?: string
}

const componentsList = reactive<(ICom & Component)[]>(Object.values(components).map((item: Component & ICom) => (
    {
        name: item.name,
        title: item.title
    }
)).filter((item: ICom) => item.name))

const onCopy = (name?: string) => {
    copyText(name || '')
    messageBox('复制成功', 'success')
}
</script>

<script lang="ts">
export default {
    name: 'IpesPreview'
}
</script>

<style lang="scss" scoped>
.ipes-pane {
    width: 100%;
    height: calc(100vh - 100px);
    color: #fff;

    .component-box {
        width: 296px;
        max-width: 600px;
    }

    --el-text-color-disabled: transparent;
    --el-border-color: transparent;
    --el-fill-color-blank: transparent;
    --el-border-color-hover: var(--el-text-color-disabled);
    --el-border: var(--el-border-width) var(--el-border-style) var(--el-border-color);
    --el-svg-monochrome-grey: var(--el-border-color);

    .el-select {
        --el-select-input-focus-border-color: transparent !important;
    }
}

:deep(.ipes-pane-view) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    color: white;
}

::v-deep .el-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.base-box {
    width: 216px;
    padding: 0 8px;
    margin: 0 20px;
    overflow: hidden;
    border-radius: 8px;
}
</style>

<style lang="scss">
@import "./select";
</style>
