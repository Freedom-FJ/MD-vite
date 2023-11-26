/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-27 20:44:49
 * @Description:
 */

export declare namespace CROSS_SECTION_CORRELATION_API_REQUEST {
    interface correlationAnalysis {
        alarmTimeStr?: any
        startTime: any
        endTime: any
        factorCode: string
        siteCode: string
        sourceIds?: string
        distance?: any
        alarmTypeCode?: string
        alarmTypeName?: string
        timeType?: string
        alarmTimeStart?: number
        dataTime?: string | number
    }
}
export declare namespace CROSS_SECTION_CORRELATION_API_RESPONSE {

    interface correlationAnalysisTs {
        alarmCount: string
        corr: string | number
        rank: string | number
        name: string
    }
}
