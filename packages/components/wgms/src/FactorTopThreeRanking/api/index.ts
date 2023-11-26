import Request from '../../../service/request'

/**
 * 获取数据
 * @param params
 */
export const getTopThreeData = (params: any) => {
    return Request<any, true>({
        url: '/api/v1/screen/algae-analyse-factor/top-three',
        server: 'wgmsScreenServer',
        method: 'get',
        params,
    })
}

