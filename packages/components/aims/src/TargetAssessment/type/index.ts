/*
 * @Author: mjh
 * @Date: 2023-09-13 10:02:48
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-13 10:03:09
 * @Description:
 */
import type { GetScreenCityListItem } from '../api'
export interface StateProps {
    upToStandardNum: string
    notUpToStandardNum: string
    listData: Array<Partial<GetScreenCityListItem> & { rank: number; targetStatusColor: string }>
    scrollTime?: number
}
