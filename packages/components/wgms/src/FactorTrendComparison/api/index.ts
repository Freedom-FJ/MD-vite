import Request from '../../../service/request'

/**
 * 获取数据
 * @param params
 */
export const getTrendComparisonData = (params: any) => {
    return Request<any, true>({
        url: '/api/v1/screen/factor-tendency',
        server: 'wgmsScreenServer',
        method: 'get',
        params,
    })
}

