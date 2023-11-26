/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-27 10:03:02
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { CHNAGEES_ALONG_THE_PROCESS_API_REQUEST, CHNAGEES_ALONG_THE_PROCESS_API_RESPONSE } from './types'

/**
 * @name: pathAnalysis
 * @test: test font
 * @msg: 沿程分析
 * @param {UPSTREAM_IMPACT_API_REQUEST} params
 * @return {*}
 */
export const pathAnalysis = (params: CHNAGEES_ALONG_THE_PROCESS_API_REQUEST.pathAnalysis) => {
    return Request<CHNAGEES_ALONG_THE_PROCESS_API_RESPONSE.pathAnalysisTs, true>({
        url: '/api/v1/screen/algae-path-analyse',
        server: 'wgmsScreenServer',
        params
    })
}
