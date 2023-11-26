/*
 * @Author: Tian
 * @Date: 2021-11-01 09:57:44
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-07 17:45:42
 * @Description:
 */
import { name } from '../../package.json'

import type { ServerKey } from '../service/types'

export interface ConfigTs {
    defaultServer: ServerKey
    domain: string
    bspURL: string
    realHost: string
    isMustLogin: boolean
    gridCode: string
    cityCode: string
    defaultRouteName: string
    loginUrl: string
    webHomePage: string
    logoutUrl: string
    userBaseURL: string
    innerNet: boolean
    systemCode: string
}

const innerNet = import.meta.env.DEV
const domain = innerNet ? '/api' : `${location.protocol}//${location.host}`
const defaultHost = 'http://115.236.6.69:31085'
// const defaultHost = 'http://wgms.dev.fpi-inc.site'
// const defaultHost = 'https://wgms-test.fpi-inc.site'
const realHost = innerNet ? defaultHost : domain

const commonConfig: Omit<ConfigTs, 'domain' | 'bspURL' | 'realHost'> = {
    systemCode: 'wgmsAnalysisDiagnose',
    isMustLogin: true, // 跳转登陆
    gridCode: '01000000',
    defaultServer: 'wgmsService', // 请求默认服务
    cityCode: '330100',
    defaultRouteName: '/ipes/index', // 默认跳转路由
    loginUrl: `${innerNet ? defaultHost : domain}/cas/login`,
    webHomePage: innerNet ? `127.0.0.1:${location.port}` : `${domain}/${name}`,
    logoutUrl: `${innerNet ? defaultHost : domain}/cas/logout`,
    userBaseURL: `${defaultHost}/simple-user-center-server`,
    innerNet
}
const { webHomePage, loginUrl, userBaseURL } = commonConfig
const webHomePageStr = encodeURIComponent(webHomePage)
// 未登录，跳转到cas登录地址
const bspURL = `${loginUrl}?service=${userBaseURL}/userCenter/auth/authUser?redirectUrl=${webHomePageStr}`

export default {
    ...commonConfig,
    domain,
    bspURL,
    realHost
} as ConfigTs

