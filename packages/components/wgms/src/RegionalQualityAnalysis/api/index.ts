/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 10:36:35
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { REGIONAL_QUALITY_ANALYSIS_API_REQUEST, REGIONAL_QUALITY_ANALYSIS_API_RESPONSE } from './types'

/**
 * @name: rainHydrologyAnalyse
 * @test: test font
 * @msg: 水位趋势对比图
 * @param {ENV_ANALYSIS_API_REQUEST} params
 * @return {*}
 */
export const synthesisIndex = (params: REGIONAL_QUALITY_ANALYSIS_API_REQUEST.synthesisIndex) => {
    return Request<REGIONAL_QUALITY_ANALYSIS_API_RESPONSE.synthesisIndex[]>({
        url: '/api/v1/screen/water-quality-analyze/synthesis-index',
        server: 'wgmsScreenServer',
        method: 'get',
        params
    })
}
