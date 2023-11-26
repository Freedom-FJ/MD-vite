/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-28 11:13:54
 * @Description:
 */

export declare namespace SEVEN_DAY_KLINE_API_REQUEST {
    interface getKLine {
        accessCode: string
        factor: number | string
        factorFlag: boolean
        beginTime: number
        endTime: number
        queryTimeType: string
    }
}
export declare namespace SEVEN_DAY_KLINE_API_RESPONSE {

    interface getKLineTs {
        'time': string
        'value': string
        'quality': number
        'maxValue': number | string
        'minValue': number | string
        'firstValue': number | string
        'lastValue': number | string
    }
}
