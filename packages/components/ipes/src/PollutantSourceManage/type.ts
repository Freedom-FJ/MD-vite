/*
 * @Author: mjh
 * @Date: 2023-07-19 09:27:24
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-31 14:23:39
 * @Description:
 */

export interface StatuObj {
    abnormal: number
    normal: number
    offline: number
    total: number
}
export interface StatusData {
    wg: StatuObj
    ww: StatuObj
}

export interface StatusOption {
    key: keyof StatuObj
    color: string
}

export interface CardItem {
    title: string
    key: keyof StatusData
}
