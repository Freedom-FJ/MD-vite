<template>
    <div :class="`${clsfix}-container`">
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
                        <div
                            v-for="innerItem in listConfig"
                            :key="`${item.id}_${innerItem.prop}`"
                            :style="{ width: innerItem.width }"
                        >
                            <div v-if="innerItem.prop === 'changeValue'" class="period">
                                <span class="value" :style="{ color: item.ratioColor }">{{ item.changeValue === '--' ? '--' : `${Math.abs(Number(item.changeValue))}%` }}</span>
                                <img
                                    v-if="item.changeValue !== '--'"
                                    :class="item.arrowClass"
                                    :src="isDark ? item.arrowUrl : item.whiteArrowUrl"
                                >
                            </div>
                            <div v-else :class="innerItem.prop === 'name' ? '' : 'value'">
                                {{
                                    item[innerItem.prop as keyof typeof item]
                                }}
                            </div>
                        </div>
                    </li>
                </ul>
            </FpiElRolling>
            <BasicNoData v-else />
        </div>
    </div>
</template>

<script setup lang="ts">
import { FpiElRolling } from '@ued_fpi/element-plus-expand'
import dayjs from 'dayjs'
import BasicNoData from '../common/BasicNoData/index'
import { useThemeHook } from '../../../utils'
import { getContributionAnalyze, getExcellentRate } from './api'
import type { PropGetContributionAnalyzeDataParams } from './api'
import type { StateProps } from './type'
/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 是否使用内置api
    isUseBuiltInApi?: boolean
    // 查询参数
    apiParams?: PropGetContributionAnalyzeDataParams
    // 排名类型-综合指数,优良率
    rankType?: string
    // 外部数据
    data?: StateProps
    areaType?: 'city' | 'province'
}>(), {
    isUseBuiltInApi: true,
    rankType: 'cieq', // excellent优良率，默认综合指数排名cieq
    apiParams: () => ({
        gridCode: '0101000000',
        startTime: dayjs().startOf('year').valueOf(),
        endTime: dayjs().endOf('year').valueOf(),
        order: 'currentValue',
        isAsc: false,
        type: 'grid',
    }),
    areaType: 'city'
})
const { isDark } = useThemeHook()
/**
 * 静态常量定义
 */
const clsfix = 'dv-aims-cieq-contributio-andlysis'
const listConfig = computed(() => {
    return [
        {
            name: '排名',
            prop: 'rank',
            width: '64px'
        },
        {
            name: props.areaType === 'province' ? '城市' : '区域',
            prop: 'name',
            width: '80px'
        },
        {
            name: '本期',
            prop: 'currentValue',
            width: '72px'
        },
        {
            name: '同期',
            prop: 'pastValue',
            width: '72px'
        },
        {
            name: '变化率',
            prop: 'changeValue',
            width: '88px'
        }
    ]
})

/**
 * 面板数据
 */
const state = reactive<StateProps>({
    listData: [],
    scrollTime: 5
})
const {
    listData,
    scrollTime
} = toRefs(state)
const fetchData = () => {
    if (props.rankType === 'cieq') {
        getContributionAnalyze({ ...props.apiParams, gridLevelNickName: props.areaType }).then((res) => {
            if (res.data)
                handlerData(res.data)
        })
    }
    else if (props.rankType === 'excellent') {
        getExcellentRate({ ...props.apiParams, gridLevelNickName: props.areaType }).then((res) => {
            if (res.data && res.data.fineRate)
                handlerData(res.data.fineRate)
        })
    }
}
// 处理数据
const handlerData = (data: any) => {
    state.listData = data.map((item: any) => {
        const obj = {
            ...item
        }
        // 综合指数
        obj.ratioColor
            = obj.changeValue > 0
                ? 'var(--dv-color-success)'
                : obj.changeValue < 0
                    ? 'var(--dv-color-danger)'
                    : obj.changeValue === 0 ? 'var(--dv-color-index)' : 'var(--dv-color-text-primary)'
        obj.arrowClass
            = obj.changeValue > 0
                ? ''
                : obj.changeValue < 0
                    ? ''
                    : 'flat'
        obj.arrowUrl = new URL(
            `./images/${
                obj.changeValue > 0
                    ? 'green_down'
                    : obj.changeValue < 0
                        ? 'red_up'
                        : 'flat'
            }.png`,
            import.meta.url
        )
        obj.whiteArrowUrl = new URL(
            `./images/${
                obj.changeValue > 0
                    ? 'green_down_white'
                    : obj.changeValue < 0
                        ? 'red_up_white'
                        : 'flat_white'
            }.png`,
            import.meta.url
        )
        return obj
    })
}
onMounted(() => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch([() => props.apiParams, () => props.areaType], () => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch(() => props.data, () => {
    if (!props.isUseBuiltInApi && props.data) {
        Object.assign(state, props.data)
        handlerData(props.data.listData)
    }
}, { deep: false, immediate: true })
</script>

<style lang="scss">
@import "@ued_fpi/element-plus-expand/es/src/fpi-el-rolling/style/index.css";
@import "./style/index";
</style>
