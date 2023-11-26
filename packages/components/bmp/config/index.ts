/*
 * @Author: Tian
 * @Date: 2021-11-01 09:57:44
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-11 20:36:15
 * @Description:
 */
const innerNet = import.meta.env.DEV
// 开发环境使用api, ued环境使用各组的缩写，方便配置nginx转发
const domain = innerNet ? '/api-bmp' : (location.host === 'ued.fpi-inc.site' ? '/api-bmp' : `${location.protocol}//${location.host}`)

export default {
    domain,
    innerNet
}

