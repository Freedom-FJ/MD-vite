<template>
    <div class="dv-ipes-tabs-wrap">
        <div v-for="item, index in data" :key="index" class="dv-ipes-tabs-item" :class="{ 'dv-ipes-activeTab': modelValue === item.code }" @click="changeTab(item.code)">
            {{ `${item.name} ${item.num}` }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { TabType } from '../type'
defineProps({
    modelValue: {
        type: [String] as PropType<string>,
        default: ''
    },
    data: {
        type: Array as PropType<Array<TabType>>,
        default: () => []
    },
})

const $emit = defineEmits([
    'update:modelValue',
    'change'
])

function changeTab(value: string) {
    $emit('update:modelValue', value)
    $emit('change', value)
}
</script>

<style lang="scss" scoped>
@import "../style/Tabs";
</style>

