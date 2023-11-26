// 危化品车数据
export interface IHazardousCar {
    ynCount: number // 园区车辆
    ynCountTitle: string // 园区车辆
    zxPercent: number // 车辆在线状态
    zxPercentTitle: string // 车辆在线状态
}

// 时间类型
export interface ITimeTypeOptions {
    label: string
    value: string
}

// 出入园统计
export interface IAccessStatistic {
    label: string
    value: string | number
    type: string
}

// 园区列表
export interface IParkOption {
    label: string
    value: string
}

// PropTypes
export interface Props {
    // 危化品车数据
    hazardousCar: IHazardousCar
    // 出入园统计
    accessStatistic: IAccessStatistic[]
    // 时间类型
    timeType: string
    // 时间类型列表
    timeTypeOptions: ITimeTypeOptions[]
    // 园区列表
    parkOptions: IParkOption[]
}

// DefaultProps
export const defaultProps = {
    hazardousCar: () => ({
        ynCount: 0, // 园区车辆
        ynCountTitle: '园区车辆', // 园区车辆
        zxPercent: 0, // 车辆在线状态
        zxPercentTitle: '车辆在线状态', // 车辆在线状态
    }),
    // 出入园统计
    accessStatistic: () => [
        {
            label: '入园车辆',
            value: 0,
            type: 'entry',
        },
        {
            label: '出园车辆',
            value: 0,
            type: 'exit',
        }
    ],
    // 时间类型
    timeType: 'month',
    timeTypeOptions: () => [
        {
            label: '年',
            value: 'year',
        },
        {
            label: '月',
            value: 'month',
        },
        {
            label: '日',
            value: 'day',
        },
    ],
    parkOptions: () => [
        {
            value: '',
            label: '全部',
        },
        {
            value: '0',
            label: '西中岛',
        },
        {
            value: '1',
            label: '长兴岛',
        }
    ],
}
