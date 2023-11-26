/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-27 09:45:10
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { AUXILIARY_JUDGMENT_API_REQUEST, AUXILIARY_JUDGMENT_API_RESPONSE } from './types'

/**
 * @name: analysisResult
 * @test: test font
 * @msg: K线
 * @param {AUXILIARY_JUDGMENT_API_REQUEST} params
 * @return {*}
 */
export const analysisResult = (params: AUXILIARY_JUDGMENT_API_REQUEST.analysisResult) => {
    return Request<string[]>({
        url: '/api/v1/screen/auxiliary-judgment',
        server: 'wgmsScreenServer',
        method: 'get',
        params
    })
}
