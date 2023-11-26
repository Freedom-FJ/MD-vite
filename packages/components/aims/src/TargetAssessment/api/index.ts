import request from '../../../service/request'

interface GetScreenCityListParams {
    year: number
    gridLevel: string
    gridCode: string
    itemCode: string // 通过接口 /target-server/api/v1/target/item-inquire-by-code?code=annuallyTarget 获取itemCode
    targetTypeCode: string // 通过接口 target-server/api/v1/target-type-api/select-by-code-or-name 获取动态目标
}

interface GetScreenCityListItem {
    id: number
    targetCode: string
    targetTypeCode: string
    gridCode: string
    assessmentTime: number
    startTime: string
    endTime: string
    isTimeDecomposition: number
    isLevelDecomposition: number
    targetStatus: number
    status: null
    isDelete: null
    createTime: null
    updateTime: null
    gridName: string
    targetTypeName: string
    cityCode: null
    gridLevel: string
    targetTypeOrder: number
    itemList: null
    realValue: number
    targetValue: number
    unit: string
    targetStatusName: string
}
interface GetScreenCityListRes {
    compliance: number
    notCompliance: number
    cityTargetVos: GetScreenCityListItem[]
}

export const getScreenCityList = (
    params: GetScreenCityListParams
) => {
    return request<GetScreenCityListRes>({
        url: '/target-server/api/v1/city-target/screen-city-list',
        method: 'get',
        params,
    })
}

export type { GetScreenCityListParams, GetScreenCityListRes, GetScreenCityListItem }
