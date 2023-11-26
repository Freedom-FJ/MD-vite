/*
 * @Author: Tian
 * @Date: 2023-07-21 13:49:25
 * @LastEditors: Tian
 * @LastEditTime: 2023-07-21 16:58:11
 * @Description: 水质类别接口
 */
import Request from '../../../service/request'
import type { WATER_QUALITY_PERCENT_RES } from './types'
export const getWaterQualityData = (params: WATER_QUALITY_PERCENT_RES.ParamsRequest) => {
    return Request<WATER_QUALITY_PERCENT_RES.DataResponse[]>({
        url: '/api/v1/screen/water-quality-percent',
        server: 'wgmsScreenServer',
        method: 'get',
        params
    })
}
