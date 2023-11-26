/*
 * @Author: mjh
 * @Date: 2023-07-24 11:10:03
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-27 14:10:05
 * @Description:
 */
import Request from '../../../service/request'
import type { LAKE_RIVER_INDEX_API_REQUEST, LAKE_RIVER_INDEX_API_RESPONSE } from './types'
/**
  * 获取重要流域、重要水体水质数据
  */
export const getWgmsNodeWaterSituation = (params: LAKE_RIVER_INDEX_API_REQUEST.WgmsNodeWaterSituationParams) => {
    return Request<LAKE_RIVER_INDEX_API_RESPONSE.WgmsNodeWaterSituationRes[]>({
        url: '/api/v1/screen/main-water-quality',
        server: 'wgmsScreenServer',
        params
    })
}
/**
 * 获取湖库富营养化指数数据
 */
export const getWgmsEutrophiaList = (params: LAKE_RIVER_INDEX_API_REQUEST.WgmsNodeWaterSituationParams) => {
    return Request<LAKE_RIVER_INDEX_API_RESPONSE.WgmsNodeWaterSituationRes[]>({
        url: '/api/v1/screen/main-lake-eutrophia',
        server: 'wgmsScreenServer',
        params
    })
}
