/*
 * @Author: Tian
 * @Date: 2023-07-26 15:10:58
 * @LastEditors: Tian
 * @LastEditTime: 2023-07-26 15:15:04
 * @Description:
 */
export declare namespace OUTLETS_ONLINE_RES {
    interface ParamsRequest {
        outletType: '0' | '1'
        regionCode: string
    }
    interface DataResponse {
        outletOnlineDetailList: {
            name: string
            onlineCount: number
            percent: number
            value: number
        }[]
        total: number
    }
}
