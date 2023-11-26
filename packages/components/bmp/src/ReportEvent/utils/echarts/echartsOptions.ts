/*
 * @Author: mjh
 * @Date: 2023-07-27 15:17:28
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-11 15:00:33
 * @Description:
 */
export const pieChartOptions = (pieData: { name: string; value: number }[]) => {
    return {
        grid: {
            top: 0,
            left: 55,
            bottom: '1%',
        },
        color: ['var(--dv-color-success)', 'var(--dv-color-fill-lighter)'],
        tooltip: {
            trigger: 'item',
            formatter: (params: {
                data: {
                    name: string
                    value: string
                    rate: string
                }
            }) => {
                const {
                    data: { name, value, rate },
                } = params
                return `${name}：${value}`
            },
        },
        series: [
            {
                name: '事件上报',
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['75%', '100%'],
                avoidLabelOverlap: true,
                hoverAnimation: false,
                data: pieData,
                itemStyle: {
                    borderRadius: 4,
                    borderWidth: 0,
                },
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
            },
        ],
    }
}
