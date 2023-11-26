/*
 * @Author: Tian
 * @Date: 2023-07-27 14:48:53
 * @LastEditors: Tian
 * @LastEditTime: 2023-07-27 15:11:37
 * @Description
 */
export declare namespace WATER_QUALITY_PERCENT_RES {
    interface ParamsRequest {
        controlLevel: string
        treeId: number | string
        startTime: number
        endTime: number
        timeType: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'
    }
    interface DataResponse {
        waterQuality: string
        waterQualityColor: string
        count: number
        percent: number
        yoyPercent: number
    }
}
