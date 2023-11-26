/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-28 10:00:25
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { UPSTREAM_IMPACT_API_REQUEST, UPSTREAM_IMPACT_API_RESPONSE } from './types'

/**
 * @name: pathAnalysis
 * @test: test font
 * @msg: 沿程分析
 * @param {UPSTREAM_IMPACT_API_REQUEST} params
 * @return {*}
 */
export const pathAnalysis = (params: UPSTREAM_IMPACT_API_REQUEST.pathAnalysis) => {
    return Request<UPSTREAM_IMPACT_API_RESPONSE.pathAnalysisTs, true>({
        url: '/api/v3.0/surfaceWater/analyse/path-analyse',
        server: 'wgmsMonitorDataServer',
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

/**
 * @name: surfaceWaterStandard
 * @test: test font
 * @msg: 获取站点目标值
 * @param {UPSTREAM_IMPACT_API_REQUEST} params
 * @return {*}
 */
export const surfaceWaterStandard = (params: UPSTREAM_IMPACT_API_REQUEST.surfaceWaterStandard) => {
    return Request<any, true>({
        url: '/api/v3.0/quality/limit/surfaceWater',
        server: 'wgmsMonitorDataServer',
        params
    })
}
