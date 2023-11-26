<template>
    <div class="dv-ipes-alarm-manage">
        <div class="module-title flex">
            <div class="title flex">
                <!-- <img class="icon mgr4" :src="modeluIconPng"> -->
                <span>报警统计</span>
                <div class="time">
                    （{{ date }}）
                </div>
            </div>
        </div>
        <div class="alarm-bar">
            <div class="flex">
                <div class="title">
                    超标报警统计
                </div>
                <div class="total">
                    {{ overProofAlarm.total }}
                </div>
            </div>
            <ProgressBar :percent="percent[0]" class="progress-bar " />
            <div class="legend flex">
                <div v-for="item in alarmOption" :key="item.key" class="legend-item flex-1">
                    <div class="flex flex-c">
                        <div class="circle mgr4" :style="{ background: item.color }" />
                        <div class="typename">
                            {{ item.typeName }}
                        </div>
                    </div>
                    <div class="total" :style="{ color: item.color }">
                        {{ overProofAlarm[item.key] }}
                    </div>
                </div>
            </div>
        </div>
        <div class="module-title flex mgb12">
            <div class="title">
                <!-- <img class="icon mgr4" :src="modeluIconPng"> -->
                <span>实时报警</span>
            </div>
        </div>
        <div class="alarm-list">
            <el-scrollbar v-if="realAlarmList.length &gt; 0">
                <div v-for="item, index in realAlarmList" :key="index" class="alarm-list-item flex flex-s">
                    <img class="mgr" :src="alarmPng" style="width: 30px;height: 24px;">
                    <div class="alarm-type single-overflow flex-1" :title="item.description">
                        {{ item.description }}
                    </div>
                    <div class="time">
                        {{ $formatTime(item.alarmTime) }}
                    </div>
                </div>
            </el-scrollbar>
            <el-empty v-else class="empty" :image-size="180" :image="newNoDataSvg" description="" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { onMounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'
import ProgressBar from '../common/IpesProgressBar.vue'
import type { alarm } from './type'
import alarmPng from './images/alarm.png'
import newNoDataSvg from './images/new-nodata.svg'

const props = defineProps({
    overProofAlarm: {
        type: Object as PropType<any>,
        default: () => {
            return { dqhj: 0, total: 0, ydyh: 0, wry: 0 }
        }
    },
    realAlarmList: {
        type: Array as PropType<any>,
        default: () => {
            return [{ id: 6910, alarmName: '超标预警', alarmTime: 1690931100000, description: '【超标预警】模拟数据三号渠在2023-08-02 07:05:00产生中超标报警，监测因子：水位，监测值：2.237m，超标限值：(1.5,10)', alarmData: null, }]
        }
    }
})

const alarmOption: alarm[] = reactive([
    { typeName: '大气环境', key: 'dqhj', color: '#0EED9B' },
    { typeName: '有毒有害', key: 'ydyh', color: '#FFA41E' },
    { typeName: '污染源', key: 'wry', color: '#FF5D54' },
])

const percent = ref([0, 0, 0])
const date = ref(dayjs().format('YYYY-MM'))

const $formatTime = (time: any) => {
    return dayjs(time).format('YYYY-MM-DD HH:mm')
}

watch(props.overProofAlarm, (newValue, oldValue) => {
    percent.value = []
    // 前N项的百分比
    let prePercentTotal = 0
    alarmOption.forEach((i, index) => {
        if (index < alarmOption.length - 1) {
            const rate = (props.overProofAlarm[i.key] / props.overProofAlarm.total) * 100
            prePercentTotal += rate
            percent.value.push(rate)
        }
        else {
            // 为保证总和为100，最后一项使用减法计算
            percent.value.push(100 - prePercentTotal)
        }
    })
}, { deep: true, immediate: true })
</script>

<script lang="ts">
export default {
    name: 'DvIpesAlarmManage',
    title: '报警管理',
}
</script>

<style lang="scss" scoped>
    @import "./style/index";
</style>
