/*
 * @Author: mjh
 * @Date: 2022-09-06 09:21:32
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-05 10:03:51
 * @Description:
 */
import type { RouteRecordRaw } from 'vue-router'
function getModules() {
    const components = import.meta.glob('../views/**/*.vue')
    return components
}
// 自动注册路由
export const vueRouters = function (): Array<RouteRecordRaw> {
    const routerList: Array<RouteRecordRaw> = []
    const modules = getModules()
    Object.keys(modules).filter(item => !item.includes('components')).forEach((key) => {
        const path = key.replace(/(\...views\/|\.vue)/g, '')
        let [name] = path.match(/[^/]+$/) || []
        if (name === 'index') {
            const pathArr = path.split('/')
            name = pathArr[pathArr.findIndex(item => item === 'index') - 1]
        }
        routerList.push({
            path: `/${path}`,
            name,
            component: modules[key]
        })
    })
    return routerList
}
