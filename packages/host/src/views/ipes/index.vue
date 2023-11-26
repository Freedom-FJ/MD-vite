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
                </template>
                <component :is="item.default" class="component-box" />
            </el-card>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { shallowRef } from 'vue'
interface ICom {
    name?: string
    title?: string
    default: Component
}
const componentsList = shallowRef<(ICom & Component)[]>([])

const getComponents = async () => {
    const com: Record<string, ICom & Component> = await import('data-visual/ipes')
    componentsList.value = Object.values(com).map((item: ICom & Component) => {
        return {
            title: item.title || item.name,
            default: item
        }
    }).filter(item => item.title)
}

getComponents()
</script>

<script lang="ts">
export default {
    name: 'IpesPreview'
}
</script>

<style lang="scss" scoped>
@import "../../../../../play/src/views/ipes/select";

.ipes-pane {
    width: 100%;
    height: calc(100vh - 100px);
    color: #fff;

    .component-box {
        width: 376px;
        max-width: 600px;
    }

    --el-text-color-disabled: transparent;
    --el-border-color: transparent;
    --el-fill-color-blank: transparent;
    --el-border-color-hover: var(--el-text-color-disabled);
    --el-border: var(--el-border-width) var(--el-border-style) var(--el-border-color);
    --el-svg-monochrome-grey: var(--el-border-color);

    .el-select {
        --el-select-input-focus-border-color: transparent;
    }
}

:deep(.ipes-pane-view) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    color: white;
}

.base-box {
    width: 216px;
    padding: 0 8px;
    margin: 0 20px;
    overflow: hidden;
    border-radius: 8px;
}
</style>
