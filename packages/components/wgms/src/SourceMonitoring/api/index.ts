/*
 * @Author: Tian
 * @Date: 2023-08-24 15:07:34
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 13:37:31
 * @Description:
 */
import Request from '../../../service/request'
import type { POMS_MONITOR_RES } from './types'
export const pomsMonitor = (params: POMS_MONITOR_RES.ParamsRequest) => {
    return Request<POMS_MONITOR_RES.DataResponse, false>({
        url: '/api/v1/screen/pollution-company-monitor',
        server: 'wgmsScreenServer',
        params
    })
}
