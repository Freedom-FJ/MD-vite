/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 10:36:47
 * @Description:
 */
export declare namespace REGIONAL_QUALITY_ANALYSIS_API_REQUEST {
    interface synthesisIndex {
        treeId: number | string
        treeType: number
        year: number | string
    }
}
export declare namespace REGIONAL_QUALITY_ANALYSIS_API_RESPONSE {
    interface synthesisIndex {
        'changePercent': number
        'currentPeriod': number
        'regionCode': string
        'regionName': string
        'yoyPeriod': number
    }
}
