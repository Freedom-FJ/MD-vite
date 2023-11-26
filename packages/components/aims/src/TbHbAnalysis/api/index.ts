import request from '../../../service/request'

interface GetTbHbDataParams {
    dataType: string // 'year' | 'quarter' | 'month' | 'week' | 'day'
    startTime: number
    endTime: number
    factorCode: string
    codeType: string
    code: string
}

interface ResData {
    lastTimes: string[]
    sameTimes: string[]
    lastPeriodRatio: Array<number | string>
    times: string[]
    unit: string
    lastPeriodValue: number[]
    samePeriodValue: Array<number | string>
    currentPeriodValue: Array<number | string>
    samePeriodRatio: Array<number | string>
}

export const getTbHbData = (params: GetTbHbDataParams) => {
    return request<ResData>({
        url: '/aims-server/web/api/v1/env-feature/tb-hb',
        method: 'get',
        params,
    })
}

export type { GetTbHbDataParams }
