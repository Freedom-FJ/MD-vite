/*
 * @Author: mjh
 * @Date: 2023-07-05 10:15:33
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-11 13:40:54
 * @Description:
 */
import type { App, Plugin } from 'vue'
import { ref } from 'vue'
import wgmsConfig from './wgms/config'
import IpesConfig from './ipes/config'
import AimsConfig from './aims/config'
import BmpConfig from './bmp/config'

/*
 * @Author: mjh
 * @Date: 2023-07-12 09:59:04
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-08 09:32:45
 * @Description:
 */
type SFCWithInstall<T> = T & Plugin
export const install = <T>(comp: T) => {
    (comp as SFCWithInstall<T>).install = (app: App) => {
    // 当组件是 script setup 的形式时，会自动以为文件名注册，会挂载到组件的__name 属性上
    // 所以要加上这个条件
        const name = (comp as any).name || (comp as any).__name
        // 注册组件
        app.component(name, comp as SFCWithInstall<T>)
    }
    return comp as SFCWithInstall<T>
}

/**
 * @name: 自定义本地代理
 * @desc:
 * @param {string} domain 代理名称
 * @param {*} type 代理类型
 * @return {*}
 */
export const setDomain = (domain: string, type?: 'wgms' | 'aims' | 'ipes' | 'bmp') => {
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
/**
 * echarts样式
 */
export const useThemeValue = (styleVariables: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(styleVariables)
}

/**
 * @name: 判断当前主题hook
 * @desc:
 * @return {*}
 */
export const useThemeHook = () => {
    const htmlDom = document.querySelector('html')
    if (!htmlDom) return { isDark: ref(false) }
    const isDark = ref(!!htmlDom.classList.contains('dark'))

    // 创建 MutationObserver 实例
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const currentClass = (mutation.target as any).className
                isDark.value = currentClass.includes('dark')
            }
        }
    })

    // 配置 MutationObserver 监听的选项
    const observerOptions = {
        attributes: true,
        attributeFilter: ['class'],
    }

    // 开始监听目标节点
    observer.observe(htmlDom, observerOptions)

    return {
        isDark
    }
}

export function replaceVarStrings(obj: Record<string, any>) {
    const newObj: Record<string, any> = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            newObj[key] = replaceVarStrings(obj[key]) // 递归处理子对象
        }
        else if (typeof obj[key] === 'string' && obj[key].startsWith('var(') && obj[key].endsWith(')')) {
            const varContent = obj[key].slice(4, -1) // 提取括号内的内容
            newObj[key] = useThemeValue(varContent) // 替换为括号内的内容
        }
        else {
            newObj[key] = obj[key] // 其他情况直接复制值
        }
    }

    return newObj
}
