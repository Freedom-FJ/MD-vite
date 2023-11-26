// 时间类型
export interface ITimeTypeOptions {
    label: string
    value: string
}

interface IWaterStatusData {
    pel?: number | string
    total?: number | string
    openTotal?: number | string
}
// 水量统计
export interface IWaterStatus {
    line: IWaterStatusData
    open: IWaterStatusData
}

// 水量统计
export interface IOnlineData {
    online: number | string
    offline: number | string
}

// 供水总量
export interface IWaterVolume {
    // 供水总量
    supply: number | string
    // 漏损水量
    ullage: number | string
    // 漏损率
    per: number | string
}

// PropTypes
export interface Props {
    // 阀门开启率
    percentNum: number
    onlineData: IOnlineData
    // 设备联网率
    waterStatus: IWaterStatus
    // 供水总量
    waterVolume: IWaterVolume
    // 时间类型
    timeType: string
    // 时间类型列表
    timeTypeOptions: ITimeTypeOptions[]
}

// DefaultProps
export const defaultProps = {
    // 阀门开启率
    percentNum: 0,
    // 在线/断线
    onlineData: () => (
        {
            online: 0,
            offline: 0
        }
    ),
    // 设备联网率
    waterStatus: () => (
        {
            line: {
                pel: 0,
                total: 0
            },
            open: {
                openTotal: 0,
                total: 0
            }
        }
    ),
    // 供水总量
    waterVolume: () => (
        {
            // 供水总量
            supply: 0,
            // 漏损水量
            ullage: 0,
            // 漏损率
            per: 0
        }
    ),
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
        }
    ]
}
