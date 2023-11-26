<!--
 * @Author: Tian
 * @Date: 2023-06-27 19:02:52
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 15:35:00
 * @Description: 上游断面最近报警统计
-->
<template>
    <div class="dv-wgms-upstream-section">
        <div class="section-correlation-table">
            <div class="section-correlation-list header">
                <span class="sort" />
                <span class="name" />
                <div class="progress">
                    <span class="text">氮</span>
                    <span class="text">磷</span>
                </div>
                <span class="alarm">报警数</span>
            </div>
            <div v-for="(item, index) in relativeData" :key="index" class="section-correlation-list">
                <span class="sort">{{ index + 1 }}</span>
                <span class="name">{{ item.siteName }}</span>
                <div class="progress">
                    <ProgressBar :percentage="(item.nh3OverNum / item.totalOverNum) * 100" />
                </div>
                <span class="alarm red">{{ item.totalOverNum }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import ProgressBar from '../common/ProgressBar.vue'
import { getUpstreamOverData } from './api/index'
const props = defineProps({
    dataType: {
        type: [Number, String],
        default: 0
    },
    startTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    endTime: {
        type: Number,
        default: dayjs().endOf('year').valueOf()
    },
    sourceIds: {
        type: String,
        default: ''
    },
    siteCode: {
        type: String,
        default: ''
    },
    stationCode: {
        type: [Number, String],
        default: 1
    },
    timeType: {
        type: String,
        default: 'hour'
    },
})
const data = reactive({
    relativeData: [{
        siteName: '上游断面1',
        coefficientPre: 0.56,
        alarmNum: 2
    }, {
        siteName: '上游断面1',
        coefficientPre: 0.56,
        alarmNum: 2
    }, {
        siteName: '上游断面1',
        coefficientPre: 0.56,
        alarmNum: 2
    }] as Record<string, any>[],
})
// 监听参数变化
watch(() => [props.dataType, props.startTime, props.endTime, props.sourceIds, props.siteCode, props.stationCode, props.timeType], () => {
    getData()
})
/**
 * @name: getData
 * @test: test font
 * @msg: 获取数据
 * @return {*}
 */
const getData = async () => {
    const res: any = await getUpstreamOverData({
        dataType: props?.dataType,
        startTime: props?.startTime,
        endTime: props?.endTime,
        siteCode: props.siteCode, // 站点编码
        sourceIds: props?.sourceIds, // 关联的站点id
        stationCode: props?.stationCode,
        timeType: props?.timeType
    })
    data.relativeData = res?.data ?? []
}
onMounted(() => {
    getData()
})
const { relativeData } = toRefs(data)
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
