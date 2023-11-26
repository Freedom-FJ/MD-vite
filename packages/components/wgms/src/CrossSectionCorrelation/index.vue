<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 15:35:07
 * @Description: 断面相关性系数排名及最近报警统计
-->
<template>
    <div class="dv-wgms-cross-section-correlation">
        <div class="section-correlation-table">
            <div class="section-correlation-list header">
                <span class="sort" />
                <span class="name" />
                <span class="progress" />
                <span class="correlation-coefficient">相关系数</span>
                <span class="alarm">报警数</span>
            </div>
            <div v-for="(item, index) in relativeData" :key="index" class="section-correlation-list">
                <span class="sort">{{ index + 1 }}</span>
                <span class="name" :title="item.label">{{ item.label }}</span>
                <div class="progress">
                    <ProgressBar :percentage="item.coefficientDoubleValue * 100" />
                </div>
                <span class="correlation-coefficient green">{{ item.coefficientDoubleValue || '--' }}</span>
                <span class="alarm red">{{ item.alarmNum || '--' }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { nextTick, onMounted, reactive, toRefs, watch } from 'vue'
import ProgressBar from '../common/ProgressBar.vue'
import { correlationAnalysis } from './api'
const props = defineProps({
    time: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    analysisTime: {
        type: Number,
        default: 27
    },
    beginTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    endTime: {
        type: Number,
        default: dayjs().endOf('year').valueOf()
    },
    accessCode: {
        type: String,
        default: ''
    },
    targetFactorId: {
        type: Number,
        default: 27
    },
    queryTimeType: {
        type: String,
        default: 'hour'
    },
    sourceFactors: {
        type: String,
        default: ''
    },
    delayedFlag: {
        type: Boolean,
        default: true
    },
    filterEmpty: {
        type: Boolean,
        default: false
    },
    limit: {
        type: Number,
        default: 3
    }
})
const data = reactive({
    relativeData: [] as Record<string, any>[],
    firstAlarmNum: '',
    params: {
        time: 1653926400000,
        analysisTime: 24,
        accessCode: 'GKA330100_2009',
        targetFactorId: 27,
        queryTimeType: 'hour',
        beginTime: 1653926400000,
        endTime: 1656691200000,
        sourceFactors: '',
        delayedFlag: true,
        filterEmpty: false,
        limit: 3
    } as any
})

/**
 * @name: getData
 * @test: test font
 * @msg: 获取数据
 * @return {*}
 */
const getData = async () => {
    const res: any = await correlationAnalysis(data.params)
    const resData = res.data || []
    data.relativeData = resData.map((item: Record<string, any>) => {
        return {
            label: item.name,
            alarmNum: item.alarmCount,
            coefficientDoubleValue: item.corr
        }
    })
}
/**
 * @name: initData
 * @test: test font
 * @msg: 初始化数据
 * @return {*}
 */
const initData = () => {
    data.params = {
        time: props.time,
        analysisTime: props.analysisTime,
        accessCode: props.accessCode,
        targetFactorId: props.targetFactorId,
        queryTimeType: props.queryTimeType,
        beginTime: props.beginTime,
        endTime: props.endTime,
        sourceFactors: props.sourceFactors,
        delayedFlag: props.delayedFlag,
        filterEmpty: props.filterEmpty,
        limit: props.limit,
    }
    getData()
}
// 监听参数变化
watch(() => [props.time, props.analysisTime, props.accessCode, props.targetFactorId, props.queryTimeType, props.beginTime, props.endTime, props.sourceFactors, props.delayedFlag, props.filterEmpty, props.limit], () => {
    initData()
})
onMounted(async () => {
    await nextTick()
    initData()
})
const { relativeData, params } = toRefs(data)
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
