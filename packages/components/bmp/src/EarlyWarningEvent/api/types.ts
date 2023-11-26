export declare namespace ALARM_CENTER_API_REQUEST {
    interface countByTimeGapAndAllDisposalStatus {
        startTime: string | number
        endTime: string | number
        envTypeCodeList: string[]
        regionCodeList: string[]
    }
}
export declare namespace ALARM_CENTER_API_RESPONSE {
    interface countByTimeGapAndAllDisposalStatusTs {
        undone: string | number
        doing: string | number
        done: string | number
        total: string | number
    }
}
