/*
 * @Author: mjh
 * @Date: 2023-07-04 17:00:21
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-04 18:32:23
 * @Description:
 */
export interface mainMonthApiTs {
    'id': null
    'name': '8月'
    'code': '8'
    'centerPosition': null
    'total': 0
    'validNum': 1
    'reachNum': 0
    'rate': 0
    'rank': '9'
}

export type AllTypes = 'month' | 'factor' | 'area'

export interface SelectListItem {
    value: string | number
    label: string
}
