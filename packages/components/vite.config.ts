/*
 * @Author: mjh
 * @Date: 2023-07-11 12:20:05
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-24 14:16:11
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import packageJsonObj from '../../package.json'
const { devDependencies, dependencies } = packageJsonObj
const externalList = [...Object.keys(devDependencies), ...Object.keys(dependencies)]
const manualChunks = function manualChunks(id: string) {
    // 根据需要配置自定义的 Chunk
    if (id.includes('node_modules'))
        return `vendor/${id.split('node_modules/.pnpm/')[1].split('/')[0]}`
    if (id.includes('wgms') || id.includes('bmp') || id.includes('aims') || id.includes('ipes'))
        return id.split('components/')[1].split('.')[0]
}
export default defineConfig({
    build: {
        target: 'esnext',
        // 压缩 代码打乱混淆 默认‘esbuild’
        minify: false,
        rollupOptions: {
            // 忽略打包vue文件
            // external: ['vue', 'axios', 'element-plus', 'element-plus-expand', 'dayjs', 'lodash-es', 'element-plus-icons'],
            external: (id: string) => {
                if (id.includes('rollup')) return false
                const newId = id.replace('.vue', '').replace('?vue', '').replace('vue&', '')
                let external = false
                if (newId.includes('utils/echarts'))
                    external = false
                else
                    external = externalList.some(item => newId.includes(item)) && !newId.includes('data-visual')
                return external
            },
            input: ['index.ts'],
            output: [
                {
                    // 打包格式
                    format: 'es',
                    // 打包后文件名
                    entryFileNames: '[name].mjs',
                    chunkFileNames: '[name].mjs',
                    assetFileNames: '[name].[ext]',
                    // 让打包目录和我们目录对应
                    preserveModules: true,
                    exports: 'named',
                    // 配置打包根目录
                    dir: './dist/es',
                    // manualChunks
                },
                {
                    // 打包格式
                    format: 'cjs',
                    // 打包后文件名
                    entryFileNames: '[name].js',
                    chunkFileNames: '[name].js',
                    assetFileNames: '[name].[ext]',
                    // 让打包目录和我们目录对应
                    preserveModules: true,
                    exports: 'named',
                    // 配置打包根目录
                    dir: './dist/lib',
                    // manualChunks
                }
            ]
        },
        lib: {
            entry: './index.ts',
            name: '@ued_fpi/data-visual'
        }
    },
    plugins: [
        {
            name: 'remove-scoped-css',
            transform(code, id) {
                if (id.endsWith('.vue'))
                    code = code.replace('scoped', '') // 移除 scoped 标签
                return { code }
            },
        },
        vue(),
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
            dts: './auto-import.d.ts'
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
    ]
})
