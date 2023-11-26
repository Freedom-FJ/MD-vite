/*
 * @Author: mjh
 * @Date: 2023-07-09 00:06:51
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-14 10:33:34
 * @Description:
 */
import { readFileSync } from 'fs'
import { resolve } from 'path'

// SVG 构建器
export function svgBuilder() {
    return {
        name: 'svg-builder',
        transform(code, id) {
            if (id.endsWith('.svg')) {
                const filePath = resolve(id)
                const fileContent = readFileSync(filePath, 'utf-8')

                // 将 SVG 文件转换成 Base64 编码
                const base64 = Buffer.from(fileContent).toString('base64')

                const codeSnippet = `export default "data:image/svg+xml;base64,${base64}"`
                return {
                    code: codeSnippet,
                    map: null,
                }
            }
        },
    }
}

export function kebabCase(key) {
    const result = key.replace(/([A-Z])/g, ' $1').trim()
    return result.split(' ').join('-').toLowerCase()
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
