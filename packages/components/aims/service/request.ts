import axios from 'axios'
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios'
import Config from '../config'
import { errorCodeHandler, errorStatusHandler } from '../utils/tools'

/* 实例化请求配置 */
const instance: AxiosInstance = axios.create({
    baseURL: Config.domain,
    timeout: 60 * 1000,
    transformResponse: [
        (data) => {
            if (
                typeof data === 'string'
                && (data.startsWith('{') || data.startsWith('['))
            )
                data = JSON.parse(data)
            return data
        },
    ],
})

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        config
            && config.headers
            && (config.headers['Cache-Control'] = 'no-cache, no-store') // 清除缓存
        config && config.headers && (config.headers.Pragma = 'no-cache') // 清除缓存
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        const { code, message } = response.data
        if ([200, 'success'].includes(code) || !code) {
            return response.data
        }
        else {
            errorCodeHandler(code, message)
            return Promise.reject(response.data)
        }
    },
    (error) => {
        if (axios.isCancel(error))
            console.warn(error.message)

        const { response } = error
        if (response) {
            errorStatusHandler(response.status, response.data.message)
            return Promise.reject(response)
        }
    }
)

/**
 * 暴露请求
 */
export interface ApiObjTs extends AxiosRequestConfig {
    url?: string // 请求地址
    isIntercept?: boolean // 是否推入全局的请求拦截栈
    baseURL?: string // 本地调试时 接口特殊代理
}

export type ApiReturnTs<T, X> = X extends true ? T : {
    code: number
    data: null | T
    message: string
}
const request = instance.request

const requestControl = <T, R = false>(option: ApiObjTs) => {
    // Config.domain会被更新 重置baseURL
    option.baseURL = Config.domain
    return request<any, ApiReturnTs<T, R>>(option)
}
export default requestControl
