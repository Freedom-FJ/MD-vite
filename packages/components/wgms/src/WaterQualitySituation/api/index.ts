/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 09:58:55
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { WATER_QUALITY_SITUATION_API_REQUEST, WATER_QUALITY_SITUATION_API_RESPONSE } from './types'

/**
 * @name: 水质现状 WaterQualitySituation
 */
export const waterQualityStatus = (params: WATER_QUALITY_SITUATION_API_REQUEST.waterQualityStatus) => {
    return Request<WATER_QUALITY_SITUATION_API_RESPONSE.waterQualityStatus[]>({
        url: '/api/v1/screen/water-quality-status',
        server: 'wgmsScreenServer',
        method: 'get',
        params
    })
}
