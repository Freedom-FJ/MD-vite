/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 11:15:11
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { STATION_WATER_QUALITY_STATISTICS_API_REQUEST, STATION_WATER_QUALITY_STATISTICS_API_RESPONSE } from './types'

/**
 * @name: rainHydrologyAnalyse
 * @test: test font
 * @msg: 水位趋势对比图
 * @param {ENV_ANALYSIS_API_REQUEST} params
 * @return {*}
 */
export const waterQualityStatistic = (params: STATION_WATER_QUALITY_STATISTICS_API_REQUEST.waterQualityStatistic) => {
    return Request<STATION_WATER_QUALITY_STATISTICS_API_RESPONSE.waterQualityStatistic[]>({
        url: '/api/v1/screen/water-quality-statistic',
        server: 'wgmsScreenServer',
        method: 'get',
        params
    })
}
