/*
 * @Author: Tian
 * @Date: 2023-07-21 12:19:21
 * @LastEditors: admin
 * @LastEditTime: 2023-07-27 20:26:55
 * @Description: 水质现状接口
 */
import Request from '../../../service/request'
import type { UPSTREAM_OVER_RES } from './types'
export const getUpstreamOverData = (params: UPSTREAM_OVER_RES.ParamsRequest) => {
    return Request<UPSTREAM_OVER_RES.DataResponse[]>({
        url: '/api/v1/screen/upstream-over-stat',
        server: 'wgmsScreenServer',
        method: 'get',
        params
    })
}
