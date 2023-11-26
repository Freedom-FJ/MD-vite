<template>
    <div :class="`${clsfix}-container`">
        <FpiElRolling style="" direction="x" scroll-able :time="15">
            <div class="flex list" :style="{ width: `${listWidth}px` }">
                <div
                    v-for="(item, index) in factorList"
                    :key="index"
                    class="flex item"
                    :style="{ width: width(itemWidth) }"
                >
                    <div class="factorName">
                        {{ item.factorName }}
                    </div>
                    <div class="factorValue">
                        <span class="value" :style="{ color: item.color }">{{
                            item.value
                        }}</span>
                        <span class="unit">{{ item.unit }}</span>
                    </div>
                    <div v-if="item.target || item.target === 0" class="target">
                        <span class="name">目标</span>
                        <span class="value">{{ item.target }}</span>
                        <span class="unit">%</span>
                    </div>
                    <div class="period">
                        <span class="name">同比</span>
                        <span class="value" :style="{ color: item.ratioColor }">{{ Math.abs(item.ratio) }}%</span>
                        <img
                            :src="item.arrowUrl"
                            :style="{
                                transform:
                                    item.factorCode === 'fineRate'
                                        ? 'rotate(180deg)'
                                        : 'none',
                            }"
                        >
                    </div>
                </div>
            </div>
        </FpiElRolling>
    </div>
</template>

<script lang="ts" setup>
import { FpiElRolling } from '@ued_fpi/element-plus-expand'
import { nextTick, onMounted, ref } from 'vue'
import { factorToColor } from 'fpi-tg-factor-tools'
import dayjs from 'dayjs'
import {
    type GetEnvironmentStatusV2Params,
    getEnvironmentStatusV2,
} from './api'

/**
 * 定义props
 */
const props = withDefaults(
    defineProps<{
        // 是否使用内置接口
        isUseBuiltInApi?: boolean
        // 内置接口参数
        apiParams?: GetEnvironmentStatusV2Params
    }>(),
    {
        isUseBuiltInApi: true,
        apiParams: () => ({
            time: dayjs().subtract(1, 'h').valueOf(),
            gridCode: '0101010000',
            timeType: 'year',
            type: 'county',
        }),
    }
)

const clsfix = 'dv-aims-factor-target-year-period'

const width = computed(() => (itemWidth: number) => `${itemWidth}px`)
/**
 * 组件数据
 */
const cardWidth = ref<number>(400)
const listWidth = ref<number>(0)
const itemWidth = ref<number>(0)
const factorList = ref<any[]>([])
// 获取数据
const fetchData = async () => {
    getEnvironmentStatusV2(props.apiParams).then((res) => {
        if (res.data && res.data.entries) {
            const data = res.data.entries
            factorList.value = data.map((item: any) => {
                const obj: any = {
                    factorName: item.itemName,
                    factorCode: item.factorCode,
                    value: item.thisPeriodValue,
                    target: item.targetValue,
                    ratio: item.changeRate,
                    unit: item.unit,
                }
                if (item.factorCode === 'fineRate') {
                    // 优良率
                    obj.ratioColor
                        = obj.ratio > 0
                            ? '#15F3A3'
                            : obj.ratio < 0
                                ? '#F84439'
                                : '#00DEFF'
                    obj.arrowUrl = new URL(
                        `./images/${
                            obj.ratio > 0
                                ? 'green_down'
                                : obj.ratio < 0
                                    ? 'red_up'
                                    : 'flat'
                        }.png`,
                        import.meta.url
                    )
                }
                else {
                    obj.color = factorToColor(
                        item.factorCode,
                        obj.value,
                        'hour'
                    )
                    obj.ratioColor
                        = obj.ratio > 0
                            ? '#F84439'
                            : obj.ratio < 0
                                ? '#15F3A3'
                                : '#00DEFF'
                    obj.arrowUrl = new URL(
                        `./images/${
                            obj.ratio > 0
                                ? 'red_up'
                                : obj.ratio < 0
                                    ? 'green_down'
                                    : 'flat'
                        }.png`,
                        import.meta.url
                    )
                }
                return obj
            })
            nextTick(() => {
                itemWidth.value = (cardWidth.value - 12 * 2) / 4
                listWidth.value = itemWidth.value * factorList.value.length
            })
        }
    })
}
onMounted(() => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch([() => props.apiParams], () => {
    if (props.isUseBuiltInApi)
        fetchData()
})
</script>

<style lang="scss">
@import "@ued_fpi/element-plus-expand/es/src/fpi-el-rolling/style/index.css";
@import "./style/index";
</style>
