/*
 * @Author: Tian
 * @Date: 2023-07-26 15:10:58
 * @LastEditors: Tian
 * @LastEditTime: 2023-07-26 15:15:04
 * @Description:
 */
export declare namespace DRINK_WATER_RES {
    interface ParamsRequest {
        startTime: number
        endTime: number
        timeType: string
        factor: string
        factorFlag: boolean
        keyWord: string
        treeId: string
        waterSourceScaleCode: string

    }
    interface DataResponse {
        waterSourceScaleName: string
        reachRate: number
        siteNum: number
        waterSourceNum: number
    }
}
