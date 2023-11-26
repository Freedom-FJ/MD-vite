import Request from '../../../service/request'

// 藻类监测预警
export const queryEventDataByTimePoint = (data: any) => {
    return Request({
        url: '/api/v1/event/statistic/queryEventDataByTimePoint',
        server: 'bmpEventCenterServer',
        method: 'post',
        data
    })
}
