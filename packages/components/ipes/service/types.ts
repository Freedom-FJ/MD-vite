/*
 * @Author: mjh
 * @Date: 2022-10-21 23:51:28
 * @LastEditors: mjh
 * @LastEditTime: 2023-06-30 10:08:02
 * @Description:
 */
import type { AxiosRequestConfig } from 'axios'
import type BaseList from './base-serve'

export interface ApiObjTs extends AxiosRequestConfig {
    url?: string // 请求地址
    server?: ServerKey // 请求服务
    isIntercept?: boolean // 是否推入全局的请求拦截栈
    baseURL?: string // 本地调试时 接口特殊代理
}

export type ServerKey = keyof Omit<typeof BaseList, 'prototype'>

export type ApiReturnTs<T, X> = X extends true ? T : {
    code: number
    data: null | T
    message: string
}
