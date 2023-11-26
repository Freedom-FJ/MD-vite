/*
 * @Author: mjh
 * @Date: 2023-07-04 19:37:43
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-25 11:25:33
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { svgBuilder } from './utils'
const isProduction = process.env.NODE_ENV === 'production'
// https://vitejs.dev/config/
export default defineConfig({
    base: isProduction ? '/data-visual/' : '/',
    plugins: [
        vue(),
        svgBuilder(),
        AutoImport({
            resolvers: [
                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon'
                })
            ],
            imports: ['vue'],
            eslintrc: {
                enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
                filepath: './.eslintrc-auto-import.json', // 生成json文件
                globalsPropValue: true
            },
            // 声明文件生成位置和文件名称
            dts: './src/auto-import.d.ts'
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep']
                }),
            ]
        }),
        // 模块联邦配置
        federation({
            name: 'vite-side',
            filename: 'remoteEntry.js',
            // 导出模块声明
            // 这几个文件自己手动补充下
            exposes: {
                './wgms': './src/components/wgms.ts',
                './ipes': './src/components/ipes.ts',
                './aims': './src/components/aims.ts',
                './bmp': './src/components/bmp.ts',
                './setDomain': './src/set-domain.ts',
                './theme': './src/theme/index.js',
            },
            // 共享依赖声明
            shared: ['vue', 'dayjs', 'echarts', 'fpi-tg-factor-tools', 'lodash-es', 'axios'],
        }),
    ],
    css: {
        postcss: './postcss.config.js', // 指定 postcss 配置文件路径
    },
    resolve: {
        dedupe: ['vue'], // this line
    },
    // 打包配置
    build: {
        target: 'esnext',
        minify: false,
        assetsInlineLimit: 409600, // 设置图片转换为 Base64 的阈值
    },
})
