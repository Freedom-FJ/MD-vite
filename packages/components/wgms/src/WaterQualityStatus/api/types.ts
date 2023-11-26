/*
 * @Author: Tian
 * @Date: 2023-07-21 17:22:29
 * @LastEditors: Tian
 * @LastEditTime: 2023-07-26 14:29:26
 * @Description:
 */
export declare namespace REACH_STANDARD_RES {
    interface ParamsRequest {
        regionCode: number | string
        endTime: number
        startTime: number
    }
    interface DataResponse {
        name: string
        reachStandardRate: number
        target: number
        yoy: number
    }
}
