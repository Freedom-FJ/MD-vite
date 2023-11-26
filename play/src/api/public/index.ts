/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-07 17:50:43
 * @Description: 
 */
import type { ApiObjTs } from '../../service/types'
import Request from '../../service/request'
export const getSystemMenus = (data: PUBLIC_API_REQUEST.getSystemMenus, option:ApiObjTs={} ) => {
    return Request<PUBLIC_API_RESPONSE.getSystemMenus>({
        url: '/api/v1.0/permissions/systemMenus',
        server: 'bspPermissionServer',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data,
        ...option
    })
}
// 危废联单列表
export const jointDetail = (params: { jointNumber: string }) => {
    return Request<Record<string, any>>({
        url: '/solid-waste/joint-detail',
        server: 'wgmsService',
        params
    })
}
// 危废联单详情
export const jointList = (params: PUBLIC_API_REQUEST.jointList, option:ApiObjTs={} ) => {
    return Request<any>({
        url: '/solid-waste/joint-list-by-param',
        server: 'wgmsService',
        params,
        ...option
    })
}
// 测试请求
export const getJsonTest = () => {
    return Request<any>({
        url: 'https://gis-dev.fpi-inc.site/interpolation-file-server/api/v1/sys/download/interpolation/118/mlhy/2022/02/12/aqi_2022021210.png',
    })
}
// 左侧树结构接口
export const getTreeData = (params: { code?: string|null}) => {
    return Request<any>({
        url: '/api/v2.0/client/region/queryByCode',
        server: 'wgmsBasicInfoServer',
        params
    })
}
// 左侧树结构接口
export const getCascaderareaData = (params: { code: string}) => {
    return Request<any>({
        url: '/api/v1.0/client/region/queryByCode',
        server: 'wgmsBaseServer',
        // baseURL: '/dev',
        params
    })
}
export const getCascadervalleyData = (params: { codes: string}) => {
    return Request<any>({
        url: '/api/v1.0/client/watershed/queryByCodes',
        server: 'wgmsBaseServer',
        params
    })
}
// table测试接口
export const realTimeViewLoad = (data: PUBLIC_API_REQUEST.realTimeViewLoad, option:ApiObjTs={}) => {
    return Request<any>({
        url: '/api/v1/real-time-view/load',
        server: 'wgmsAllWaterMonitorServer',
        data,
        method: 'post',
        ...option
    })
}

// 动态列表请求doma
export const singleStation = (params: PUBLIC_API_REQUEST.singleStation) => {
    return Request<any>({
        url: '/api/v1.0/report/singleStation',
        server: 'wgmsMonitorDataServer',
        params
    })
}
// 获取全部因子组接口
export const queryFactorGroupByCode = (params: PUBLIC_API_REQUEST.queryFactorGroupByCode) => {
    return Request<PUBLIC_API_RESPONSE.queryFactorGroupByCode , true>({
        url: '/api/v1.0/factor/functionPoint/queryFactorGroupByCode',
        server: 'wgmsBaseServer',
        params
    })
}
// post 数组型请求
export const jointListList = (data: PUBLIC_API_REQUEST.jointListList) => {
    return Request<any>({
        url: '/api/v1.0/factor/functionPoint/queryFactorGroupByCode',
        server: 'wgmsBaseServer',
        method: 'post',
        data
    })
}


