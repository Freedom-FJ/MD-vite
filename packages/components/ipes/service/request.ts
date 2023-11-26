/*
 * @Author: Tian
 * @Date: 2021-11-01 10:31:19
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-18 18:27:06
 * @Description:
 */
import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
// import { messageBox } from '../utils/tools'
import Config from '../config'
import BaseList from './base-serve'
import type { ApiObjTs, ApiReturnTs } from './types'
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, message: string) => {
    // 状态码判断
    switch (status) {
    // 400,401: 未登录状态，跳转登录页
    case 400:
    case 401:
        console.log(message)
        // messageBox(`${message} 即将跳转登录页...`)
        break
        // 403 token过期 清除token并跳转登录页
    case 403:
        console.log(message)
        // messageBox('登录过期，请重新登录即将跳转登录页...')
        break
        // 服务器拥堵 Bad Gateway
    case 502:
        console.log(message)
        // messageBox('网络拥堵，即将跳转登录页...')
        break
        // 404请求不存在
    case 404:
        console.log(message)
        // messageBox('请求的资源不存在', 'error')
        break
    default:
        break
    }
}

/* 实例化请求配置 */
const instance: AxiosInstance = axios.create({
    baseURL: Config.domain,
    // 请求时长
    timeout: 60 * 1000,
    validateStatus() {
        // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
        return true
    },
    transformResponse: [
        (data) => {
            if (
                typeof data === 'string'
                && (data.startsWith('{') || data.startsWith('['))
            )
                data = JSON.parse(data)

            return data
        }
    ]
})

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        config
            && config.headers
            && (config.headers['Cache-Control'] = 'no-cache, no-store') // 清除缓存
        config && config.headers && (config.headers.Pragma = 'no-cache') // 清除缓存
        // 前端不操作token
        // config.headers.token = getToken()
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    (response: AxiosResponse<any>) => {
        // 对后端返回的code做一些出错处理...
        const { code, success, message } = response.data
        errorHandle(code || response.status, message)
        if ([200, '200'].includes(code) || success)
            return response.data

        else if (code)
            return Promise.reject(response.data)

        else
            return Promise.resolve(response.data)
    },
    // 请求失败
    (error) => {
        if (axios.isCancel(error)) {
            // 接口请求拦截取消
            console.warn(error.message)
        }
        const { response } = error
        if (response) {
            // 请求已发出，但是状态不在2xx的范围
            errorHandle(response.status, response.data.message)
            return Promise.reject(response)
        }
    }
)

const request = instance.request
const requestControl = <T, R = false>(option: ApiObjTs) => {
    option.baseURL = Config.domain
    if (!option.url?.includes('http')) option.url = (option.server ? BaseList[option.server] : '') + option.url
    return request<any, ApiReturnTs<T, R>>(option)
}
export default requestControl
