/*
 * @Author: Tian
 * @Date: 2022-06-24 15:29:09
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 15:34:31
 * @Description:
 */
import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import ipes from '@data-visual/ipes'
// import { DvWgmsAuxiliaryJudgment } from '@ued_fpi/data-visual/bmp'
import { setDomain } from '../../packages/components/index'

// import { setDomain } from '@ued_fpi/data-visual'
// import '@ued_fpi/data-visual/style'
// import '@ued_fpi/data-visual/style/style-aims.css'
import router from './router'
import AppDom from '@/App.vue'
// 注册 (函数指令)
import 'dayjs/locale/zh-cn' // 设置周的周一为一周的开始
// 引入Elmessage的css样式文件  解决element按需引入bug
import 'element-plus/theme-chalk/el-message.css'
export const directive = (app: App<Element>) => {
    app.directive('focus', {
        mounted(el, binding, vnode) {
            // 解决element组件获取到的不是真实input dom
            const input = el.querySelector('.el-input__inner') || el.querySelector('.el-textarea__inner') || el
            binding.value && input.focus()
        }
    })
}

dayjs.locale('zh-cn')
const app = createApp(AppDom)
// .env读取，本地创建.env.local文件，VITE_TOKEN = XXX
Cookies.set('token', import.meta.env.VITE_TOKEN || '123456')
setDomain('/api-wgms', 'wgms')
setDomain('/api-ipes', 'ipes')
setDomain('/api-bmp', 'bmp')
setDomain('/api-aims', 'aims')

// import('@ued_fpi/data-visual/style')

app.config.errorHandler = (err, vm, info) => {
    console.log('[全局异常]：', err, vm, info)
}
for (const [key, component] of Object.entries(ElementPlusIconsVue))
    app.component(key, component)
app.use(router)
app.use(ipes).use(directive)
app.mount('#app')
