export declare namespace Event_CENTER_API_REQUEST {
    interface countOfTodayNewAndStatus {
        startTime: string | number
        endTime: string | number
        envTypeCodeList: string[]
        regionCode: string
    }
}
export declare namespace Event_CENTER_API_RESPONSE {
    interface countOfTodayNewAndStatusTs {
        todayCount: number
        unhandledCount: number
        handlingCount: number
        handledCount: number
    }
}
