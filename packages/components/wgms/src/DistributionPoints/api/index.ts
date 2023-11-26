/*
 * @Author: mjh
 * @Date: 2023-07-07 16:21:24
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-21 17:29:55
 * @Description:
 */

import Request from '../../../service/request'
import type { DISTRIBUTION_POINT_API_REQUEST, DISTRIBUTION_POINT_API_RESPONSE } from './types'
export const situation = (params: DISTRIBUTION_POINT_API_REQUEST.situation) => {
    return Request<DISTRIBUTION_POINT_API_RESPONSE.situation[], false>({
        url: '/api/v1/screen/site-situation',
        server: 'wgmsScreenServer',
        params
    })
}
