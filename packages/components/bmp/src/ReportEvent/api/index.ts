import Request from '../../../service/request'

import type { Event_CENTER_API_REQUEST, Event_CENTER_API_RESPONSE } from './types'

// 事件上报统计
export const countOfTodayNewAndStatus = (data: Event_CENTER_API_REQUEST.countOfTodayNewAndStatus) => {
    return Request<Event_CENTER_API_RESPONSE.countOfTodayNewAndStatusTs, false>({
        url: '/api/v1/eventStatistic/eventControl/countOfTodayNewAndStatus',
        server: 'bmpEventCenterServer',
        method: 'post',
        data
    })
}
