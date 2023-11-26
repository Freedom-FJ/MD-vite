import request from '../../../service/request'

interface GetMulAirLevelRateParams {
    gridCode: string
    time: number
    timeType: string
}

interface ResData {
    code: string
    name: string
    levelCounts: string[]
    levelRates: number[]
    fineCount: string
    fineRate: string
    opRate: string
    opCount: string
    heavyPollutionCount: string
}

export const getMulAirLevelRate = (params: GetMulAirLevelRateParams) => {
    return request<ResData[]>({
        url: '/aims-server/api/v1/area-map/air-level-rate',
        method: 'get',
        params,
    })
}

export type { GetMulAirLevelRateParams }
