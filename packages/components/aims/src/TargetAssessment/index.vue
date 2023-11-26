<template>
    <div :class="`${clsfix}-container`">
        <div :class="`${clsfix}-header`">
            <div :class="`${clsfix}-header-item`">
                达标城市：{{ upToStandardNum }}
            </div>
            <div :class="`${clsfix}-header-item`">
                未达标城市：{{ notUpToStandardNum }}
            </div>
        </div>
        <div :class="`${clsfix}-list-wrap`">
            <ul :class="`${clsfix}-list-header`">
                <li v-for="item in listConfig" :key="item.prop" :style="{ width: item.width }">
                    {{ item.name }}
                </li>
            </ul>
            <FpiElRolling
                v-if="listData && listData.length"
                style="height: calc(100% - 27px);"
                direction="y"
                scroll-able
                :time="scrollTime"
            >
                <ul :class="`${clsfix}-list-content`">
                    <li v-for="item in listData" :key="item.id">
                        <span
                            v-for="innerItem in listConfig"
                            :key="`${item.id}_${innerItem.prop}`"
                            :style="{ width: innerItem.width, color: innerItem.prop === 'targetStatusName' ? item.targetStatusColor : undefined }"
                        >
                            {{ item[innerItem.prop as keyof typeof item] }}{{ innerItem.prop.includes('Value') ? '%' : '' }}
                        </span>
                    </li>
                </ul>
            </FpiElRolling>
            <BasicNoData v-else />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FpiElRolling } from '@ued_fpi/element-plus-expand'
import { onMounted, reactive, toRefs, watch } from 'vue'
import dayjs from 'dayjs'
import BasicNoData from '../common/BasicNoData'
import { type GetScreenCityListParams, getScreenCityList } from './api'
import type { StateProps } from './type'
/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 是否使用内置api
    isUseBuiltInApi?: boolean
    // 查询参数
    apiParams?: GetScreenCityListParams
    // 外部数据
    data?: Partial<StateProps>
}>(), {
    isUseBuiltInApi: true,
    apiParams: () => ({
        year: dayjs().valueOf(),
        gridLevel: 'city',
        gridCode: '01010000',
        itemCode: 'fineRate',
        targetTypeCode: 'annuallyTarget',
    }),
})
/**
 * 定义 emits
 */
// defineEmits({})
/**
 * 静态常量定义
 */
const clsfix = 'dv-aims-target-assessment'
const listConfig = [
    {
        name: '序号',
        prop: 'rank',
        width: '40px'
    },
    {
        name: '城市',
        prop: 'gridName',
        width: '96px'
    },
    {
        name: '目标',
        prop: 'targetValue',
        width: '80px'
    },
    {
        name: '实测',
        prop: 'realValue',
        width: '80px'
    },
    {
        name: '完成情况',
        prop: 'targetStatusName',
        width: '80px'
    }
]

/**
 * 面板数据
 */
const state = reactive<StateProps>({
    upToStandardNum: '--',
    notUpToStandardNum: '--',
    listData: [],
    scrollTime: 10
})
const { upToStandardNum, notUpToStandardNum, listData, scrollTime } = toRefs(state)

// 考核状态(0:未开始，1：暂未达标，2：暂时达标，3：未达标，4：已达标)  字段名 ： target_status
const targetStatusMap: any = {
    0: 'var(--dv-color-text-primary)',
    1: 'var(--dv-color-danger)',
    2: 'var(--dv-color-success)',
    3: 'var(--dv-color-danger)',
    4: 'var(--dv-color-success)',
}
const fetchData = () => {
    getScreenCityList(props.apiParams).then((res) => {
        if (res.data) {
            state.upToStandardNum = String(res.data.compliance)
            state.notUpToStandardNum = String(res.data.notCompliance)
            state.listData = res.data.cityTargetVos.map((c, index) => ({ ...c, rank: index + 1, targetStatusColor: targetStatusMap[c.targetStatus] || 'var(--dv-color-text-primary)' }))
            state.scrollTime = state.listData.length * 1.25
        }
    })
}

onMounted(() => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch(() => props.apiParams, () => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch(() => props.data, () => {
    if (!props.isUseBuiltInApi && props.data) {
        state.upToStandardNum = props.data.upToStandardNum!
        state.notUpToStandardNum = props.data.notUpToStandardNum!
        state.listData = props.data.listData!.map((c, index) => ({ ...c, rank: index + 1, targetStatusColor: targetStatusMap[c.targetStatus || 'null'] || 'var(--dv-color-text-primary)' }))
        state.scrollTime = props.data.listData!.length * 1.25
    }
    Object.assign(state, props.data)
})
</script>

<style lang="scss">
@import "@ued_fpi/element-plus-expand/es/src/fpi-el-rolling/style/index.css";
@import "./style/index";
</style>
