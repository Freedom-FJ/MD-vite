/*
 * @Author: mjh
 * @Date: 2023-09-05 11:19:39
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-25 14:26:23
 * @Description:
 */
export interface PanelOption {
    midDistance: number
    top: number
    left?: number
    right?: number
    id: number
    panelLine: {
        type: 'column' | 'row'
        id: number
        panelList: {
            id: number
            title: string
            height: number
            width?: number
            type: ComType
            component: string
        }[]
    }[]
}

export type ComType = 'wgms' | 'aims' | 'ipes' | 'bmp'

export interface ThemeDic {
    title: string
    code?: string
    name: string
    popPanel: {
        img: string
        isBlur: boolean
    }
    basePanel: {
        img: string
        isBlur: boolean
    }
    mapPanel: {
        img: string
        isBlur: boolean
    }
    layoutPanel: {
        img: string
        mapImg: string
        isBlur: boolean
    }
    styleInfo?: {
        color: any
        fontSize: any
    }
    backColor?: string
}
