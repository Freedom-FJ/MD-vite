/*
 * @Author: mjh
 * @Date: 2022-09-06 15:59:16
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-25 14:25:06
 * @Description:
 */
import { defineStore } from 'pinia'
import type { ThemeDic } from '../types/panel'
export const useThemeStore = defineStore({
    id: 'theme',
    state: () => ({
        currTheme: {
            code: '',
            title: '',
            name: '',
            popPanel: {
                img: '',
                isBlur: true
            },
            basePanel: {
                img: '',
                isBlur: true
            },
            mapPanel: {
                img: '',
                isBlur: true
            },
            layoutPanel: {
                img: '',
                mapImg: '',
                isBlur: true
            },
        } as ThemeDic,
        currStyleVar: null as null | { color: Record<string, Record<string, string>>; fontSize: Record<string, string> }
    }),
    getters: {
        getCurrTheme: state => state.currTheme,
        getCurrStyleVar: state => state.currStyleVar,
    },
    actions: {
        setTheme(theme: any) {
            this.currTheme = theme
        },
        setStyleVar(styleVar: { color: Record<string, Record<string, string>>; fontSize: Record<string, string> }) {
            this.currStyleVar = styleVar
        },

    },
    // persist: {
    //     enabled: true, // 开启存储
    //     // storage:sessionStorage/localStorage,还可以自定义存入对应的如下
    //     // 不写以下也可以 默认是sessionStorage
    //     // strategies: [
    //     //     { storage: cookiesStorage, paths: ['info'] }
    //     //     //{ storage: localStorage, paths: ['info'] }
    //     //     //{ storage: sessionStorage, paths: ['info'] }
    //     // ],
    // }
})
