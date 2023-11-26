/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 15:43:17
 * @Description:
 */
export declare namespace WATER_QUALITY_LEVEL_RES {
    interface ParamsRequest {
        treeId: number | string
        treeType: number
        year: string
    }
    interface DataResponse {
        count: number | null
        level: number | null
        levelName: string | null
        percent: number | null
        qoqPercent: number | null
        totalCount: number | null
    }
}
