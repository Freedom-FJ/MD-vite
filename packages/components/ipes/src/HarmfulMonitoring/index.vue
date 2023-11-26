<template>
    <div class="dv-ipes-env-manage">
        <div class="harm-list">
            <div class="harm-list__column harm-list__column--primary">
                <div class="harm-list__column__value">
                    {{ parseInt(statusMap.normal) || 0 }}
                </div>
                <div class="harm-list__column__label">
                    正常
                </div>
            </div>
            <div class="harm-list__column harm-list__column--error">
                <div class="harm-list__column__value">
                    {{ parseInt(statusMap.abnormal) || 0 }}
                </div>
                <div class="harm-list__column__label">
                    异常
                </div>
            </div>
            <div class="harm-list__column harm-list__column--warning">
                <div class="harm-list__column__value">
                    {{ parseInt(statusMap.offline) || 0 }}
                </div>
                <div class="harm-list__column__label">
                    离线
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { AirQuality, Factor, StatusMap } from './type'

const props = withDefaults(defineProps<{
    factorList?: {
        wg: Factor[]
        ww: Factor[]
    }
    statusMap?: StatusMap
    switchTime?: number
    width?: number | string
    height?: number | string
}>(), {
    factorList: () => ({
        wg: [
            // {
            //     factorName: '甲烷',
            //     factorValue: 89.32,
            //     targetValue: 500,
            //     percent: 0.179,
            // },
            // {
            //     factorName: '乙醇',
            //     factorValue: 0.84,
            //     targetValue: 200,
            //     percent: 0.004,
            // },
        ],
        ww: [
            // {
            //     factorName: '非甲烷总烃总量',
            //     factorValue: 89.32,
            //     targetValue: 500,
            //     percent: 0.179,
            // },
            // {
            //     factorName: 'SO2总量',
            //     factorValue: 0.84,
            //     targetValue: 200,
            //     percent: 0.004,
            // },
        ],
    }),
    statusMap: () => ({
        normal: '',
        abnormal: '',
        offline: '',
    }),
    switchTime: 10000,
    width: '100%',
    height: 96,
})

// 计算属性
const factorList = computed(() => {
    return props.factorList
})
const statusMap = computed(() => {
    return props.statusMap
})
const width = computed(() => {
    return props.width
})
const height = computed(() => {
    return props.height
})

/**
 * @desc 排放值颜色计算
 * @param val
 * @return {string}
 */
function percentColor(val: number) {
    // 当实际排放值/限值<80%时，实际排放值显示绿色，当80%<实际排放值/限值<100%时，实际排放值显示橙色，当实际排放值/限值>=100%时，实际排放值显示红色
    if (val < 80)
        return '#00FFBF'

    else if (val < 100)
        return '#FFAA00'

    else
        return '#FF3131'
}
// 自动切换
const harmIndex = ref(0)
const autoSwitchTimer = ref<NodeJS.Timeout | null>(null)
const autoSwitch = () => {
    autoSwitchTimer.value = setInterval(() => {
        harmIndex.value = harmIndex.value === 1 ? 0 : 1
    }, props.switchTime)
}
const stopSwitch = () => {
    if (autoSwitchTimer.value) {
        clearInterval(autoSwitchTimer.value)
        autoSwitchTimer.value = null
    }
}

onMounted(() => {
    autoSwitch()
})
</script>

<script lang="ts">
export default {
    name: 'DvIpesHarmfulMonitoring',
    title: '有毒有害监控',
}
</script>

<style lang="scss">
@import "./style/index";
</style>
