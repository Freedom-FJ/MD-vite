<template>
    <div class="dv-bmp-algae-monitoring-box">
        <div class="algae-monitoring-rate">
            <div class="decorate-outer" />
            <ProgressBar :rate="0.75" />
            <div class="decorate-inner">
                <div v-for="item in 72" :key="item" class="decorate-inner-item" :style="{ transform: `rotate(${5 * item}deg)` }" />
            </div>
            <div class="total-warn">
                <div class="total-warn-top">
                    年累计
                </div>
                <div class="total-warn-bottom">
                    <div class="total-warn-done">
                        {{ totalWarnObj.done }}
                    </div>
                    <div class="total-warn-separator">
                        /
                    </div>
                    <div class="total-warn-total">
                        {{ totalWarnObj.total }}
                    </div>
                </div>
            </div>
        </div>
        <div class="algae-monitoring-items">
            <div class="algae-monitoring-item">
                <el-icon class="algae-icon">
                    <Bell />
                </el-icon>
                <span class="algae-title">今日预警数</span>
                <span class="algae-num">{{ todayWarnObj.total }}</span>
            </div>
            <div class="algae-monitoring-item last-item">
                <el-icon class="algae-icon">
                    <CircleCheck />
                </el-icon>
                <span class="algae-title algae-title-diff">已处理</span>
                <span class="algae-num">{{ todayWarnObj.done }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import ProgressBar from './components/ProgressBar.vue'
import { getAlgaeMonitoringWarning } from './api'
const props = defineProps({
    year: String,
    // 是否使用内置接口进行数据查询
    isUseBuiltInApi: {
        type: Boolean,
        default: true
    },
    // 不使用内部接口查询时，组件使用的数据
    data: {
        type: Object,
        default: () => {}
    }
})

const todayWarnObj = ref({
    doing: 0,
    done: 0,
    total: 0,
    undone: 0
})

const totalWarnObj = ref({
    doing: 0,
    done: 0,
    total: 0,
    undone: 0
})

// const completeRateDom = ref()

/**
 * @name: getData
 * @test: test font
 * @msg: 获取数据
 * @param {*} startTime
 * @param {*} endTime
 * @return {*}
 */
const getData = async (startTime: number, endTime: number) => {
    const params: any = {
        startTime,
        endTime,
        envTypeCodeList: ['water'],
        siteCodeList: [],
        alarmTypeCodeList: ['automonitor_wgmsCyanobacteria']
    }
    const res: any = await getAlgaeMonitoringWarning(params)
    return res?.data
}

onMounted(async () => {
    if (props.isUseBuiltInApi) {
        // 今日累计
        todayWarnObj.value = await getData(dayjs().startOf('day').valueOf(), dayjs().valueOf())
        // 总计
        totalWarnObj.value = await getData(dayjs().startOf('year').valueOf(), dayjs().valueOf())
    }
    else {
        todayWarnObj.value = props.data.todayWarnObj
        totalWarnObj.value = props.data.totalWarnObj
    }
})
</script>

<style lang="scss" scoped>
@import "./styles/index";
</style>
