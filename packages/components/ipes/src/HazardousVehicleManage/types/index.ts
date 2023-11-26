// 危化品车数据
export interface IHazardousCar {
    sfCount: number // 外来车辆数
    sfCountTitle: string // 外来车辆数
    dnCount: number // 自有车辆数
    dnCountTitle: string // 自有车辆数
    ynCount: number // 园区车辆
    ynCountTitle: string // 园区车辆
    zxCount: number // 在线车辆数
    zxCountTitle: string // 在线车辆数
    lxCount: number // 离线车辆数
    lxCountTitle: string // 离线车辆数
    zxPercent: number // 车辆在线状态
    zxPercentTitle: string // 车辆在线状态
}

// 园区列表
export interface IParkOption {
    label: string
    value: string
}

// 进出园车辆统计
export interface ICarData {
    name: string
    data: number[]
}

// PropTypes
export interface Props {
    // 危化品车数据
    hazardousCar: IHazardousCar
    // 园区列表
    parkOptions: IParkOption[]
    // 进出园车辆统计
    carData: ICarData[]
}

// DefaultProps
export const defaultProps = {
    hazardousCar: () => ({
        sfCount: 0, // 外来车辆数
        sfCountTitle: '外来车辆数', // 外来车辆数
        dnCount: 0, // 自有车辆数
        dnCountTitle: '自有车辆数', // 自有车辆数
        ynCount: 0, // 园区车辆
        ynCountTitle: '园区车辆', // 园区车辆
        zxCount: 0, // 在线车辆数
        zxCountTitle: '在线车辆数', // 在线车辆数
        lxCount: 0, // 离线车辆数
        lxCountTitle: '离线车辆数', // 离线车辆数
        zxPercent: 0, // 车辆在线状态
        zxPercentTitle: '车辆在线状态', // 车辆在线状态
    }),
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
