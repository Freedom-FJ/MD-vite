/*
 * @Author: mjh
 * @Date: 2023-07-07 16:21:24
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-24 11:18:52
 * @Description:
 */

import Request from '../../../service/request'

/**
 * @name: waterSubordinateRanking
 * @test: test font
 * @msg: 地表水大屏--环境现状--下级排名
 * @param {WATER_API_REQUEST} data
 * @return {*}
 */
import type { SUBORDINATE_RANKING_API_REQUEST, SUBORDINATE_RANKING_API_RESPONSE } from './types'
export const waterSubordinateRanking = (params: SUBORDINATE_RANKING_API_REQUEST.waterSubordinateRanking) => {
    return Request<SUBORDINATE_RANKING_API_RESPONSE.waterSubordinateRankingTs, false>({
        url: '/api/v1/screen/water-level-ranking',
        server: 'wgmsScreenServer',
        params
    })
}
