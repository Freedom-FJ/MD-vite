/*
 * @Author: mjh
 * @Date: 2023-07-11 18:59:34
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-11 20:36:22
 * @Description:
 */
const innerNet = import.meta.env.DEV
// 开发环境使用api, ued环境使用各组的缩写，方便配置nginx转发
const domain = innerNet ? '/api' : (location.host === 'ued.fpi-inc.site' ? '/api-aims' : `${location.protocol}//${location.host}`)

export default {
    // 请求相关
    domain,
    // 是否 dev环境
    innerNet
}

