/*
 * @Author: mjh
 * @Date: 2022-09-06 09:21:32
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 15:34:25
 * @Description:
 */
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import Config from '../config'
import { vueRouters } from './get-routers'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: Config.defaultRouteName
    },
    ...vueRouters()
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
