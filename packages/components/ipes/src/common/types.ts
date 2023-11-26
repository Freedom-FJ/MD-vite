/*
 * @Author: mjh
 * @Date: 2023-08-11 14:12:26
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-11 14:12:32
 * @Description:
 */
export interface AirQuality {
    time: string
    aqiValue: number | null
    aqiColor: string
    aqiLevel: string
    mainPolluter: string
}
