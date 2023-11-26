/*
 * @Author: mjh
 * @Date: 2023-07-10 17:24:03
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-10 17:27:28
 * @Description:
 */
import wgmsConfig from '@data-visual/wgms/config'
import IpesConfig from '@data-visual/ipes/config'
import AimsConfig from '@data-visual/aims/config'
import BmpConfig from '@data-visual/bmp/config'
/**
 * @name: 自定义本地代理
 * @desc:
 * @param {string} domain 代理名称
 * @param {*} type 代理类型
 * @return {*}
 */
const setDomain = (domain: string, type: 'wgms' | 'bmp' | 'ipes' | 'aims') => {
    switch (type) {
    case 'aims':
        AimsConfig.domain = domain
        break
    case 'ipes':
        IpesConfig.domain = domain
        break
    case 'bmp':
        BmpConfig.domain = domain
        break
    case 'wgms':
        wgmsConfig.domain = domain
        break
    default:
        wgmsConfig.domain = domain
        IpesConfig.domain = domain
        AimsConfig.domain = domain
        BmpConfig.domain = domain
        break
    }
}

export default setDomain
