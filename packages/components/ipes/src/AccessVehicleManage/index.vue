<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2023/6/30 10:23
 * @Description: 车辆出入园统计
-->
<template>
    <div class="dv-ipes-access-vehicle">
        <!-- 车辆出入园统计 S -->
        <div class="access-row">
            <div class="access-header">
                <div class="access-header__title">
                    <span>车辆出入园统计</span>
                    <span class="access-header__title--sub">（{{ timeLabel }}）</span>
                </div>
                <div class="access-header__extra">
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
            <div class="access-statistics">
                <div v-for="(item, idx) in accessStatistic" :key="idx" class="access-statistics-item" :class="`access-statistics-item--${item.type}`">
                    <div class="access-statistics-item__total">
                        {{ item.value }}
                    </div>
                    <div class="access-statistics-item__type">
                        {{ item.label }}
                    </div>
                </div>
            </div>
        </div>
        <!-- 园内危化品车辆 S -->
        <div class="access-row">
            <div class="access-header">
                <div class="access-header__title">
                    <span>车辆出入园记录</span>
                    <span class="access-header__title--sub">（{{ today }}）</span>
                </div>
            </div>
            <div class="access-list">
                <el-scrollbar
                    height="220px"
                >
                    <el-empty v-show="!accessRecord.length" :image-size="140" :image="noDataImg" description="" />
                    <template v-for="(item, key) in accessRecord">
                        <div
                            v-if="item"
                            :key="key"
                            class="access-list-item"
                            :class="{ 'access-list-item--active': key === activeIndex }"
                            @click="handleCheck(key, item)"
                        >
                            <div class="access-list-item__info">
                                <div class="access-list-item__type" :class="`access-list-item__type--${item.crossType === '入园' ? 'entry' : 'exit'}`">
                                    {{ item.crossType }}
                                </div>
                                <div class="access-list-item__vehicle">
                                    {{ item.plateNo }}
                                </div>
                            </div>
                            <div class="access-list-item__time">
                                {{ item.crossTime }}
                            </div>
                        </div>
                    </template>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref, withDefaults } from 'vue'
import noDataImg from '../common/images/new-nodata.svg'
import type { Props } from './types'
import { defaultProps } from './types'

/**
 * props
 */
const props = withDefaults(defineProps<Props>(), {
    ...defaultProps
})

/**
 * emits
 */
const emits = defineEmits({
    onTimeTypeChange: (value: string) => value,
    onRecordCheck: (idx: number, value: any) => value,
})

// data
const _timeType = ref<string>(props.timeType)
// 当天日期
const today = ref<string>(dayjs().format('YYYY-MM-DD'))
// 选中的出入园记录
const activeIndex = ref<number>(-1)

// computed
// 时间展示标签
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

const handleCheck = (idx: number, value: any) => {
    activeIndex.value = idx
    emits('onRecordCheck', idx, value)
}
</script>

<script lang="ts">
export default {
    name: 'DvIpesAccessVehicleManage',
    title: '车辆出入园统计'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
