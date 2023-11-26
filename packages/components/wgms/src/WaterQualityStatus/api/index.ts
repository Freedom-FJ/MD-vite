/*
 * @Author: Tian
 * @Date: 2023-07-21 12:19:21
 * @LastEditors: Tian
 * @LastEditTime: 2023-07-21 13:50:25
 * @Description: 水质现状接口
 */
import Request from '../../../service/request'
import type { REACH_STANDARD_RES } from './types'
export const getReachStandardData = (params: REACH_STANDARD_RES.ParamsRequest) => {
    return Request<REACH_STANDARD_RES.DataResponse[]>({
        url: '/api/v1/screen/reach-standard-rate',
        server: 'wgmsScreenServer',
        method: 'get',
        params
    })
}
