<!--
 * @Author: mjh
 * @Date: 2023-06-30 11:11:31
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-15 10:22:05
 * @Description:
-->
<template>
    <div class="dv-wgms-environmental-analysis">
        <div class="dv-wgms-factor-box">
            <div class="dv-wgms-factor-top">
                <div class="dv-wgms-factor-top-name">
                    {{ title }}
                </div>
                <div class="dv-wgms-right-select">
                    <SelectPanel :option="selectList" :label-style="{ fontSize: '14px' }" :default-select="0" @change="keyFactorsOrMonthCheck" />
                </div>
            </div>
            <div class="dv-wgms-factor-body">
                <div v-for="item in list" :key="item.name" class="dv-wgms-factor-body-item">
                    <div class="dv-wgms-factor-value">
                        {{ typeof item.rate === 'number' ? `${item.rate}%` : '--' }}
                    </div>
                    <img v-if="isDark" class="dv-wgms-fator-pie" src="./images/percent-bg-dark.png">
                    <img v-if="!isDark" class="dv-wgms-fator-pie" src="./images/percent-bg-light.png">
                    <!-- <img :src="getImg(`./images/icon-${isDark ? '' : 'light-'}${idx + 1}.svg`)" alt=""> -->

                    <div v-if="item.name.length < 5" class="dv-wgms-factor-name">
                        {{ item.name }}
                    </div>
                    <ElTooltip v-else :content="item.name" placement="top" effect="dark">
                        <div class="dv-wgms-factor-name">
                            {{ item.name }}
                        </div>
                    </ElTooltip>
                </div>
                <div v-if="!list.length" class="dv-wgms-environmental-no-data">
                    暂无数据
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { PropType } from 'vue'
import { onMounted, reactive, toRefs, watch } from 'vue'
import SelectPanel from '../common/select-panel.vue'
import { useThemeHook } from '../../../utils'
import { factor, getKeyArea, month } from './api'
import type { AllTypes, SelectListItem, mainMonthApiTs } from './types'
const props = defineProps({
    beginTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    endTime: {
        type: Number,
        default: dayjs().endOf('year').valueOf()
    },
    factorGroupId: {
        type: [Number, String],
        default: 8
    },
    treeId: {
        type: [Number, String],
        default: 3301
    },
    treeType: {
        type: Number,
        default: 1
    },
    title: {
        type: String,
        default: '断面达标率后三名'
    },
    type: {
        type: String as PropType<AllTypes>,
        default: 'factor'
    },
    limitType: {
        type: String as PropType<'bottom' | 'top'>,
        default: 'top'
    },
    limitNum: {
        type: Number,
        default: 3
    },
    selectList: {
        type: Array as PropType<SelectListItem[]>,
        default: () => ([
            { label: '国控', value: '001' },
            { label: '省控', value: '001,002' },
            { label: '市控', value: '001,002,003' },
            { label: '县控以上', value: '001,002,003,004' },
        ])
    },
    url: {
        type: String
    },
})
const emit = defineEmits(['selectChange'])
const { isDark } = useThemeHook()
watch(() => [props.beginTime, props.endTime, props.treeId, props.factorGroupId], () => {
    getData()
})

const data = reactive({
    currCheck: 0,
    list: [] as mainMonthApiTs[],
    currLevel: '001',
})
onMounted(async () => {
    getData()
})

/**
 * @name: 重点区域数据
 */
const getData = async (controlLevel = '001') => {
    const params = {
        treeId: props.treeId,
        treeType: props.treeType,
        beginTime: props.beginTime,
        endTime: props.endTime,
        queryTimeType: 'year',
        factorFlag: true,
        factor: props.factorGroupId,
        controlLevel,
        childFlag: 0
    }
    const res = await (props.type === 'month' ? month : props.type === 'factor' ? factor : getKeyArea)(params, { url: props.url })
    const resData = res.data || []
    data.list = props.limitType === 'top' ? resData.slice(0, props.limitNum) : resData.slice(-props.limitNum)
}

const keyFactorsOrMonthCheck = (item: { value: string; label: string }, index: number) => {
    data.currLevel = item.value
    getData(data.currLevel)
    emit('selectChange', item, index)
}

const { list } = toRefs(data)
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
