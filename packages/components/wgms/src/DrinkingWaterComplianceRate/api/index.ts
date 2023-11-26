/*
 * @Author: Tian
 * @Date: 2023-07-21 13:49:25
 * @LastEditors: Tian
 * @LastEditTime: 2023-07-26 15:13:51
 * @Description: 环境在线监测接口
 */
import Request from '../../../service/request'
import type { DRINK_WATER_RES } from './types'
export const getDrinkWaterData = (params: DRINK_WATER_RES.ParamsRequest) => {
    return Request<DRINK_WATER_RES.DataResponse[]>({
        url: '/api/v1/screen/drink-source-stat',
        server: 'wgmsScreenServer',
        method: 'get',
        params
    })
}
