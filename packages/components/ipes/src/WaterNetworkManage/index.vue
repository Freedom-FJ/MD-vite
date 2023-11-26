<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2023/6/30 10:23
 * @Description: 园区供水管网管理
-->
<template>
    <div class="dv-ipes-water-network">
        <!-- 园区供水管网管理 S -->
        <div class="sealing-row">
            <div class="sealing-header">
                <div class="sealing-header__title">
                    <span>设备情况</span>
                    <span class="sealing-header__title--sub">（{{ now }}）</span>
                </div>
            </div>

            <div class="water-device">
                <div class="water-device__info">
                    <div class="water-device__percent">
                        <div class="title">
                            阀门开启率
                        </div>
                        <div class="value">
                            {{ percentNum.toFixed(0) }}%
                        </div>
                    </div>
                    <div class="water-device__progress">
                        <IpesProgressBar :percent="percentNum || 0" />
                    </div>
                    <div class="water-device__detail">
                        <div class="left">
                            <div class="title">
                                <img class="icon" src="./images/icon-percent.png"><span>设备联网率</span>
                            </div>
                            <div class="percent">
                                {{ waterStatus.line.pel || 0 }}%
                            </div>
                        </div>
                        <div class="right">
                            <div class="title">
                                <span>开阀</span><span class="space">/</span><span>关阀</span>
                            </div>
                            <div class="value">
                                <span class="online"> {{ waterStatus.open.openTotal || 0 }}</span><span class="space">/</span><span class="offline"> {{ waterStatus.line.total || 0 }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 园内危化品车辆 S -->
        <div class="sealing-row">
            <div class="sealing-header">
                <div class="sealing-header__title">
                    <span>水量统计</span>
                    <span class="sealing-header__title--sub">（{{ timeLabel }}）</span>
                </div>
                <div class="sealing-header__extra">
                    <el-select v-model="_timeType" :popper-append-to-body="false" class="fpi-select" @change="handleTimeTypeChange">
                        <el-option
                            v-for="item in timeTypeOptions"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        />
                    </el-select>
                </div>
            </div>

            <div class="water-statistics">
                <div class="water-statistics__number">
                    <div class="water-statistics-panel water-statistics__total">
                        <div class="icon mgr16 water-total" />
                        <div class="content">
                            <div class="title">
                                供水总量
                            </div>
                            <div class="value">
                                <span>{{ waterVolume.supply || 0 }}</span><span class="unit">m³</span>
                            </div>
                        </div>
                    </div>
                    <div class="water-statistics-panel water-statistics__leakage">
                        <div class="icon mgr16 water-leakage" />
                        <div class="content">
                            <div class="title">
                                漏损水量
                            </div>
                            <div class="value">
                                <span>{{ waterVolume.ullage || 0 }}</span><span class="unit">m³</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="water-statistics__percent">
                    <div class="title">
                        漏损率
                    </div>
                    <div class="content">
                        {{ waterVolume.per || 0 }}%
                    </div>
                    <div class="online-data">
                        <div class="label">
                            在线/断线
                        </div>
                        <div class="value">
                            <span class="online">{{ onlineData.online }}</span>
                            <span class="space">/</span>
                            <span class="offline">{{ onlineData.offline }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import IpesProgressBar from '../common/IpesProgressBar.vue'
import type { Props } from './types'
import { defaultProps } from './types'

/**
 * props
 */
const props = withDefaults(defineProps<Props>(), {
    ...defaultProps
})

// emits
const emits = defineEmits({
    onTimeTypeChange: (value: string) => value,
})

// data
// 时间类型
const _timeType = ref<string>(props.timeType)
const now = ref<string>(dayjs().format('YYYY-MM-DD HH:mm'))

const timeLabel = computed(() => {
    enum format {
        year = 'YYYY',
        month = 'YYYY-MM',
        day = 'YYYY-MM-DD',
    }
    type formatType = keyof typeof format
    return dayjs().format(format[_timeType.value as formatType])
})

// methods
const handleTimeTypeChange = (value: string) => {
    emits('onTimeTypeChange', value)
}
</script>

<script lang="ts">
export default {
    name: 'DvIpesWaterNetworkManage',
    title: '园区供水管网管理'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
