/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-19 09:17:26
 * @Description:
 */

export declare namespace ALARM_CENTER_API_REQUEST {
    interface getAlgaeMonitoringWarning {
        startTime: string | number
        endTime: string | number
        envTypeCodeList: { name: string }[]
        siteCodeList: { name: string }[]
        alarmTypeCodeList: any
    }
}

export declare namespace ALARM_CENTER_API_RESPONSE {
    interface getAlgaeMonitoringWarningTs {
        doing: string | number
        done: string | number
        total: string | number
        undone: string | number
    }
}
