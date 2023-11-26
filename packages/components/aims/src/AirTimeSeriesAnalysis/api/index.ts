import request from '../../../service/request'

interface GetTimeAnalyzeDataParams {
    dataType: string // 'year' | 'month' | 'day' | 'hour'
    startTime: number
    endTime: number
    factorCodes: string
    codeType: string
    codes: string
    names?: string
}

interface FactorsOrSite {
    name: string
    unit: string
    key: string
    values: Array<number | string>
}

interface ResData {
    factorsOrSites: FactorsOrSite[]
    times: string[]
}

export const getTimeAnalyzeData = (params: GetTimeAnalyzeDataParams) => {
    return request<ResData>({
        url: '/aims-server/web/api/v1/env-feature/time-analyze',
        method: 'get',
        params,
    })
}

export type { GetTimeAnalyzeDataParams }
