import request from '../../../service/request'

interface GetSiteRankParams {
    time?: number
    gridCode?: string
    timeType?: string // 'hour' | 'day'
    factorCode?: string
    siteTypeCodes?: string
    type?: string
    isAsc?: boolean
    endTime?: number
}

interface ResData {
    entries: {
        code: string
        gridName: string
        siteTypeName: string
        latitude: number
        name: string
        AQI: string
        rank: number
        siteTypeCode: string
        gridCode: string
        longitude: number
        mainPollutants: string
    }[]
}

export const getSiteRank = (params: GetSiteRankParams) => {
    return request<ResData>({
        url: '/aims-server/web/api/v1/rank/site-rank-map',
        method: 'get',
        params,
    })
}

export type { GetSiteRankParams }
