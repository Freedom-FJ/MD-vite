/*
 * @Author: mjh
 * @Date: 2023-09-13 10:00:49
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-13 10:01:01
 * @Description:
 */
export interface ApiParamsProps {
    startTime: number
    endTime: number
    codeType: string
    codes: string
}

export interface OuterDataItemProps {
    time: string
    value: number
}
