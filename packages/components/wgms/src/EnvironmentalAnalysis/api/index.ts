/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-07 17:59:47
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { ENV_ANALYSIS_API_REQUEST, ENV_ANALYSIS_API_RESPONSE } from './types'

// 地表水-重点因子
export const factor = (params: ENV_ANALYSIS_API_REQUEST.factor, option: ApiObjTs = {}) => {
    return Request<ENV_ANALYSIS_API_RESPONSE.mainMonthApiTs[]>({
        url: '/api/v3.0/surfaceWater/app/main/factor',
        server: 'wgmsMonitorDataServer',
        params,
        ...(option.url ? option : {})
    })
}

// 地表水-重点月份
export const month = (params: ENV_ANALYSIS_API_REQUEST.factor, option: ApiObjTs = {}) => {
    return Request<ENV_ANALYSIS_API_RESPONSE.mainMonthApiTs[]>({
        url: '/api/v3.0/surfaceWater/app/main/month',
        server: 'wgmsMonitorDataServer',
        params,
        ...(option.url ? option : {})
    })
}

export const getKeyArea = (params: ENV_ANALYSIS_API_REQUEST.factor, option: ApiObjTs = {}) => {
    return Request<ENV_ANALYSIS_API_RESPONSE.mainMonthApiTs[]>({
        url: '/api/v3.0/surfaceWater/app/main/area',
        server: 'wgmsMonitorDataServer',
        method: 'get',
        params,
        ...(option.url ? option : {})
    })
}
