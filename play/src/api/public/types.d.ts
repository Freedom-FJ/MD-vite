/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: mjh
 * @LastEditTime: 2022-10-23 09:21:43
 * @Description: 
 */

declare namespace PUBLIC_API_REQUEST {
    type singleStation = {
        beginTime: number,
        endTime: number,
        siteId: number,
        queryTimeType: string,
        factorGroupId: number
    }
    type queryFactorGroupByCode = {
        code: string,
    }
    type jointListList = (string | number)[]
    type realTimeViewLoad = {
        stationCodes: number,
        regionCodes: string,
        watershedCodes: string,
        factorGroupCode: string,
        online: number,
        runState: number,
        controlLevel: string,
        limit: number,
        offset: number
    }
    type jointList = { 
        pageNum: number, // 当前页
        pageSize: number, // 页限制条数
        jointNumber: string, // 联单搜索
        beginTime: string, // 开始时间
        endTime: string // 结束时间
    }
    type getSystemMenus = { systemCode: 'wgmsAnalysisDiagnose' }
}
declare namespace PUBLIC_API_RESPONSE {
    type getSystemMenus = {
        entries: systemMenusTs[]
    }
    type queryFactorGroupByCode = {
        factors: {
            unitName: string
            factorIndexCode: string
            factorIndexName: string
    }[] }[]
}


interface systemMenusTs {
    childType: null
    childTypeCode: null
    childTypeName: null
    code: string
    hidden: false
    id: string
    key: string
    label: string
    leaf: null
    lvl: null
    name: null
    operableSign: number
    operableTypes: []
    parentId: string
    pos: number
    positionCode: string
    readableSign: number
    selectedPictureId: string
    subs: []
    type: number
    typeName: string
    unselectedPictureId: string
    url: string
}