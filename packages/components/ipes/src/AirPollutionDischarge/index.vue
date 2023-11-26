<template>
    <div class="dv-ipes-air-pollution">
        <!-- <div class="enterprise-statistics">
            <div class="statistics-charts">
                <div ref="statisticsCharts" style="width: 68px; height: 36px;" />
                <img src="./images/blue_2.svg" alt="" class="img2">
                <img src="./images/blue_1.svg" alt="" class="img1">
            </div>
            <div class="statistics-list">
                <div class="row flex">
                    <div class="label">
                        企业总数
                    </div>
                    <div class="value">
                        <span class="num">{{ discharge.companyNum }}</span>
                        <span class="unit">家</span>
                    </div>
                </div>
                <div class="row flex mgt8">
                    <div class="label">
                        在线监测
                    </div>
                    <div class="value">
                        <span class="num">{{ discharge.monitorCompanyNum }}</span>
                        <span class="unit">家</span>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="discharge-total">
            <div class="discharge-title">
                <span>年度累计排放总量 </span>
                <span class="unit">（吨）</span>
            </div>
            <div class="discharge-label flex">
                <div>
                    污染物
                </div>
                <div>
                    排放量/允许排放量
                </div>
            </div>
            <template v-if="chartStatistics.length">
                <div class="box">
                    <div
                        v-for="(item, index) in chartStatistics"
                        :key="index"
                        class="chart-statistics"
                    >
                        <div class="chart-statistics-head">
                            <div class="statistics-head-name" :title="item.factorName">
                                {{ item.factorName }}
                            </div>
                            <div class="statistics-head-number">
                                <span class="statistics-head-number-left" :style="{ color: item.color }">{{
                                    item.factorValue || '0'
                                }}</span>
                                <span class="separator"> / </span>
                                <span :title="item.targetValue"> {{ item.targetValue }}</span>
                            </div>
                        </div>
                        <div class="chart-statistics-body">
                            <div class="chart-statistics-body-box">
                                <div
                                    class="statistics-body-left"
                                    :style="{
                                        backgroundColor: item.color,
                                        width: `${item.percent}%`,
                                    }"
                                />
                                <div
                                    class="statistics-body-right"
                                    :style="{
                                        width: `${100 - item.percent}%`,
                                    }"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <el-empty v-else :image-size="100" :image="noDataImg" description="" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import request from '../../service/request'
import noDataImg from './images/new-nodata.svg'
import type { pollutionTs } from './type'

const chartStatistics: pollutionTs[] = reactive([])
interface obj {
  companyNum: number
  monitorCompanyNum: number
}
const discharge = reactive<obj>({
    companyNum: 0,
    monitorCompanyNum: 0
})

const statisticsCharts = ref()
// 绘制年度空气质量考核立体饼图
function drawChart(data: any) {
    const Highcharts = (window as any).Highcharts
    Highcharts && Highcharts.chart(statisticsCharts.value, {
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
                size: '55px',
                depth: 9, // 饼图厚度
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
                colors: ['#00DD78', '#8FAFC7'], // 绿色 灰色
            },
        },
        series: [
            {
                name: '占比',
                data,
                // colors: ['#00DD78', '#8FAFC7'],
            },
        ],
        legend: {
            enabled: false,
        },
    })
}

const fetchData = async () => {
    try {
        const result = await request({
            method: 'get',
            url: '/ipes-iacp-server/api/v2/gis-panel-data/discharge',
        })
        const data: any = result.data
        // discharge = data
        const objs = toRefs(data)
        Object.assign(discharge, objs)
        const arr = data.factorList.slice(0, 3).map((item: any) => {
            let flag = (parseInt(item.factorValue) / parseInt(item.targetValue)) * 100
            if (flag <= 80)
                item.color = 'var(--dv-color-success)'
            else if (flag > 80 && flag <= 100)
                item.color = 'var(--dv-color-warning)' // 橙色
            else if (flag > 100)
                item.color = 'var(--dv-color-danger)' // 红色

            isNaN(flag) && (flag = 0) // 值为null时flag为NaN
            item.percent = flag > 100 ? 100 : flag
            return item
        })
        chartStatistics.splice(0, chartStatistics.length, ...arr)
        const seriesData = [
            ['在线监测', data.monitorCompanyNum],
            [
                '非在线监测',
                data.companyNum - data.monitorCompanyNum,
            ]
        ]
        // drawChart(seriesData)
    }
    catch (error) {
        console.log(error)
    }
}
onMounted(async () => {
    await nextTick()
    fetchData()
})
</script>

<script lang="ts">
export default {
    name: 'DvIpesAirPollutionDischarge',
    title: '大气污染物排放'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
