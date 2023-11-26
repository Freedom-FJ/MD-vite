<!--
 * @Author: mjh
 * @Date: 2023-09-05 11:48:34
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-25 14:05:23
 * @Description:
-->
<template>
    <popPanel :height="510" :width="400" :title="isShowComponents ? '示例弹框' : ''" :style="`top: 10%;left: ${scaleNum * 480}px;`" @close="emit('close')">
        <template #mainContent>
            <DvIpesAccessVehicleManage
                v-if="isShowComponents"
                :access-statistic="[{ label: '入园车辆', value: 23, type: 'entry' }, { label: '出园车辆', value: 999, type: 'exit' }]"
                :access-record="[{ crossTime: 'crossTime', crossType: 'entry', plateNo: 'plateNo' }]"
            />
        </template>
    </popPanel>
</template>

<script setup lang="ts">
import { DvIpesAccessVehicleManage } from 'data-visual/ipes'
import popPanel from '../../../components/pop-panel.vue'
defineProps({
    scaleNum: {
        type: Number,
        default: 1
    },
    isShowComponents: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['close'])
</script>

<style scoped lang="scss">
</style>
