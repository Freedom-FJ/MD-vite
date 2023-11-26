/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: admin
 * @LastEditTime: 2023-07-28 14:15:51
 * @Description:
 */

export declare namespace WATER_QUALITY_RAINFALL_API_REQUEST {
    interface rainHydrologyAnalyse {
        beginTime: number
        endTime: number
        latitude: number
        longitude: number
        queryTimeType: string
    }
}
export declare namespace WATER_QUALITY_RAINFALL_API_RESPONSE {

    interface rainHydrologyAnalyseTs {
        'time': string
        'factorValue': string
        'hydrology': string
        'rain': string
        'quality': null | string
    }
}
