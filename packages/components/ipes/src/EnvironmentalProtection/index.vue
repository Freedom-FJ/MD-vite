<template>
    <div class="dv-ipes-risk-emergency-manage">
        <div class="module-title">
            <div class="title">
                <span>企业环境风险分级</span>
            </div>
        </div>
        <div class="risk_body">
            <div class="pie-card">
                <div ref="pieChart" class="pie" />
                <div class="top" />
                <div class="bottom" />
                <div class="label">
                    <div class="title">
                        企业总数
                    </div>
                    <div class="total mgt8">
                        {{ companyTotal }}
                    </div>
                </div>
            </div>
            <div class="legend">
                <div v-for="item, index in legendData" :key="index" class="legend-item">
                    <div class="circle" :style="{ background: colors[index] }" />
                    <div class="typename">
                        {{ item.name }}
                    </div>
                    <div class="value">
                        {{ item.count || 0 }}
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <span class="mgr16">环境风险单元总数</span>
            <div class="total">
                {{ totalCount }}
            </div>
            <span class="unit">个</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import request from '../../service/request'
import type { Item } from './type'
// interface Props {
//     totalRiskUnitCount: number | string,
//     companyData?: Array<Item>,
// }
// const props = withDefaults(defineProps<Props>(), {
//     totalRiskUnitCount: 0,
//     companyData: () => ([])
// })
const emit = defineEmits<{
  (e: 'openPopup', key: string): void
}>()

const colors = ['var(--dv-color-danger)', 'var(--dv-color-warning)', 'var(--dv-color-index)', 'var(--dv-color-success)']
const getOptins = (series: Array<any>) => {
    const options = {
        chart: {
            type: 'pie',
            margin: 0,
            backgroundColor: 'transparent',
            options3d: {
                enabled: true,
                alpha: 68,
                beta: 0,
            },
        },
        credits: { enabled: false },
        title: {
            text: null,
        },
        colors,
        tooltip: { enabled: false },
        plotOptions: {
            pie: {
                center: ['50%', '50%'],
                animation: false,
                enableMouseTracking: false,
                cursor: 'pointer',
                depth: 8,
                innerSize: '80%',
                size: '100%',
                dataLabels: {
                    enabled: false,
                },
            },
        },
        series,
    }
}

// 风险单元总数
const totalCount = ref<number | string>(0)
// 企业总数
const companyTotal = ref<number>(0)
// 风险等级的企业数据 - 图例
const legendData = ref<Item[]>([])

const pieChart = ref()
// 绘制年度空气质量考核立体饼图
function drawChart(data: [string | number][]) {
    const Highcharts = (window as any).Highcharts
    Highcharts && Highcharts.chart(pieChart.value, {
        chart: {
            type: 'pie',
            margin: 0,
            backgroundColor: 'transparent',
            options3d: {
                enabled: true,
                alpha: 68,
                beta: 0,
            },
        },
        credits: { enabled: false },
        title: {
            text: null,
        },
        colors,
        tooltip: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                center: ['50%', '60%'],
                animation: false,
                enableMouseTracking: false,
                cursor: 'pointer',
                depth: 15,
                innerSize: '80%',
                size: '135%',
                dataLabels: {
                    enabled: false,
                },
            },
        },
        series: [
            {
                type: 'pie',
                name: '企业总数',
                data,
            },
        ],
        legend: {
            enabled: false,
        },
    })
}
const fetchData = async () => {
    try {
        const result: any = await request({
            method: 'get',
            url: '/bmp-company-manager-server/api/v1/company/management/statistics/envRiskLevel',
        })
        const { totalRiskUnitCount, ...companyData } = result
        const list: any = Object.values(companyData).reverse()
        let totla = 0; const seriesData: any = []
        list.forEach((item: any) => {
            totla += item.count
            seriesData.push([item.name, item.count])
        })
        legendData.value = list as Item[]
        // 企业总数
        companyTotal.value = totla
        // 环境风险单元总数
        totalCount.value = totalRiskUnitCount
        drawChart(seriesData)
    }
    catch (error) {
        console.log(error)
    }
}
onMounted(async () => {
    await nextTick()
    fetchData()
    // initChart()
})
const initChart = () => {
    const data = [
        {
            name: '重大环境风险企业',
            count: 1,
        },
        {
            name: '较大环境风险企业',
            count: 6,
        },
        {
            name: '一般环境风险企业',
            count: 7,
        },
        {
            name: '无环境风险企业',
            count: 36,
        }
    ]
    const seriesData: any = []; let num = 0
    data.forEach((item) => {
        num += item.count
        seriesData.push([item.name, item.count])
    })
    companyTotal.value = num
    legendData.value = data
    drawChart(seriesData)
}
</script>

<script lang="ts">
export default {
    name: 'DvIpesEnvironmentalProtection',
    title: '环境风险应急管理'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
