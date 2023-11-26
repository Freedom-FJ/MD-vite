/*
 * @Author: Tian
 * @Date: 2023-07-21 13:49:25
 * @LastEditors: Tian
 * @LastEditTime: 2023-07-26 15:13:51
 * @Description: 环境在线监测接口
 */
import Request from '../../../service/request'
import type { KEY_RIVER_RES } from './types'
export const getKeyRiverData = (params: KEY_RIVER_RES.ParamsRequest) => {
    return Request<KEY_RIVER_RES.DataResponse[]>({
        url: '/api/v1/screen/main-river-water-quality',
        server: 'wgmsScreenServer',
        method: 'get',
        params
    })
}
