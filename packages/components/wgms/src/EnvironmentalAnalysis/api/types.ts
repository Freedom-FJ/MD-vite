/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: Tian
 * @LastEditTime: 2023-07-27 09:19:36
 * @Description:
 * @Description:
 */

export declare namespace ENV_ANALYSIS_API_REQUEST {
    interface factor {
        treeId: string | number
        treeType: number
        beginTime: number
        endTime: number
        queryTimeType: string
        factor?: string | number
        factorFlag?: boolean
        controlLevel: string
    }
}
export declare namespace ENV_ANALYSIS_API_RESPONSE {

    interface mainMonthApiTs {
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
}
