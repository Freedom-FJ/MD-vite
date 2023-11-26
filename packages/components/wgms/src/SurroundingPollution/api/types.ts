/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-28 14:50:44
 * @Description:
 */

export declare namespace SURROUND_POLLUTION_API_REQUEST {
    interface queryFactorGroup {
       code: string
    }

    interface pomsAlarm {
        queryTimeType: string
        beginTime: number
        endTime: number
        factorFlag: boolean
        factor: number
        longitude: number
        latitude: number
        distance: number
        limit: number
        minWave?: number
    }

    interface pomsAnalysis {
        startTime: number
        endTime: number
        factorCode: string
        siteCode: string
        distance: number
        timeType: string
    }

    interface countEventStatusByTimePoint {
        envTypeCodeList: []
        siteCodeList: any
        timeStamp: number
        centerLatitude: string
        centerLongitude: string
    }
}
export declare namespace SURROUND_POLLUTION_API_RESPONSE {

    interface queryFactorGroupTs {
        'id': string
        'name': string
        'code': string
        'factors': {
            'id': string
            'factorIndex': string
            'unit': string
            'factorIndexName': string
            'factorIndexCode': string
            'unitName': string
            'unitCode': string
            'decimalPlace': number
        }[]
        'factorIndexs': null
    }

    interface pomsAlarmTs {
        'value': string
        'siteName': string
        'coefficient': null
        'alarmNum': string | number
        'rank': number
        'quality': null
        'coefficientDoubleValue': number
        'coefficientPre': string
    }

    interface pomsAnalysisTs {
        companyName: string
        rank: string
        adjacentPre: string
    }

    interface countEventStatusByTimePointTs {
        notDisposedCount: number
        totalCount: number
    }
}
