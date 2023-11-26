/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-23 11:36:57
 * @Description:
 */

export declare namespace THEME_API_REQUEST {

    interface saveTheme {
        code?: string
        name: string
        title: string
        popPanel: string
        basePanel: string
        mapPanel: string
        layoutPanel: string
        styleInfo: string
    }
    interface listTheme { }
    interface deleteTheme { code: string }

}
export declare namespace THEME_API_RESPONSE {
    interface saveTheme {
        msg: string
        code: number
    }
    interface listTheme {
        code: string
        name: string
        title: string
        popPanel: string
        basePanel: string
        mapPanel: string
        layoutPanel: string
        styleInfo: string
    }
}
