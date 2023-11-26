import request from '../../../service/request'

export interface GetWeatherForecasListParams {
    startTime: number
    endTime: number
    modeId: number
    gridCode: string
}

export interface ListItemProps {
    id?: null
    name?: null
    modeId?: null
    code?: null
    height?: null
    publishTime?: null
    forecastTime?: Date
    forecastType?: null
    humidity?: null
    pbl?: null
    pressure?: null
    prcp?: number
    maxTemp?: number
    minTemp?: number
    temperature?: null
    dewPoint?: null
    visibility?: null
    aec?: null
    swDown?: null
    uwind?: null
    vwind?: null
    windDirection?: number
    windSpeed?: null
}

export const getWeatherForecasList = (params: GetWeatherForecasListParams) => {
    return request<ListItemProps[]>({
        url: '/aims-cps-server/api/v1/nfs-wrf-data/day-grid-weather-forecast',
        method: 'get',
        params,
    })
}
