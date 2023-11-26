import request from '../../../service/request'

interface GetWindRoseDataParams {
    code: string
    type: string
    startTime: number
    endTime: number
    timeType: string
    timeValue: string
    dataType: string
    factorCode: string
}

// 风向玫瑰图（城市、区域、站点）
export const getWindRoseData = (params: GetWindRoseDataParams) => {
    return request<any[]>({
        url: '/aims-server/web/api/v1/pollution-analysis/space-analysis/wind-rose-chart',
        method: 'get',
        params,
    })
}
export type { GetWindRoseDataParams }
