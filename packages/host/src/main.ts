/*
 * @Author: mjh
 * @Date: 2023-07-04 19:44:07
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-03 16:55:03
 * @Description:
 */
import setDomain from 'data-visual/setDomain'
import Cookies from 'js-cookie'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import DvTheme from 'data-visual/theme'
import router from './router'
import Layout from './App.vue'
import 'element-plus/dist/index.css'

const app = createApp(Layout)
Cookies.set('token', '123456')
setDomain('/api-wgms', 'wgms')
setDomain('/api-ipes', 'ipes')
setDomain('/api-bmp', 'bmp')
setDomain('/api-aims', 'aims')

// const ContentCom = defineAsyncComponent(() => import('vite-side/Content'))
// app.component('ContentCom', ContentCom)
app.use(router)
app.use(DvTheme)
app.use(ElementPlus, { locale })
app.mount('#root')
