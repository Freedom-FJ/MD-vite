<template>
    <div class="dv-ipes-airQuality-management">
        <div class="mainBox">
            <div class="title">
                年度空气质量考核
            </div>
            <div class="main-container">
                <div class="main-left">
                    <div ref="kqzhChart" class="kqzhChart" />
                    <img class="img_one" src="./images/blue_2.svg">
                    <img class="img_two" src="./images/blue_1.svg">
                    <div class="legendBox">
                        <div class="item">
                            <span class="name">优良率</span><span class="value" :style="{ color: airQualityObj.yearRatio ? '#00DD78' : '' }">{{ airQualityObj.yearRatio || '--' }}%</span>
                        </div>
                        <div class="item">
                            <span class="name">目标</span><span class="value value2">{{ airQualityObj.goal || '--' }}%</span>
                        </div>
                    </div>
                </div>
                <div class="tableList">
                    <div class="title-box">
                        <div class="th">
                            因子名
                        </div>
                        <div class="th">
                            均值/目标值
                        </div>
                    </div>
                    <FpiElRolling class="main" direction="y" :time="15">
                        <div v-for="(item, index) in factorList" :key="index" class="list">
                            <div class="tr">
                                {{ item.factorName }}
                            </div>
                            <div class="tr">
                                <span class="value1">{{ item.factorValue || '--' }}</span><span class="value2">/ {{ item.targetValue || '--' }}</span>
                            </div>
                        </div>
                    </FpiElRolling>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import type { Ref } from 'vue'
import { FpiElRolling } from '@ued_fpi/element-plus-expand'
import request from '../../service/request'
import RealTimeAir from '../common/RealTimeAir.vue'
import type { AirQuality, Factor } from './type'

withDefaults(defineProps<{
    width?: number | string
    height?: number | string
}>(), {
    width: '100%',
    height: 96,
})

const airQualityObj = ref<AirQuality>({
    time: '',
    aqiValue: null,
    aqiColor: '',
    aqiLevel: '',
    mainPolluter: '',
    yearRatio: '0',
    goal: 0,
})

// 获取数据
async function getAqmsManage() {
    try {
        const res = await request({
            method: 'get',
            url: '/ipes-data-aggregation-server/api/v1/env-protection/aqms-manage',
        })
        const {
            aqiValue,
            aqiColor,
            aqiLevel,
            mainPolluter,
            yearRatio,
            goal,
            time,
        } = res.data as AirQuality

        airQualityObj.value = {
            aqiValue,
            aqiColor,
            aqiLevel,
            mainPolluter,
            yearRatio,
            goal,
            time,
        }

        drawChart([
            ['优良率', Number(yearRatio)],
            ['目标', Number(100 - Number(yearRatio))],
        ])
    }
    catch (error) {
        console.log(error)
    }
}

const factorList = ref([]) as Ref<Factor[]>
// 获取envCode
async function getEnvCode() {
    try {
        const res = await request({
            method: 'get',
            url: '/ipes-data-aggregation-server/api/v1/env-protection/aqi/year',
        })
        factorList.value = res.data as Factor[]
    }
    catch (error) {
        console.log(error)
    }
}
const kqzhChart = ref(null)
// 绘制年度空气质量考核立体饼图
function drawChart(data: [string, number][]) {
    const Highcharts = (window as any).Highcharts
    Highcharts && Highcharts.chart(kqzhChart.value, {
        credits: {
            enabled: false, // 隐藏版权信息
        },
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 64, // 内旋转角度
                beta: 0, // 外旋转角度
            },
            backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {
            text: '',
            style: {
                fontSize: '14px',
                color: '#fff',
                // fontFamily: 'shzhjt',
            },
            align: 'left',
        },
        tooltip: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                size: '67px',
                depth: 10, // 饼图厚度
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
            },
        },
        series: [
            {
                name: '年度空气质量',
                data,
                colors: ['#00DD78', '#8FAFC7'],
            },
        ],
        legend: {
            enabled: false,
        },
    })
}

onMounted(() => {
    getAqmsManage()
    getEnvCode()
})
</script>

<script lang="ts">
export default {
    name: 'DvIpesAirQualityStandard',
    title: '空气质量达标'
}
</script>

<style lang="scss">
@import "../common";
@import "./style/index";
</style>
