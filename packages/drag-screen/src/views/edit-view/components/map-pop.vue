<!--
 * @Author: mjh
 * @Date: 2023-09-05 11:48:34
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-25 14:15:37
 * @Description:
-->
<template>
    <mapPanel :height="300" title="示例弹框" @close="emit('close')">
        <template #mainContent>
            123
        </template>
    </mapPanel>
</template>

<script setup lang="ts">
import mapPanel from '../../../components/map-panel.vue'
const emit = defineEmits(['close'])
</script>

<style scoped lang="scss">
</style>
