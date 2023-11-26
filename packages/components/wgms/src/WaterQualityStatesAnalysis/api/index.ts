/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 11:03:55
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { WATER_QUALITY_STATES_ANALYSIS_API_REQUEST, WATER_QUALITY_STATES_ANALYSIS_API_RESPONSE } from './types'

/**
 * @name: rainHydrologyAnalyse
 * @test: test font
 * @msg: 水位趋势对比图
 * @param {ENV_ANALYSIS_API_REQUEST} params
 * @return {*}
 */
export const waterQualityAnalyze = (params: WATER_QUALITY_STATES_ANALYSIS_API_REQUEST.waterQualityAnalyze) => {
    return Request<WATER_QUALITY_STATES_ANALYSIS_API_RESPONSE.waterQualityAnalyze[]>({
        url: '/api/v1/screen/water-quality-analyze',
        server: 'wgmsScreenServer',
        method: 'get',
        params
    })
}
