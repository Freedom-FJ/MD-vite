<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2023/6/30 10:23
 * @Description: 封闭化管理
-->
<template>
    <div class="dv-ipes-sealing-manage">
        <!-- 车辆出入园统计 S -->
        <div class="sealing-row">
            <div class="sealing-header">
                <div class="sealing-header__title">
                    <span>车辆出入园统计</span>
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
        <div class="sealing-row">
            <div class="sealing-header">
                <div class="sealing-header__title">
                    <span>园内危化品车辆</span>
                </div>
                <div class="sealing-header__extra">
                    <el-select v-model="parkType" :popper-append-to-body="false" class="fpi-select" @change="onParkTypeChange">
                        <el-option
                            v-for="item in parkOptions"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        />
                    </el-select>
                </div>
            </div>
            <div class="hazardous-statistics">
                <div class="hazardous-statistics-item">
                    <div class="hazardous-statistics-item__type">
                        {{ hazardousCar.ynCountTitle }}
                    </div>
                    <div class="hazardous-statistics-item__total">
                        <span>{{ hazardousCar.ynCount }}</span>
                    </div>
                </div>
                <div class="hazardous-statistics-item">
                    <div class="hazardous-statistics-item__type">
                        {{ hazardousCar.zxPercentTitle }}
                    </div>
                    <div class="hazardous-statistics-item__total">
                        <span>{{ hazardousCar.zxPercent.toFixed(1) }}%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import type { Props } from './types'
import { defaultProps } from './types'

/**
 * props
 */
const props = withDefaults(defineProps<Props>(), {
    ...defaultProps
})

const emit = defineEmits({
    onTimeTypeChange: (value: string) => value,
    onParkTypeChange: (value: string) => value
})

const _timeType = ref<string>(props.timeType)

const parkType = ref<string>('')
const timeLabel = computed(() => {
    enum format {
        year = 'YYYY',
        month = 'YYYY-MM',
        day = 'YYYY-MM-DD',
    }
    type formatType = keyof typeof format
    return dayjs().format(format[_timeType.value as formatType])
})

const handleTimeTypeChange = (value: string) => {
    emit('onTimeTypeChange', value)
}
const onParkTypeChange = (value: string) => {
    emit('onParkTypeChange', value)
}
</script>

<script lang="ts">
export default {
    name: 'DvIpesSealingManage',
    title: '封闭化管理'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
