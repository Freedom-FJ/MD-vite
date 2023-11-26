import request from '../../../service/request'

interface GetEnvFeatureCalendarParams {
    codeType: string
    code: string
    factorCode: string
    time: number
}

interface YearSum {
    veryGood: number
    o3: number
    mild: number
    medium: number
    verySerious: number
    cO: number
    good: number
    nO2: number
    total: number
    'pM2.5': number
    sO2: number
    serious: number
    pM10: number
    aQI: number
}

interface Value {
    aQI: string
    time: number
    value: string
    factorAQIValue?: any
    mainPollutants: string
}

interface MonthSum {
    veryGood: number
    o3: number
    mild: number
    medium: number
    cO: number
    verySerious: number
    good: number
    nO2: number
    noMainPollutant: number
    'pM2.5': number
    sO2: number
    pM10: number
    serious: number
    noData: number
}

export interface ResData {
    yearSum: YearSum
    values: Value[]
    monthSum: MonthSum[]
}

export const getEnvFeatureCalendar = (params: GetEnvFeatureCalendarParams) => {
    return request<ResData>({
        url: '/aims-server/web/api/v1/env-feature/calendar',
        method: 'get',
        params,
    })
}
