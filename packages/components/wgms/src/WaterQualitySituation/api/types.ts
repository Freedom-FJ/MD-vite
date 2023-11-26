/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 10:04:02
 * @Description:
 */

export declare namespace WATER_QUALITY_SITUATION_API_REQUEST {
    interface waterQualityStatus {
        treeId: number | string
        treeType: number
        year: number | string
    }
}
export declare namespace WATER_QUALITY_SITUATION_API_RESPONSE {

    interface waterQualityStatus {
        childList?: {
            stationTypeCode: string
            stationTypeName: string
            total: null
            excellentPercent: number
            targetPercent: null
            yoyPercent: number
            childList: null
        }[]
        excellentPercent: number
        stationTypeCode: string
        stationTypeName: string
        targetPercent: number
        total: number
        yoyPercent: number
      }
}
