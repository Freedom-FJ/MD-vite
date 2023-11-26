/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-27 11:29:57
 * @Description:
 */

export declare namespace POLLUTION_SOURCE_API_REQUEST {
    interface pomsAlarm {
        startTime: number
        dataType: number
        endTime: number
        distance: number
        siteCode: string | number
        stationCode: string | number
        factorCodes: string
        timeType: string
    }
    interface portToRiver {
        startTime: number
        endTime: number
        distance: number
        longitude: number
        latitude: number
    }

    interface pomsFactorAlarm {
        startTime: number
        endTime: number
        distance: number
        siteCode: string | number
        timeType: string
    }
}
export declare namespace POLLUTION_SOURCE_API_RESPONSE {

    interface pomsAlarm {
        'pomsName': string
        'pomsCode': string
        'overCount': number
        'rank': number
    }

    interface portToRiver {
        noverCount: number
        poverCount: number
    }

    interface pomsFactorAlarm {
        'ncount': number
        'npercent': number
        'otherCount': number
        'otherPercent': number
        'overTotalCount': number
        'pcount': number
        'ppercent': number
        'totalCount': number
    }
}
