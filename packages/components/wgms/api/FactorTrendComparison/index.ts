import Request from '../../service/request'

/**
 * 获取要素趋势对比数据
 * @param params
 */
export const getManualFactorTrendComparisonData = (params: any) => {
    return Request<any, true>({
        url: '/api/v1.0/analyse/singleSiteQuality',
        server: 'wgmsMonitorDataServer',
        method: 'get',
        params,
    })
}

/**
 * 获取因子组 自动和手工
 * @param params
 */
export const getFactorGroupList = (params: any) => {
    return Request<any, true>({
        url: '/api/v1.0/factor/functionPoint/queryFactorGroupByCode',
        server: 'wgmsBaseServer',
        method: 'get',
        params,
    })
}

