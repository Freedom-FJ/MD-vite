/*
 * @Author: Tian
 * @Date: 2023-07-21 17:22:29
 * @LastEditors: admin
 * @LastEditTime: 2023-07-27 20:29:08
 * @Description:
 */
export declare namespace UPSTREAM_OVER_RES {
    interface ParamsRequest {
        dataType: number | string // 数据类型 自动/手工(0/1)
        endTime: number
        siteCode: string // 站点编码
        sourceIds: string // 关联的站点id
        startTime: number
        stationCode: number | string
        timeType: string
    }
    interface DataResponse {
        'alarmCount': number
        'nh3OverNum': number
        'rank': number
        'siteCode': string
        'siteName': string
        'totalOverNum': number
        'tpOverNum': number
    }
}
