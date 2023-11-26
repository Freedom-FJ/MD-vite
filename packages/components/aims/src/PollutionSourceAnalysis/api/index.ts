import request from '../../../service/request'

interface GetSourceAnalysisParams {

}

interface SiteTypeData {
    code: string
    name: string
    rate: string | number
}

export const getSourceAnalysis = (params: GetSourceAnalysisParams) => {
    return request<any>({
        url: '',
        method: 'get',
        params,
    })
}

export type { GetSourceAnalysisParams, SiteTypeData }
