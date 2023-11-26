/*
 * @Author: Tian
 * @Date: 2023-06-28 22:56:46
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-15 09:17:18
 * @Description: echarts相关配置
 */
import { useThemeValue } from '../../../utils'
export const pieChartOptions = (seriesData: Record<string, any>[], colorList: string[], total: number) => {
    return {
        grid: {
            top: 30,
            left: 20,
            right: 20,

        },
        tooltip: {
            show: true,
            trigger: 'item',
        },
        series: [
            {
                name: '',
                type: 'pie', // 柱状图
                radius: ['63%', '92%'], // 内环外环的大小
                center: ['50%', '50%'], // 圆心的坐标位置
                data: seriesData,
                startAngle: 270,
                legendHoverLink: true, // 是否启用图例hover时的联动高亮
                hoverAnimation: true, // 是否开启hover在扇区上的放大动画效果
                avoidLabelOverlap: false, // 是否启用防止标签重叠策略，圆环图把所有标签放中心时需设置为false
                label: {
                    // 标签
                    show: true,
                    position: 'center',
                    textStyle: {
                        rich: {
                            total: {
                                fontSize: 24,
                                color: 'var(--dv-color-text-primary)',
                                fontFamily: 'var(--dv-font-family-number)',
                            }
                        }
                    },
                    formatter() {
                        return `{total|${total}}`
                    }
                },
                itemStyle: {
                    color(params: Record<string, any>) {
                        return colorList[params.dataIndex]
                    }
                }
            }
        ]
    }
}

export const pollutionSourcePieOptions = (pieData: Record<string, any>[]) => {
    return {
        grid: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        series: [
            {
                name: '企业档案',
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['60%', '100%'],
                avoidLabelOverlap: true,
                hoverAnimation: false,
                data: pieData,
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                }
            }
        ]
    }
}

export const getDizhouQualityAnalysisOption = (xData: string[], goodList: number[], badList: number[]) => {
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        color: ['var(--dv-color-success)', 'var(--dv-color-danger)'],
        grid: {
            top: '40',
            left: '35',
            bottom: '45',
            right: '15'
        },
        legend: {
            show: true,
            bottom: 0,
            left: 'center',
            icon: 'circle',
            itemWidth: 10,
            // itemHeight: 14,
            textStyle: {
                fontSize: 'var(--dv-text-body2)',
                color: 'var(--dv-color-text-primary)'
            }
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: 'var(--dv-color-text-primary)',
                    fontSize: '12px',
                },
                axisLine: {
                    lineStyle: {
                        color: 'var(--dv-color-border-light)'
                    }
                },
                data: xData
            }
        ],
        yAxis: [
            {
                name: '%',
                nameTextStyle: {
                    color: 'var(--dv-color-text-secondary)',
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: '12px',
                    padding: [0, 20, 0, 0]
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: { // 值分割线
                    show: true,
                    lineStyle: {
                        color: 'var(--dv-color-border-light)'
                    }
                },
                axisLabel: {
                    color: 'var(--dv-color-text-secondary)',
                    fontSize: '12px',
                    fontFamily: 'var(--dv-font-family-number)'
                }
            }
        ],
        series: [
            {
                name: '优良比例',
                type: 'bar',
                barWidth: 15,
                data: goodList,
                itemStyle: {
                    color: 'var(--dv-color-success)'
                },
            },
            {
                name: '劣V比例',
                type: 'bar',
                barWidth: 15,
                itemStyle: {
                    color: 'var(--dv-color-danger)'
                },
                data: badList
            }
        ]
    }
    return option
}

export const comprehensiveWaterQualityOption = (xData: string[], yData: number[]) => {
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter(params: any) {
                const str = `<div><div>${params[0].seriesName}</div><div
            style='display:
            flex;height:20px;align-items:center;'>${params[0].marker}
            <div>${params[0].axisValue}：${params[0].data}</div></div>`
                return str
            }
        },
        color: ['var(--dv-color-index)'],
        grid: {
            top: '8',
            left: '20',
            bottom: '30',
            right: '10'
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: 'var(--dv-color-text-primary)',
                    fontSize: 'var(--dv-text-number2)',
                    fontFamily: 'var(--dv-font-family-number)',
                },
                axisLine: {
                    lineStyle: {
                        color: 'var(--dv-color-border-light)'
                    }
                },
                data: xData
            }
        ],
        yAxis: [
            {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                // x轴竖线
                    lineStyle: {
                        color: 'var(--dv-color-border-light)'
                    },
                },
                axisLabel: {
                    color: 'var(--dv-color-text-secondary)',
                    fontFamily: 'var(--dv-font-family-number)',
                    fontSize: 'var(--dv-text-number2)',
                }
            }
        ],
        series: [
            {
                name: '水质综合指数变化',
                type: 'line',
                data: yData,
                // symbolSize: 'none', // 设定拐点的大小
                lineStyle: {
                // 设置折线颜色
                    color: 'var(--dv-color-index)'
                },
            }
        ]
    }
    return option
}
