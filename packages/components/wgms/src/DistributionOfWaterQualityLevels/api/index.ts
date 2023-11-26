/*
 * @Author: Tian
 * @Date: 2023-08-24 15:07:34
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 15:47:00
 * @Description:
 */
import Request from '../../../service/request'
import type { WATER_QUALITY_LEVEL_RES } from './types'
export const waterQualityLevel = (params: WATER_QUALITY_LEVEL_RES.ParamsRequest) => {
    return Request<WATER_QUALITY_LEVEL_RES.DataResponse[], false>({
        url: '/api/v1/screen/water-quality-level-distribution',
        server: 'wgmsScreenServer',
        params
    })
}
