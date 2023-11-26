/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-27 11:28:35
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { POLLUTION_SOURCE_API_REQUEST, POLLUTION_SOURCE_API_RESPONSE } from './types'

// 重点源超标前三
export const pomsAlarm = (params: POLLUTION_SOURCE_API_REQUEST.pomsAlarm, option: ApiObjTs = {}) => {
    return Request< POLLUTION_SOURCE_API_RESPONSE.pomsAlarm[]>({
        url: '/api/v1/screen/poms-over-top-three',
        server: 'wgmsScreenServer',
        params,
        ...(option.url ? option : {})
    })
}

// 入河排污口
export const portToRiver = (params: POLLUTION_SOURCE_API_REQUEST.pomsAlarm, option: ApiObjTs = {}) => {
    return Request< POLLUTION_SOURCE_API_RESPONSE.portToRiver>({
        url: '/api/v1/screen/outlet-np-over-stat',
        server: 'wgmsScreenServer',
        params,
        ...(option.url ? option : {})
    })
}

// 重点源超标统计
export const pomsFactorAlarm = (params: POLLUTION_SOURCE_API_REQUEST.pomsAlarm, option: ApiObjTs = {}) => {
    return Request< POLLUTION_SOURCE_API_RESPONSE.pomsFactorAlarm>({
        url: '/api/v1/screen/poms-over-stat',
        server: 'wgmsScreenServer',
        params,
        ...(option.url ? option : {})
    })
}
