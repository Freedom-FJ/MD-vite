import request from '../../../service/request'

export interface GetSingleCityRankParams {
    gridCode: string
    factorCode: string
    time: number
    timeType: string
}

export interface DataItemProps {
    groupName: string
    rank: string
    samePeriodRank: string
    change: string
}

export interface ListItemProps extends DataItemProps {
    changeColor: string
    changeDarkImage: any
    changeWhiteImage: any
}

export const getSingleCityRank = (params: GetSingleCityRankParams) => {
    return request<DataItemProps[]>({
        url: '/aims-server/api/v1/area-map/single-city-rank',
        method: 'get',
        params,
    })
}
