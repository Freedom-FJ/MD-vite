/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-24 11:23:11
 * @Description:
 */
export declare namespace SUBORDINATE_RANKING_API_REQUEST {
    interface waterSubordinateRanking {
        treeId: number | string
        startTime: number
        endTime: number
        timeType: string
        controlLevel: string | number
    }
}
export declare namespace SUBORDINATE_RANKING_API_RESPONSE {
    interface waterSubordinateRankingTs {
        regionId: string
        regionName: string
        rankNo: string
        precent: string
        value: string
    }
}
