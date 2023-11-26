/*
 * @Author: mjh
 * @Date: 2023-07-04 19:44:07
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-22 10:52:37
 * @Description:
 */
import setDomain from 'data-visual/setDomain'
import Cookies from 'js-cookie'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import Layout from './App.vue'
import 'element-plus/dist/index.css'
const pinia = createPinia()

const app = createApp(Layout)
Cookies.set('token', '123456')
setDomain('/api-wgms', 'wgms')
setDomain('/api-ipes', 'ipes')
setDomain('/api-bmp', 'bmp')
setDomain('/api-aims', 'aims')

app.use(pinia)
app.use(ElementPlus, { locale })
app.mount('#root')
