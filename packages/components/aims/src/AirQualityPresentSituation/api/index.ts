import request from '../../../service/request'

interface GetCityDetailParams {
    time: number
    timeType: string // 'month' | 'year
    gridCode: string
}
interface CommonFactorData$1 {
    id: null
    name: string
    code: string
    latitude: null
    longitude: null
    value: string
    unit: string
    key: null
}

interface Data$2 {
    cieq: string
    mainPollutants: string
    commonFactorData: Array< CommonFactorData$1 >
}

export const getCityDetail = (params: GetCityDetailParams) => {
    return request<Data$2>({
        url: '/aims-server/api/v1/area-map/city-detail',
        method: 'get',
        params,
    })
}

export type { GetCityDetailParams }
