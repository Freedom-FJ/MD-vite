/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 11:03:40
 * @Description:
 */
export declare namespace WATER_QUALITY_STATES_ANALYSIS_API_REQUEST {
    interface waterQualityAnalyze {
        treeId: number | string
        treeType: number
        year: number | string
    }
}
export declare namespace WATER_QUALITY_STATES_ANALYSIS_API_RESPONSE {
    interface waterQualityAnalyze {
        'excellentPercent': number
        'minorVPercent': number
        'regionCode': string
        'regionName': string
    }
}
