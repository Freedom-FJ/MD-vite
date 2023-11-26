/*
 * @Author: mjh
 * @Date: 2023-03-13 16:37:54
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-10 18:29:29
 * @Description:
 */
import type { App } from 'vue'
import * as components from './src/index'
export * from './src/index'

export default {
    install: (app: App) => {
        for (const c in components) {
            const currCom = (components as any)[c]
            if (currCom.__name === 'index') app.component(c, currCom)
            else app.use((components as any)[c])
        }
    }
}
