<!-- 应急管理组件 -->
<template>
    <div class="emergencyManage">
        <!-- <div class="total">
            {{ total }}
        </div> -->
        <Echarts
            class="echartsBox"
            :full-options="chartOption"
            :loading="false"
        />
        <div class="chartBg" />
    </div>
</template>

<script lang="ts" setup>
import Echarts from '../common/Echarts.vue'
import { getCssValue, getFontFamily } from '../../utils/tools'

/**
 * 定义props
 */
const props = defineProps({
    emergencyData: {
        type: Array,
        default: () => {
            return [] // 图表数据
        }
    },
})

// 计算饼图中心需显示的总和
const total = props.emergencyData.reduce((accumulator, current: any) => accumulator + current.value, 0)
// 饼图配置项
const chartOption = reactive({
    options: {
        title: {
            show: true,
            text: total,
            textStyle: {
                color: getCssValue('--dv-color-text-primary'),
                fontSize: 24,
                fontFamily: getFontFamily('--dv-font-family-number'),
                fontWeight: 400
            },
            top: '17%',
            left: '19%',
            textAlign: 'center',
        },
        tooltip: {
            confine: true, // 不让超出显示
            trigger: 'item',
            formatter: (item: any) => {
                return `<div class="tool-tips__row">${item.percent.toFixed(1)}%</div>`
            },
        },
        legend: {
            selectedMode: true, // 图例点击事件
            left: '40%',
            top: '4%',
            icon: 'circle',
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 8, // 图例之间的间距
            formatter: (value: any) => {
                const flag: any = props.emergencyData.find((items: any) => {
                    return items.name === value
                })
                let arr = []
                arr = [`{a|${value}}`, `{b|${flag?.value}}`]
                return arr.join('')
            },
            textStyle: {
                rich: {
                    a: {
                        width: 100,
                        fontSize: 14,
                        color: getCssValue('--dv-color-text-primary'),
                    },
                    b: {
                        width: 24,
                        fontSize: 14,
                        color: getCssValue('--dv-color-index'),
                        fontFamily: getFontFamily('--dv-font-family-number'),
                        align: 'left',
                    },
                },
            },
        },
        series: [
            {
                type: 'pie',
                radius: ['46px', '58px'],
                center: ['20%', '22%'],
                data: props.emergencyData,
                animationEasing: 'cubicInOut',
                animationDuration: 1000,
                itemStyle: {
                    borderRadius: 3,
                    borderColor: 'rgba(6,37,56,0.6)',
                    borderWidth: 0,
                },
                color: [
                    '#0AAEFF',
                    '#A162F7',
                    '#34EAE3',
                    '#E9BB1D',
                    '#C0C4CC',
                    '#5470c6',
                    '#91cc75',
                    '#fac858',
                    '#ee6666',
                    '#73c0de',
                    '#3ba272',
                    '#fc8452',
                    '#9a60b4',
                    '#ea7ccc',
                ],
                labelLine: {
                    show: false,
                },
                label: {
                    show: false,
                },
            },
        ],
    }
})
</script>

<script lang="ts">
export default {
    name: 'DvIpesEmergencyManage',
    title: '应急管理 or 应急事件'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
