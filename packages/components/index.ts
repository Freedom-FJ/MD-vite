/*
 * @Author: mjh
 * @Date: 2023-07-11 12:12:47
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-13 14:53:00
 * @Description:
 */
import type { App } from 'vue'
import aims from './aims'
import ipes from './ipes'
import wgms from './wgms'
import bmp from './bmp'

export { setDomain } from './utils'
export * from './aims'
export * from './ipes'
export * from './wgms'
export * from './bmp'

export default {
    install: (app: App) => {
        aims.install(app)
        wgms.install(app)
        ipes.install(app)
        bmp.install(app)
    }
}
