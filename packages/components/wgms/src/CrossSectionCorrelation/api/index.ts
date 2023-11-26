/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-27 20:41:12
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { CROSS_SECTION_CORRELATION_API_REQUEST, CROSS_SECTION_CORRELATION_API_RESPONSE } from './types'

/**
 * @name: correlationAnalysis
 * @test: test font
 * @msg: 相关性分析
 * @param {CROSS_SECTION_CORRELATION_API_REQUEST} params
 * @return {*}
 */
export const correlationAnalysis = (params: CROSS_SECTION_CORRELATION_API_REQUEST.correlationAnalysis) => {
    return Request<CROSS_SECTION_CORRELATION_API_RESPONSE.correlationAnalysisTs, true>({
        url: '/api/v3.0/surfaceWater/analyse/correlation-analysis',
        server: 'wgmsMonitorDataServer',
        params
    })
}
