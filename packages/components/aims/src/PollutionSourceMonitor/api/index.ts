import request from '../../../service/request'

interface GetSiteMonitorTypeTreeParams {
    showCount: boolean
    withPms: boolean
    // gridCode?: string
}
interface SiteTypeData {
    code: string
    name: string
    onlineCount: number
    totalCount: number
    id?: string | null
    children?: SiteTypeData[] | null
    parentCode?: string | null
    clickAble?: boolean
    selectedCodes?: string
    allChildrenCodeAndSelf?: string
    isLeaf?: boolean
}

export const getSiteMonitorTypeTree = (
    params: GetSiteMonitorTypeTreeParams
) => {
    return request<SiteTypeData[]>({
        url: '/aims-base-server/api/v1/tree/site-monitor-type-tree',
        method: 'get',
        params,
    })
}

export type { GetSiteMonitorTypeTreeParams, SiteTypeData }
