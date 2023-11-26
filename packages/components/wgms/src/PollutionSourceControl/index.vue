<!--
 * @Author: mjh
 * @Date: 2023-06-30 11:11:31
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-25 10:21:08
 * @Description:
-->
<template>
    <div class="dv-wgms-pollution-source">
        <div class="dv-wgms-key-source">
            <div class="dv-wgms-title-text">
                <div class="dv-wgms-text">
                    重点源超标前三
                </div>
                <div class="dv-wgms-select">
                    <SelectPanel :option="keySelectList" :default-value="curSelectFactor" @change="keyFactorsCheck" />
                </div>
            </div>
            <el-scrollbar class="dv-wgms-key-list">
                <div v-for="item, index in companyList" :key="index" class="dv-wgms-key-one">
                    <div class="dv-wgms-top">
                        <div class="dv-wgms-left">
                            <span>{{ item.rank }}</span><span>{{ item.pomsName }}</span>
                        </div>
                        <div class="dv-wgms-right">
                            {{ item.overCount }}
                        </div>
                    </div>
                    <div class="dv-wgms-bar">
                        <ProgressBar active-color="linear-gradient(270deg, var(--dv-color-danger) 0%, var(--dv-color-danger-30) 100%)" :handle-style="{ background: 'var(--dv-color-danger)' }" :percentage="item.overCount / overCountMax * 100" />
                    </div>
                </div>
            </el-scrollbar>
        </div>
        <div class="dv-wgms-statistic-content">
            <div class="dv-wgms-statistic-box">
                <div class="dv-wgms-text">
                    重点源超标统计
                </div>
                <div class="dv-wgms-total-content">
                    <div class="dv-wgms-left">
                        总数
                    </div>
                    <div class="dv-wgms-right">
                        <div class="dv-wgms-num">
                            {{ totalCount }}
                        </div>
                        <div ref="statChart" class="dv-wgms-chart">
                            <BaseECharts :options="option" />
                        </div>
                    </div>
                </div>
                <div class="dv-wgms-legend">
                    <div v-for="item, index in chartDetail" :key="index" class="dv-wgms-legend-one">
                        <div class="dv-wgms-left">
                            <div class="dv-wgms-circle" :style="{ background: colorList[index] }" />
                            <div class="dv-wgms-name">
                                {{ item.name || '--' }}
                            </div>
                        </div>
                        <div class="dv-wgms-right">
                            <span>{{ item.value ?? '--' }}</span>
                            <span>/</span>
                            <span>{{ item.percent ?? '--' }}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dv-wgms-statistic-box">
                <div class="dv-wgms-text">
                    入河排污口
                </div>
                <div class="dv-wgms-port-list">
                    <div class="dv-wgms-port-one">
                        <div class="dv-wgms-name">
                            氮超标
                        </div>
                        <div class="dv-wgms-value">
                            <span>{{ nh3OverNum }}</span><span>个</span>
                        </div>
                    </div>
                    <div class="dv-wgms-port-one">
                        <div class="dv-wgms-name">
                            磷超标
                        </div>
                        <div class="dv-wgms-value">
                            <span>{{ tpOverNum }}</span><span>个</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { maxBy } from 'lodash-es'
import type { PropType } from 'vue'
import { onMounted, reactive, toRefs } from 'vue'
import dayjs from 'dayjs'
import { pollutionSourcePieOptions } from '../../utils/echarts/echartsOptions'
import BaseECharts from '../../utils/echarts/BaseECharts.vue'
import ProgressBar from '../common/ProgressBar.vue'
import SelectPanel from '../common/select-panel.vue'
import type { selectPanelTs } from '../../types/common'
import type { POLLUTION_SOURCE_API_RESPONSE } from './api/types'
import { pomsAlarm, pomsFactorAlarm, portToRiver } from './api'

