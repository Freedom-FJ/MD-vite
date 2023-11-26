/*
 * @Author: Tian
 * @Date: 2023-07-26 15:10:58
 * @LastEditors: Tian
 * @LastEditTime: 2023-07-26 15:15:04
 * @Description:
 */
export declare namespace KEY_RIVER_RES {
    interface ParamsRequest {
        startTime: number
        endTime: number
        timeType: string
        treeId: string
    }
    interface DataResponse {
        color: string
        evaluate: string
        name: string
        yoyType: number
        grade: number
    }
}
