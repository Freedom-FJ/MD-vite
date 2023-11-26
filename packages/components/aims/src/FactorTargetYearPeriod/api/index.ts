import request from '../../../service/request'

interface GetEnvironmentStatusV2Params {
    time?: number
    gridCode?: string
    type?: 'county' // 目前只支持到乡镇
    timeType?: 'year' | 'quarter' | 'month' | 'week'
}

interface ResData {
    entries: {
        itemName: string
        itemCode: string
        factorCode: string
        samePeriodValue: number
        thisPeriodValue: number
        changeRate: number
        revert: boolean
        changeCompare: null
        targetValue: null
        unit: string
    }[]
}

export const getEnvironmentStatusV2 = (
    params: GetEnvironmentStatusV2Params
) => {
    return request<ResData>({
        url: '/aims-server/web/api/v1/env-quality/environment-status-v2',
        method: 'get',
        params,
    })
}

export type { GetEnvironmentStatusV2Params }
