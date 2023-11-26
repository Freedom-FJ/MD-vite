import Request from '../../../service/request'

import type { ALARM_CENTER_API_REQUEST, ALARM_CENTER_API_RESPONSE } from './types'

// 预警处置统计
export const countByTimeGapAndAllDisposalStatus = (data: ALARM_CENTER_API_REQUEST.countByTimeGapAndAllDisposalStatus) => {
    return Request<ALARM_CENTER_API_RESPONSE.countByTimeGapAndAllDisposalStatusTs, false>({
        url: '/api/v1/alarm/statistics/countByTimeGapAndAllDisposalStatus',
        server: 'bmpAlarmCenterServer',
        method: 'post',
        data
    })
}
