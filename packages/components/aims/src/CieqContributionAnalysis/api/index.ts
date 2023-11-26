/*
 * @Author: mjh
 * @Date: 2023-09-08 15:36:08
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-13 10:04:16
 * @Description:
 */
import request from '../../../service/request'

interface GetContributionAnalyzeDataParams {
    gridCode: string
    startTime: number
    endTime: number
    order: string
    isAsc: boolean
    type: string
    gridLevelNickName: string
}

export type PropGetContributionAnalyzeDataParams = Omit<GetContributionAnalyzeDataParams, 'gridLevelNickName'>
interface ResData {
    code: string
    pastValue: number | string
    name: string
    rank: string
    changeValue: number | string
    draw: string
    currentValue: number | string
}
interface ExcellentRateData {
    fineRate: ResData[]
}
// 获取综合指数排名
export const getContributionAnalyze = (params: GetContributionAnalyzeDataParams) => {
    return request<ResData[]>({
        url: '/aims-server/web/api/v1/analysis-map/cieq-detail',
        method: 'get',
        params,
    })
}
// 获取优良率排名
export const getExcellentRate = (params: GetContributionAnalyzeDataParams) => {
    return request<ExcellentRateData>({
        url: '/aims-server/web/api/v1/analysis-map/air-quality-detail',
        method: 'get',
        params,
    })
}
export type { GetContributionAnalyzeDataParams, ResData }
