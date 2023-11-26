/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 11:39:19
 * @Description:
 */
export declare namespace STATION_WATER_QUALITY_STATISTICS_API_REQUEST {
    interface waterQualityStatistic {
        treeId: number | string
        treeType: number
        year: number | string
    }
}
export declare namespace STATION_WATER_QUALITY_STATISTICS_API_RESPONSE {
    interface waterQualityStatistic {
        dataTime: string
        level: number
        levelName: string
        levelColor: string
        target: number
        targetName: string
        targetColor: string
        siteCode: string
        siteName: string
        yoyLevel: number
        yoyLevelName: string
        yoyLevelColor: string
    }
}
