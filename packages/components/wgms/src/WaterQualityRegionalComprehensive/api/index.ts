/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 11:10:37
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { WATER_QUALITY_REGIONAL_API_REQUEST, WATER_QUALITY_REGIONAL_API_RESPONSE } from './types'

/**
 * @name: rainHydrologyAnalyse
 * @test: test font
 * @msg: 水位趋势对比图
 * @param {ENV_ANALYSIS_API_REQUEST} params
 * @return {*}
 */
export const synthesisIndexChange = (params: WATER_QUALITY_REGIONAL_API_REQUEST.synthesisIndexChange) => {
    return Request<WATER_QUALITY_REGIONAL_API_RESPONSE.synthesisIndexChange[]>({
        url: '/api/v1/screen/synthesis-index-change',
        server: 'wgmsScreenServer',
        method: 'get',
        params
    })
}
