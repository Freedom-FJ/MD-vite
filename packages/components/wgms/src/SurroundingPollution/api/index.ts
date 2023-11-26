/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-28 14:45:27
 * @Description:
 */
import type { ApiObjTs } from '../../../service/types'
import Request from '../../../service/request'

import type { SURROUND_POLLUTION_API_REQUEST, SURROUND_POLLUTION_API_RESPONSE } from './types'
/**
 * @name: queryFactorGroup
 * @test: test font
 * @msg: 获取因子组信息
 * @param {SURROUND_POLLUTION_API_REQUEST} params
 * @return {*}
 */
export const queryFactorGroup = (params: SURROUND_POLLUTION_API_REQUEST.queryFactorGroup) => {
    return Request<SURROUND_POLLUTION_API_RESPONSE.queryFactorGroupTs, true>({
        url: '/api/v1.0/factor/functionPoint/queryFactorGroupByCode',
        server: 'wgmsBaseServer',
        params
    })
}
/**
 * @name: pomsAlarm
 * @test: test font
 * @msg: 重点源预警
 * @param {SURROUND_POLLUTION_API_REQUEST} params
 * @return {*}
 */
export const pomsAlarm = (params: SURROUND_POLLUTION_API_REQUEST.pomsAlarm) => {
    return Request<SURROUND_POLLUTION_API_RESPONSE.pomsAlarmTs, true>({
        url: '/api/v3.0/analyse/poms-analyse',
        server: 'wgmsSewageDataServer',
        params
    })
}
/**
 * @name: pomsAnalysis
 * @test: test font
 * @msg: 重点波动率
 * @param {SURROUND_POLLUTION_API_REQUEST} params
 * @return {*}
 */
export const pomsAnalysis = (params: SURROUND_POLLUTION_API_REQUEST.pomsAnalysis) => {
    return Request<SURROUND_POLLUTION_API_RESPONSE.pomsAnalysisTs, true>({
        url: '/api/v3.0/analyse/poms-analyse',
        server: 'wgmsSewageDataServer',
        params
    })
}

/**
 * @name: countEventStatusByTimePoint
 * @test: test font
 * @msg: 获取某一时间点之后的状态数量统计
 * @param {SURROUND_POLLUTION_API_REQUEST} params
 * @return {*}
 */
export const countEventStatusByTimePoint = (data: SURROUND_POLLUTION_API_REQUEST.countEventStatusByTimePoint, option: ApiObjTs = {}) => {
    return Request<any>({
        url: '/api/v1/event/statistic/countEventStatusByTimePoint',
        server: 'bmpEventCenterServer',
        data,
        method: 'post',
        ...option
    })
}
