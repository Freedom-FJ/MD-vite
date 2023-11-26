/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-27 20:28:11
 * @Description:
 */

export declare namespace CHNAGEES_ALONG_THE_PROCESS_API_REQUEST {
    interface pathAnalysis {
        dataType: number | string // 数据类型 自动/手工(0/1)
        endTime: number
        siteCode: string // 站点编码
        sourceIds: string // 关联的站点id
        startTime: number
        stationCode: number | string
        timeType: string
    }
}
export declare namespace CHNAGEES_ALONG_THE_PROCESS_API_RESPONSE {

    interface pathAnalysisTs {
    }
}
