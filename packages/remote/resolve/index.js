/*
 * @Author: mjh
 * @Date: 2023-04-24 13:41:22
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-24 14:36:29
 * @Description:
 */
import { camelCase, kebabCase } from '../utils'
// 获取到副作用
function getSideEffects(partialName, isSSR, MdName) {
    // 判断是不是服务端渲染
    // 服务端渲染使用 cjs 模块，反之使用 esm 模块
    const moduleType = isSSR ? 'lib' : 'es'
    // 是否加载
    if (isSSR) return
    return [`${MdName}/${moduleType}/src/${partialName}/style/index`]
}

export function dataVisualResolver(option = {}) {
    const { MdName } = option
    return {
        type: 'component', // 组件类型
        resolve: (name) => {
            const isSSR = !!option.isSSR // Boolean(process.env.SSR || process.env.SSG || process.env.VITE_SSR || process.env.VITE_SSG)
            // 服务端渲染使用 cjs 模块，反之使用 esm 模块
            // const moduleType = isSSR ? 'lib' : 'es'
            const partialName = kebabCase(name)
            const CaseName = camelCase(name)
            const nameDic = ['dv-wgms', 'dv-aims', 'dv-ipes', 'dv-bmp']
            // 判断解析的组件名称是不是当前组件库的
            if (nameDic.some(item => partialName.startsWith(item))) {
                const startIndex = nameDic.findIndex(type => partialName.includes(type))
                const typeName = nameDic[startIndex].split('-')[1]
                // 获取到组件名称
                return {
                    // 组件名称
                    name: CaseName,
                    // 从哪个路径导入，es/lib
                    from: `${MdName}/${typeName}`,
                }
            }
        },
    }
}
export default dataVisualResolver