const props = defineProps({
    factorList: {
        type: Array as PropType<Array<{
            label: string
            value: string
        }>>,
        default: () => []
    },
    beginTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    endTime: {
        type: Number,
        default: dayjs().endOf('year').valueOf()
    },
    defaultSelectFactor: {
        type: String,
        default: ''
    },
    distance: {
        type: Number,
        default: 3000
    },
    siteCode: {
        type: [Number, String],
        default: 'zaoleishougong'
    },
    stationCode: {
        type: [Number, String],
        default: 1
    },
    timeType: {
        type: String,
        default: 'day'
    },
    isHandle: {
        type: Boolean,
        default: false
    },
    isLazy: {
        type: Boolean,
        default: false
    },
    data: {
        type: Array,
        default: undefined
    }
})
const emits = defineEmits(['factorChange'])
const data = reactive({
    companyList: [] as POLLUTION_SOURCE_API_RESPONSE.pomsAlarm[],
    curSelectFactor: props.defaultSelectFactor,
    overCountMax: 0,
    chartDetail: [] as {
        value: string | number
        percent: string | number
        name: string
        itemStyle: Record<string, any>
    }[],
    colorList: ['var(--dv-color-danger)', 'var(--dv-color-primary)', 'var(--dv-color-success)'],
    nh3OverNum: 0,
    tpOverNum: 0,
    totalCount: 0
})
const statChart = ref(null)

watch(() => props.defaultSelectFactor, (defaultSelectFactor) => {
    data.curSelectFactor = defaultSelectFactor
    if (props.isLazy) return
    keyPollutionData()
})

watch([
    () => props.beginTime,
    () => props.endTime,
    () => props.distance,
    () => props.siteCode,
    () => props.stationCode,
    () => props.timeType,
    () => props.isHandle
], () => {
    data.curSelectFactor = props.defaultSelectFactor
    if (props.isLazy) return
    keyPollutionData()
    getPortData()
    keyPollutionStatistic()
})
const keySelectList = computed<selectPanelTs[]>(() => {
    return [
        { label: '所有因子', value: '' },
        ...props.factorList
    ]
})
const keyFactorsCheck = (item: { value: string; code: string }, index: number) => {
    if (data.curSelectFactor === item.code) return
    data.curSelectFactor = item.code
    emits('factorChange', item.code)
    keyPollutionData()
}

const option = ref<any>()
onMounted(() => {
    if (props.isLazy) return
    keyPollutionData()
    getPortData()
    keyPollutionStatistic()
})

// 重点源超标前三
const keyPollutionData = async () => {
    const res = await pomsAlarm({
        distance: props.distance,
        dataType: props.isHandle ? 1 : 0,
        startTime: props.beginTime,
        endTime: props.endTime,
        siteCode: props.siteCode,
        factorCodes: data.curSelectFactor,
        stationCode: props.stationCode,
        timeType: props.timeType
    })
    if (res.data?.length) {
        // 获取前三
        data.companyList = res.data.slice(0, 3)
        const maxObj = maxBy(data.companyList, 'overCount')
        data.overCountMax = maxObj.overCount
    }
    else {
        data.companyList = []
    }
}
// 入河排污口接口联调
const getPortData = async () => {
    const res = await portToRiver({
        distance: props.distance,
        dataType: props.isHandle ? 1 : 0,
        startTime: props.beginTime,
        endTime: props.endTime,
        siteCode: props.siteCode,
        factorCodes: '',
        stationCode: props.stationCode,
        timeType: props.timeType
    })
    data.nh3OverNum = res.data?.noverCount ?? 0
    data.tpOverNum = res.data?.poverCount ?? 0
}
// 重点源超标统计
const keyPollutionStatistic = async () => {
    const res = await pomsFactorAlarm({
        distance: props.distance,
        dataType: props.isHandle ? 1 : 0,
        startTime: props.beginTime,
        endTime: props.endTime,
        siteCode: props.siteCode,
        factorCodes: '',
        stationCode: props.stationCode,
        timeType: props.timeType
    })
    const resData = res.data
    const total = resData?.totalCount ?? 0
    data.totalCount = total
    const dataList = [
        { name: '氮超标', value: resData?.ncount ?? '--', percent: resData?.npercent ?? '--' },
        { name: '磷超标', value: resData?.pcount ?? '--', percent: resData?.ppercent ?? '--' },
        { name: '其他', value: resData?.otherCount ?? '--', percent: resData?.otherPercent ?? '--' },
    ]
    data.chartDetail = dataList.map((item, index) => {
        return {
            ...item,
            itemStyle: { color: data.colorList[index] }
        }
    })
    const seriesData = [
        ...data.chartDetail,
    ]
    option.value = pollutionSourcePieOptions(seriesData)
}
const { companyList, colorList, nh3OverNum, tpOverNum, totalCount, chartDetail, overCountMax, curSelectFactor } = toRefs(data)

defineExpose({
    keyPollutionData,
    getPortData,
    keyPollutionStatistic,
})
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
