/*
 * @Author: Tian
 * @Date: 2023-07-21 13:49:25
 * @LastEditors: Tian
 * @LastEditTime: 2023-07-26 15:13:51
 * @Description: 环境在线监测接口
 */
import Request from '../../../service/request'
import type { OUTLETS_ONLINE_RES } from './types'
export const getOutletsOnlineData = (params: OUTLETS_ONLINE_RES.ParamsRequest) => {
    return Request<OUTLETS_ONLINE_RES.DataResponse>({
        url: '/api/v1/screen/outlet-online-statistic',
        server: 'wgmsScreenServer',
        method: 'get',
        params
    })
}
