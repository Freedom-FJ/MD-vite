import Request from '../../../service/request'
import type { ALARM_CENTER_API_REQUEST, ALARM_CENTER_API_RESPONSE } from './types'

// 藻类监测预警
export const getAlgaeMonitoringWarning = (data: ALARM_CENTER_API_REQUEST.getAlgaeMonitoringWarning) => {
    return Request<ALARM_CENTER_API_RESPONSE.getAlgaeMonitoringWarningTs, false>({
        url: '/api/v1/alarm/statistics/countByTimeGapAndAllDisposalStatus',
        server: 'bmpAlarmCenterServer',
        method: 'post',
        data
    })
}
