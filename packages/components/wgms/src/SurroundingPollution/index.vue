<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-11 14:52:45
 * @Description: 研判分析：周边污染影响
-->
<template>
    <div class="dv-wgms-surrounding-pollution">
        <div class="surrounding-two-flex">
            <div class="surrounding-two-left surrounding-comm-box">
                <div class="title-box">
                    <span class="title">重点源超标率前三</span>
                    <div class="right-options">
                        <SelectPanel :option="factorList" @change="checkFactor" />
                    </div>
                </div>
                <div v-if="pomsAlarmData.length" class="impact-list">
                    <div v-for="(item, index) in pomsAlarmData" :key="index" class="impact-list-every">
                        <span class="sort">{{ item.rank }}</span>
                        <span class="name" :title="item.siteName">{{ item.siteName }}</span>
                        <span class="num">{{ item.alarmNum }}</span>
                    </div>
                </div>
                <div v-else class="empty-data">
                    暂无数据
                </div>
            </div>
            <div class="surrounding-two-right surrounding-comm-box">
                <div class="name-num-box pd10">
                    <span class="name">异常溢流口统计</span>
                    <span class="num red">{{ typeof overflowPortNum === 'number' ? overflowPortNum : '--' }}</span>
                </div>
            </div>
        </div>
        <div class="surrounding-two-flex">
            <div class="surrounding-two-left surrounding-comm-box">
                <div class="title-box">
                    <span class="title">重点源波动率前三</span>
                </div>
                <div v-if="pomsAnalysisData.length" class="impact-list">
                    <div v-for="(item, index) in pomsAnalysisData" :key="index" class="impact-list-every">
                        <span class="sort">{{ index + 1 }}</span>
                        <span class="name" :title="item.companyName">{{ item.companyName }}</span>
                        <span class="num">{{ item.adjacentPre }}</span>
                    </div>
                </div>
                <div v-else class="empty-data">
                    暂无数据
                </div>
            </div>
            <div class="surrounding-two-right surrounding-comm-box">
                <div class="name-num-box pd10">
                    <span class="name">周边未处置事件</span>
                    <div class="num-box">
                        <span class="num red">{{ boundaryData.disposal }}</span>
                        <span class="split">/</span>
                        <span class="total">{{ boundaryData.total }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="surrounding-three-flex">
            <div class="surrounding-three-item surrounding-comm-box different">
                <div class="name-num-box">
                    <span class="name">异常入河排污口</span>
                    <span class="num red">5</span>
                </div>
            </div>
            <div class="surrounding-three-item surrounding-comm-box">
                <div class="name-num-box">
                    <span class="name">问题小区</span>
                    <span class="num red">5</span>
                </div>
            </div>
            <div class="surrounding-three-item surrounding-comm-box">
                <div class="name-num-box">
                    <span class="name">问题园区</span>
                    <span class="num red">5</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { onMounted, reactive, toRefs, watch } from 'vue'
import SelectPanel from '../common/select-panel.vue'
import { countEventStatusByTimePoint, pomsAlarm, queryFactorGroup } from './api'
const props = defineProps({
    startTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    endTime: {
        type: Number,
        default: dayjs().endOf('year').valueOf()
    },
    factor: {
        type: Number,
        default: 27
    },
    timeType: {
        type: String,
        default: 'hour'
    },
    // 距离
    distance: {
        type: Number,
        default: 10000
    },
    // 溢流口统计
    overflowPortNum: {
        type: [Number, String],
        default: ''
    },
    // 站点列表
    accessCodeList: {
        type: Array,
        default: () => {
            return [] as string[]
        }
    },
    timeStamp: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    // 经纬度
    latitude: {
        type: Number,
        default: 30.3992
    },
    longitude: {
        type: Number,
        default: 119.9681
    },
    limit: {
        type: Number,
        default: 3
    },
    minWave: {
        type: Number,
        default: 2
    }
})
const data = reactive({
    pomsAlarmData: [] as Record<string, any>[],
    pomsAnalysisData: [] as Record<string, any>[],
    factorList: [] as any[],
    curFactor: '',
    boundaryData: {
        disposal: 0,
        total: 0
    }, // 周边未处置事件
    factorsObj: {} as any
})
/**
 * @name: getFactorLists
 * @test: test font
 * @msg: 获取因子列表
 * @return {*}
 */
const getFactorLists = async () => {
    const res: any = await queryFactorGroup({
        code: 'companyPollutionSource'
    })
    const factorsObj = res && res.length ? res[0] : null
    data.factorsObj = factorsObj
    const factors = factorsObj?.factors ?? []
    const factorList = factors.map((item: Record<string, any>) => {
        return { ...item, label: item.factorIndexName, value: item.id }
    })
    const codes: string[] = []
    factorList.forEach((item: Record<string, any>) => {
        codes.push(item.factorIndexCode)
    })
    const defaultFactor: any = { value: data.factorsObj?.id, label: '所有因子' }
    factorList.unshift(defaultFactor)
    data.factorList = factorList
    data.curFactor = data.factorList[0].value
}
/**
 * @name: getPomsAlarm
 * @test: test font
 * @msg: 重点源预警
 * @return {*}
 */
const getPomsAlarm = async () => {
    const selectedFactor = (data.factorList.find((item: any) => item.value === data?.curFactor) as any)?.label
    const params: any = {
        queryTimeType: props?.timeType,
        beginTime: props.startTime,
        endTime: props.endTime,
        factorFlag: selectedFactor === '所有因子' || !selectedFactor,
        factor: data?.curFactor,
        longitude: props.longitude,
        latitude: props.latitude,
        distance: props.distance / 1000,
        limit: props?.limit
    }
    const res: any = await pomsAlarm(params)
    data.pomsAlarmData = []
    if (res?.data && res?.data.length > 0) {
        data.pomsAlarmData = res.data.slice(0, 3)
        data.pomsAlarmData.forEach((item) => {
            item.alarmNum = Number(item.alarmNum)
        })
    }
}
/**
 * @name: checkFactor
 * @test: test font
 * @msg:
 * @param {*} val
 * @return {*}
 */
const checkFactor = (val: { label: string; value: string }) => {
    data.curFactor = val.value
    getPomsAlarm()
}
/**
 * @name: getPomsAnalysis
 * @test: test font
 * @msg: 重点波动率
 * @return {*}
 */
const getPomsAnalysis = async () => {
    const params = {
        queryTimeType: props?.timeType,
        beginTime: props.startTime,
        endTime: props.endTime,
        factorFlag: false,
        factor: props?.factor,
        longitude: props.longitude,
        latitude: props.latitude,
        distance: props.distance / 1000,
        limit: props?.limit,
        minWave: props?.minWave
    }
    const res: any = await pomsAlarm(params)
    const resData = res?.data || []
    data.pomsAnalysisData = resData.slice(0, 3)
}
/**
 * @name: getBoundaryAnalysis
 * @test: test font
 * @msg: 周边事件
 * @return {*}
 */
const getBoundaryAnalysis = async () => {
    const params: any = {
        envTypeCodeList: ['water'],
        siteCodeList: props.accessCodeList, // res,
        timeStamp: props.timeStamp, // 报警时间
        centerLatitude: props.latitude, // 纬度
        centerLongitude: props.longitude // 经度
    }
    const res: any = await countEventStatusByTimePoint(params)
    if (res?.success && res?.data) {
        data.boundaryData.disposal = res.data.notDisposedCount
        data.boundaryData.total = res.data.totalCount
    }
}
// 监听参数变化
watch(() => [props.startTime, props.endTime, props.factor, props.timeType, props.distance, props.limit, props.minWave], () => {
    getPomsAlarm()
    getPomsAnalysis()
})
// 监听因子变化
watch(() => [props.latitude, props.longitude], () => {
    getBoundaryAnalysis()
    getPomsAlarm()
    getPomsAnalysis()
})
// 监听因子变化
watch(() => [props.accessCodeList, props.timeStamp], () => {
    getBoundaryAnalysis()
})
onMounted(() => {
    getFactorLists()
    getPomsAlarm()
    getPomsAnalysis()
    getBoundaryAnalysis()
})
const { pomsAlarmData, pomsAnalysisData, factorList, curFactor, boundaryData } = toRefs(data)
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
