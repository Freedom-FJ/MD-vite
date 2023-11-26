/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 14:56:03
 * @Description:
 */
export declare namespace POMS_MONITOR_RES {
    interface ParamsRequest {
        treeId: number | string
        treeType: number
        year: string
    }
    interface DataResponse {
        equipmentCount: number | null
        mainCount: number | null
        mainPerent: number | null
        onlinePercent: number | null
        totalCount: number | null
    }
}
