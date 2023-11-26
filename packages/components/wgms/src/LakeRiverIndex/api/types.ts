/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-27 15:14:54
 * @Description:
 */
export declare namespace LAKE_RIVER_INDEX_API_REQUEST {
    interface WgmsNodeWaterSituationParams {
        startTime: number
        endTime: number
        factorGroupId: string | number
        treeType: string | number
        treeId: string | number
        timeType: string | number
        queryType: string | number

    }

}
export declare namespace LAKE_RIVER_INDEX_API_RESPONSE {
    interface WgmsNodeWaterSituationRes {
        name: string
        waterQualityName: string
        waterQualityColor: string
        yoy?: number
        eutrophia?: string
    }
}
