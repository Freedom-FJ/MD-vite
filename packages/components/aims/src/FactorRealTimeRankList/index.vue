<!--
 * @Author: mjh
 * @Date: 2023-07-18 18:45:29
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-18 19:07:43
 * @Description:
-->
<template>
    <div :class="`${clsfix}-container`">
        <ul v-if="isLoaded && showList.length" :class="`${clsfix}-header`">
            <li />
            <li>
                <span>{{ columnNames[0] }}</span>
            </li>
            <li>{{ columnNames[1] }}</li>
        </ul>
        <FpiElRolling v-if="isLoaded && showList.length" style="height: calc(100% - 26px);" direction="y" scroll-able :time="time">
            <ul :class="`${clsfix}-list-wrap`">
                <li v-for="item in showList" :key="item.name" :class="`${clsfix}-list-item`">
                    <span class="rank">{{ item.rank }}</span>
                    <div class="progress-box">
                        <span class="name">{{ item.name }}</span>
                        <span class="bar">
                            <span v-show="item.showBar" class="progress-bar" :style="{ width: `${item.progress}%`, background: item.bgColor }" />
                        </span>
                    </div>
                    <span class="value" :style="{ color: item.color }">{{ item.value }}</span>
                </li>
            </ul>
        </FpiElRolling>
        <BasicNoData v-if="!isLoaded || !showList.length" />
    </div>
</template>

<script lang="ts" setup>
import { ref, shallowRef, watch } from 'vue'
import { FpiElRolling } from '@ued_fpi/element-plus-expand'
import { BASE_FACTOR, factorToColor } from 'fpi-tg-factor-tools'
import dayjs from 'dayjs'
import BasicNoData from '../common/BasicNoData'
import { getHexOpacityColor } from '../../utils/tools'
import { type GetSiteRankParams, getSiteRank } from './api'
/**
 * 定义 emits
 */

/**
 * 定义props
 */
const props = withDefaults(defineProps<{
    // 是否使用内置接口
    isUseBuiltInApi?: boolean
    // 内置接口参数
    apiParams?: GetSiteRankParams
    // 当前排名的因子编码
    factorCode?: string
    // 列名
    columnNames?: string[]
    // 使用外部数据
    list?: { rank: number | string; name: string; value: number }[]
}>(), {
    isUseBuiltInApi: true,
    apiParams: () => ({
        time: dayjs().subtract(1, 'h').valueOf(),
        gridCode: '0101000000',
        timeType: 'hour',
        siteTypeCodes: 'A91230101,A91230102,A91230103',
        type: 'site',
        isAsc: false,
    }),
    factorCode: 'aqi',
    columnNames: () => (['站点', 'AQI']),
    list: undefined
})

const clsfix = 'dv-aims-factor-realtime-rank-list'

const time = ref(10)

// 列表数据
const showList = shallowRef<any[]>([])
const isLoaded = ref(false)
const findMaxValue = (list: any[]) => {
    let maxValue = 0
    list.forEach((item) => {
        if (item.value > maxValue)
            maxValue = item.value
    })
    maxValue = maxValue / 0.8
    return maxValue
}

const fetchData = () => {
    getSiteRank({ ...props.apiParams, factorCode: props.factorCode }).then((res) => {
        if (res.data && res.data.entries) {
            const key = BASE_FACTOR.find(c => c.code === props.factorCode)?.name
            const list = res.data.entries.map((item) => {
                let value = item[key as keyof typeof item]
                value = Number(value) > 0 ? Number(value) : '--'
                return {
                    rank: item.rank,
                    name: item.name,
                    value,
                }
            })
            const maxValue = findMaxValue(list)
            showList.value = list.map((item: any) => {
                const color = factorToColor(props.factorCode, item.value, 'hour')
                return {
                    ...item,
                    progress: (item.value / maxValue) * 100,
                    color,
                    bgColor: `linear-gradient(270deg, ${color} 0%, ${getHexOpacityColor(color, 0.2)} 100%)`,
                    showBar: Number(item.value) > 0
                }
            })
            time.value = showList.value.length * 1.2
            isLoaded.value = true
        }
    })
}

onMounted(() => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch([() => props.apiParams, () => props.factorCode], () => {
    if (props.isUseBuiltInApi)
        fetchData()
})

// 监听外部 list
watch([() => props.list, () => props.factorCode], () => {
    if (!props.isUseBuiltInApi && props.list) {
        const maxValue = findMaxValue(props.list)
        showList.value = props.list.map((item: any) => {
            return {
                ...item,
                progress: (item.value / maxValue) * 100,
                color: factorToColor(props.factorCode, item.value, 'hour'),
                showBar: Number(item.value) > 0
            }
        })
        time.value = showList.value.length * 1.2
        isLoaded.value = true
    }
})
</script>

<style lang="scss">
@import "@ued_fpi/element-plus-expand/es/src/fpi-el-rolling/style/index.css";
@import "./style/index";
</style>
