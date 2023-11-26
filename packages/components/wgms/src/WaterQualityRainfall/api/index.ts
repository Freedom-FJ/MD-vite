/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-28 14:17:57
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { WATER_QUALITY_RAINFALL_API_REQUEST, WATER_QUALITY_RAINFALL_API_RESPONSE } from './types'

/**
 * @name: rainHydrologyAnalyse
 * @test: test font
 * @msg: 水位趋势对比图
 * @param {ENV_ANALYSIS_API_REQUEST} params
 * @return {*}
 */
export const rainHydrologyAnalyse = (params: WATER_QUALITY_RAINFALL_API_REQUEST.rainHydrologyAnalyse) => {
    return Request<WATER_QUALITY_RAINFALL_API_RESPONSE.rainHydrologyAnalyseTs[]>({
        url: '/api/v3.0/surfaceWater/analyse/rain-hydrology-analyse',
        server: 'wgmsMonitorDataServer',
        method: 'get',
        params
    })
}

/**
 * @name: waterSurfaceListAll
 * @test: test font
 * @msg: 地表水断面水质等级
 * @param {UPSTREAM_IMPACT_API_REQUEST} params
 * @return {*}
 */
export const waterSurfaceListAll = (params: {}) => {
    return Request<any, true>({
        url: '/api/v1.0/water/qualityGrade/listAll',
        server: 'envStandardManagerServer',
        params
    })
}
