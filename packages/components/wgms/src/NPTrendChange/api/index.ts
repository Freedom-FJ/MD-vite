import Request from '../../../service/request'

/**
 * 获取数据
 * @param params
 */
export const getNPTrendChange = (params: any) => {
    return Request<any, true>({
        url: '/api/v1/screen/algae-analyse-np-compare',
        server: 'wgmsScreenServer',
        method: 'get',
        params,
    })
}

