/*
 * @Author: mjh
 * @Date: 2023-09-23 13:13:54
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-24 11:46:34
 * @Description:
 */
import { useThemeValue } from '../../../components/utils'
export const exportCSSFile = (varObj: Record<string, string> | Record<string, Record<string, string>>, name?: string) => {
    // 调用示例
    let cssString = 'html {'
    Object.keys(varObj).forEach((key) => {
        const currData = varObj[key]
        if (typeof currData === 'string') {
            cssString += `
    ${key}: ${useThemeValue(key)};`
            cssString += `
}`
            return
        }
        cssString += `
    /* ${key} */`
        Object.keys((varObj)[key]).forEach((subKey) => {
            cssString += `
    ${subKey}: ${useThemeValue(subKey)};`
        })
    })
    cssString += `

    /* font-family */
    --dv-font-family-number: Oswald;
}`
    if (!name) return cssString
    exportOutCSSFile(cssString, name)
}

export function exportOutCSSFile(cssString: string, fileName: string) {
    // 创建 Blob 对象
    const blob = new Blob([cssString], { type: 'text/css' })

    // 创建 URL 对象
    const url = URL.createObjectURL(blob)

    // 创建 <a> 标签
    const link = document.createElement('a')
    link.href = url
    link.download = fileName

    // 创建并触发点击事件
    const event = document.createEvent('MouseEvents')
    event.initEvent('click')
    link.dispatchEvent(event)

    // 释放资源
    URL.revokeObjectURL(url)
}

export const inputCss = (str: string) => {
    const regex = /--dv[^:]*:\s*([^;]+)/g
    const matches = str.match(regex)
    const fontSize: Record<string, string> = {}
    const color: Record<string, Record<string, string>> = {}
    const colorNameDic = ['box-shadow', 'background', 'border', 'danger', 'fill', 'index', 'info', 'primary', 'success', 'text', 'warning', 'text-shadow']
    if (matches) {
        matches.forEach((match) => {
            const [key, value] = match.split(':').map(str => str.trim())
            if (key === 'family') return
            if (key.includes('text') && !key.includes('text-shadow') && !key.includes('color-text')) { fontSize[key] = value }
            else {
                const currKey = colorNameDic.find(item => item === 'primary' ? key.includes(item) && !key.includes('text-primary') : key.includes(item))
                if (!currKey) return
                if (!color[currKey])color[currKey] = {}
                color[currKey][key] = value
            }
        })
    }
    return { fontSize, color }
}
