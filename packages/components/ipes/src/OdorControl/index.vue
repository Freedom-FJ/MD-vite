<template>
    <div class="dv-ipes-OrdorControl">
        <div class="specific-site">
            <!-- 标题 -->
            <div class="site-name">
                <div class="site-title">
                    {{ siteData.siteName || '--' }}
                </div>
                <div class="time">
                    {{ siteData.dataTime }}
                </div>
            </div>
            <!-- 滚动区域 -->
            <FpiElRolling
                class="site-factor"
                direction="y"
                :time="siteData.siteFactorDatas.length * 1"
            >
                <template v-if="siteData.siteFactorDatas && siteData.siteFactorDatas.length">
                    <div v-for="item in siteData.siteFactorDatas" :key="item.factorCode" class="item-factor">
                        <div class="left" :title="item.factorName">
                            {{ item.factorName }}
                        </div>
                        <div class="right">
                            <span :style="{ color: item.exceed ? 'rgb(248, 68, 57)' : '#15F3A3' }">{{ item.factorValue }} </span>
                            <span :style="{ color: 'rgba(255,255,255,.3)' }">  {{ `  /  ` }} </span>
                            <span :style="{ color: '#00DEFF' }">  {{ item.factorStandardValue }} </span>
                        </div>
                    </div>
                </template>
                <div v-else class="nodata" style="height: 128px;">
                    <img src="./images/noData.svg">
                </div>
            </FpiElRolling>
            <!-- 图表 -->
            <div class="smell-number">
                <div class="head">
                    <div class="title">
                        异味指数
                    </div>
                    <div v-if="chartData.yData.length" class="unit">
                        %
                    </div>
                </div>
                <Echarts
                    v-if="chartData.xData.length "
                    id="echarts"
                    height="120px"
                    :full-options="echartsOptions"
                    :loading="false"
                />
                <div v-else class="nodata" style="height: 128px;">
                    <img src="./images/noData.svg">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { FpiElRolling } from '@ued_fpi/element-plus-expand'
import { useCssVar } from '@vueuse/core'
import Echarts from '../common/Echarts.vue'
import { getCssValue } from '../../utils/tools'
const props = defineProps({
    siteData: {
        type: Object,
        default: () => ({
            siteCode: 'JSYQ0432062300941000',
            siteName: '上风向空气超站（六参）',
            dataTime: '2023-06-30 10',
            siteFactorDatas: [
                {
                    factorCode: 'a21001',
                    factorName: 'NH₃',
                    factorValue: '0.0',
                    factorStandardValue: '1.0',
                    exceed: false
                }]
        })
    },
    chartData: {
        type: Object,
        default: () => ({
            xData: ['1月', '2月', '3月', '4月', '5月', '6月'],
            yData: ['0.72', '4.00', '4.30', '10.00', '5.00', '7.00']
        })
    }
})

const themeEl = ref(null)
const themeColor = useCssVar('--color', themeEl)

const axisLabelEl = ref(null)
const axisLabelColor = useCssVar('--dv-color-text-primary', axisLabelEl)

const splitLineEl = ref(null)
const splitLineElColor = useCssVar('--dv-color-border-light', splitLineEl)
const echartsOptions = reactive({
    options: {
        color: getCssValue('--dv-color-index'),
        grid: {
            left: 0,
            bottom: 0,
            right: 0,
            top: 10,
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            padding: 8,
            background: getCssValue('-dv-color-fill-base')
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                color: axisLabelColor.value
            },
            data: []
        },
        yAxis: {
            type: 'value',
            splitNumber: 3,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: true,
            },
            splitLine: {
                lineStyle: {
                    color: splitLineElColor.value
                },
                show: true,
            },

        },
        series: {
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                color: themeColor.value
            },
            data: []
        }
    },
    init: false
})
watch(() => props.chartData, (newValue, oldValue) => {
    echartsOptions.options.xAxis.data = newValue?.xData || []
    echartsOptions.options.series.data = newValue?.yData || []
}, { deep: true, immediate: true })
</script>

<script lang="ts">
export default {
    name: 'OdorControl',
    title: '异味管控'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
