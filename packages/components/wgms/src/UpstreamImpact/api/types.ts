/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-28 10:02:43
 * @Description:
 */

export declare namespace UPSTREAM_IMPACT_API_REQUEST {
    interface pathAnalysis {
        accessCode: string
        factor: number | string
        beginTime: number
        endTime: number
        queryTimeType: string
        limit: number
    }
    interface surfaceWaterStandard {
        accessCodeList?: string
        baseLevel: string | number
        factor: number | string
        factorFlag?: boolean
        configTime: number
    }
}
export declare namespace UPSTREAM_IMPACT_API_RESPONSE {

    interface pathAnalysisTs {
        alarmNum: number | string
        coefficient: null
        coefficientDoubleValue: number | string
        coefficientPre: string
        quality: number
        rank: number | string
        siteName: string
        value: number | string
    }
}
