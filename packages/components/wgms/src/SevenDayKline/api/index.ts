/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-28 11:29:01
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { SEVEN_DAY_KLINE_API_REQUEST, SEVEN_DAY_KLINE_API_RESPONSE } from './types'

/**
 * @name: getKLine
 * @test: test font
 * @msg: K线
 * @param {SEVEN_DAY_KLINE_API_REQUEST} params
 * @return {*}
 */
export const getKLine = (params: SEVEN_DAY_KLINE_API_REQUEST.getKLine) => {
    return Request<SEVEN_DAY_KLINE_API_RESPONSE.getKLineTs[]>({
        url: '/api/v1.0/analyse/kLineAnalyse',
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
