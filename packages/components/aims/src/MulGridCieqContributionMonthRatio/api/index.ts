import request from '../../../service/request'

interface GetCieqRateParams {
    time: number
    timeType: string
    gridCode: string
}

export interface Icieq {
    value: string
    rate: number
    factorName: string
}

interface ResData {
    code: string
    name: string
    cieq: string
    icieqs: Icieq[]
}

export const getCieqRate = (params: GetCieqRateParams) => {
    return request<ResData[]>({
        url: '/aims-server/api/v1/area-map/cieq-rate',
        method: 'get',
        params,
    })
}

export type { GetCieqRateParams }
