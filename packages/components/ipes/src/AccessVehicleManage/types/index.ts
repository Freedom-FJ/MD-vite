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

// 出入园记录
export interface IAccessRecord {
    crossTime: string
    crossType: string
    plateNo: string
}
// PropTypes
export interface Props {
    // 出入园统计
    accessStatistic: IAccessStatistic[]
    // 出入园记录
    accessRecord: IAccessRecord[]
    // 时间类型
    timeType: string
    // 时间类型列表
    timeTypeOptions: ITimeTypeOptions[]
}

// DefaultProps
export const defaultProps = {
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
    // 出入园记录
    accessRecord: () => [],
    // 时间类型
    timeType: 'month',
    // 时间类型列表
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
}
