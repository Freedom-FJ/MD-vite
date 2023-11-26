/*
 * @Author: mjh
 * @Date: 2023-09-13 10:05:42
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-13 10:05:48
 * @Description:
 */
export interface ListItemProps {
    code: string
    id: string | number
    pastValue: number | string
    name: string
    rank: string | number
    ratioColor: string
    changeValue: number | string
    draw: string
    arrowUrl?: string
    arrowClass?: string
    whiteArrowUrl?: string
    currentValue: number | string
}
export interface StateProps {
    listData: ListItemProps[]
    scrollTime: number
}
