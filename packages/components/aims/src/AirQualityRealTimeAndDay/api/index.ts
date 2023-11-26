import request from '../../../service/request'

interface GetAirQualityParams {
    time: number
    gridCode: string
    timeType: string
}

interface GetAirQualityRes {
    airQuality: string
    mainPollutants: string
    aqi: string
    commonFactors: {
        key: string
        name: string
        unit: string
        value: string
    }[]
    weatherFactors: {
        key: string
        name: string
        unit: string
        value: string
    }[]
}

export const getAirQuality = (params: GetAirQualityParams) => {
    return request<GetAirQualityRes>({
        url: '/aims-server/web/api/v1/analyze-map/grid-detail',
        method: 'get',
        params,
    })
}

export type {
    GetAirQualityParams
}
