/*
 * @Author: mjh
 * @Date: 2022-10-21 19:27:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-22 16:51:09
 * @Description:
 */
import type { ApiObjTs } from '../../../../../play/src/service/types'
import Request from '../../../../../play/src/service/request'
import type { THEME_API_REQUEST, THEME_API_RESPONSE } from './types'
export const saveTheme = (data: THEME_API_REQUEST.saveTheme, option: ApiObjTs = {}) => {
    return Request<THEME_API_RESPONSE.saveTheme, true>({
        url: '/api/v1/schema-config/save',
        server: 'dataVisualServer',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data,
        ...option
    })
}

export const listTheme = () => {
    return Request<THEME_API_RESPONSE.listTheme[]>({
        url: '/api/v1/schema-config/list',
        server: 'dataVisualServer',
    })
}
export const deleteTheme = (params: THEME_API_REQUEST.deleteTheme) => {
    return Request<THEME_API_RESPONSE.saveTheme, true>({
        url: '/api/v1/schema-config/delete',
        server: 'dataVisualServer',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        params,
    })
}

