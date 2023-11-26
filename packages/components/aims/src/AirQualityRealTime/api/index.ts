import request from '../../../service/request'

interface GetAirQualityParams {
    time: number
    gridCode: string
    gridLevelNickName: string
}

interface GetAirQualityRes {
    time: string
    list: {
        realAirQualityLevel: string
        code: string
        realAQI: number | string
        dayAirQualityLevel: string
        dayPollution: string
        realPollution: string
        concTrend: {
            factorCode: string
            factorName: string
            dayFactorValue: string
            realFactorValue: string
        }[]
        name: string
        dayAQI: number | string
    }[]
}

export const getAirQuality = (params: GetAirQualityParams) => {
    return request<GetAirQualityRes>({
        url: '/aims-server/web/api/v1/situation-study/city-air-quality',
        method: 'get',
        params,
    })
}

export type {
    GetAirQualityParams
}
