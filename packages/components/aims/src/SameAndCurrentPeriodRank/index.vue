<template>
    <div :class="`${clsfix}-container`">
        <ul :class="`${clsfix}-list-header`">
            <li v-for="item in listConfig" :key="item.prop" :style="{ width: item.width }">
                {{ item.name }}
            </li>
        </ul>
        <FpiElRolling
            v-if="listData && listData.length"
            style="height: calc(100% - 32px);"
            direction="y"
            scroll-able
            :time="scrollTime"
        >
            <ul :class="`${clsfix}-list-content`">
                <li v-for="(item, index) in listData" :key="index">
                    <div
                        v-for="innerItem in listConfig"
                        :key="`${item.groupName}_${innerItem.prop}`"
                        :style="{ width: innerItem.width }"
                    >
                        <div v-if="innerItem.prop !== 'change'" :class="innerItem.prop">
                            {{
                                item[innerItem.prop as keyof typeof item]
                            }}
                        </div>
                        <div v-else :class="innerItem.prop">
                            <span class="text" :style="{ color: item.changeColor }">{{ item.change }}</span>
                            <img
                                v-if="item.change !== '--'"
                                :src="isDark ? item.changeDarkImage : item.changeWhiteImage"
                            >
                        </div>
                    </div>
                </li>
            </ul>
        </FpiElRolling>
        <BasicNoData v-else />
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, toRefs, watch } from 'vue'
import { FpiElRolling } from '@ued_fpi/element-plus-expand'
import dayjs from 'dayjs'
import BasicNoData from '../common/BasicNoData/index'
import { useThemeHook } from '../../../utils'
import type { DataItemProps, GetSingleCityRankParams, ListItemProps } from './api'
import { getSingleCityRank } from './api'

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 是否使用内置api
    isUseBuiltInApi?: boolean
    // 查询参数
    apiParams?: GetSingleCityRankParams
    // 外部数据
    data?: DataItemProps[]
}>(), {
    isUseBuiltInApi: true,
    apiParams: () => ({
        gridCode: '0101000000',
        factorCode: 'cieq',
        time: dayjs().subtract(1, 'hour').valueOf(),
        timeType: 'year'
    }),
})
/**
 * 静态常量定义
 */
const clsfix = 'dv-aims-same-and-current-period-rank'
const { isDark } = useThemeHook()

/**
 * 定义字段和属性和宽度
 */
const listConfig = computed(() => {
    return [
        {
            name: '区域',
            prop: 'groupName',
            width: '110px'
        },
        {
            name: '本期',
            prop: 'rank',
            width: '82px'
        },
        {
            name: '同期',
            prop: 'samePeriodRank',
            width: '82px'
        },
        {
            name: '改善幅度',
            prop: 'change',
            width: '100px'
        }
    ]
})

/**
 * 面板数据
 */
const state = reactive<{
    listData: ListItemProps[]
    scrollTime: number
}>({
    listData: [],
    scrollTime: 5
})
const {
    listData,
    scrollTime
} = toRefs(state)

// 处理数据
const handlerData = (data: DataItemProps[]) => {
    state.listData = data.map((item) => {
        let change = ''
        let changeColor = ''
        let changeDarkImage: any = ''
        let changeWhiteImage: any = ''
        const changeNum = -Number(item.change)
        if (changeNum > 0) {
            change = `+${changeNum}`
            changeColor = 'var(--dv-color-success)'
            changeDarkImage = new URL(
                './images/green_up.png',
                import.meta.url
            )
            changeWhiteImage = new URL(
                './images/green_up_white.png',
                import.meta.url
            )
        }
        else if (changeNum < 0) {
            change = `${changeNum}`
            changeColor = 'var(--dv-color-danger)'
            changeDarkImage = new URL(
                './images/red_down.png',
                import.meta.url
            )
            changeWhiteImage = new URL(
                './images/red_down_white.png',
                import.meta.url
            )
        }
        else if (changeNum === 0) {
            change = '持平'
            changeColor = 'var(--dv-color-index)'
            changeDarkImage = new URL(
                './images/flat.png',
                import.meta.url
            )
            changeWhiteImage = new URL(
                './images/flat_white.png',
                import.meta.url
            )
        }
        else {
            change = '--'
            changeColor = 'var(--dv-color-text-primary)'
        }

        return {
            ...item,
            change,
            changeColor,
            changeDarkImage,
            changeWhiteImage,
        }
    })
    state.scrollTime = state.listData.length * 1.25
}

const fetchData = () => {
    getSingleCityRank(props.apiParams).then((res) => {
        if (res.data) {
            // res.data.push({
            //     groupName: '--',
            //     rank: '--',
            //     samePeriodRank: '--',
            //     change: '--'
            // })
            handlerData(res.data)
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
}, { deep: true })

watch(() => props.data, () => {
    if (props.data && !props.isUseBuiltInApi)
        handlerData(props.data)
}, { deep: false, immediate: true })
</script>

<style lang="scss">
@import "@ued_fpi/element-plus-expand/es/src/fpi-el-rolling/style/index.css";
@import "./style/index";
</style>
