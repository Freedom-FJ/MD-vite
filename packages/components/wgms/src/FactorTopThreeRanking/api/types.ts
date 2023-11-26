/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-24 10:53:20
 * @Description:
 */
export declare namespace DISTRIBUTION_POINT_API_REQUEST {
    interface situation {
        monitorType: string | number
        treeId: string | number
    }
}
export declare namespace DISTRIBUTION_POINT_API_RESPONSE {
    interface situation {
        'parentCode': null | string
        'code': null | string
        'name': string
        'count': number
        'url': string
    }
}
