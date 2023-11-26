/*
 * @Author: mjh
 * @Date: 2023-08-08 09:36:40
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-08 09:38:25
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default (name: string) => {
    return defineConfig({
        resolve: {
            alias: {
                '@': '/src/',
            },
            dedupe: ['vue'], // this line
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
            vue()
        ],
        build: {
            target: 'es2015',
            // 压缩 代码打乱混淆 默认‘esbuild’
            minify: false,
            rollupOptions: {
                input: ['index.ts'],
                output: {
                    // 打包格式
                    format: 'cjs',
                    // 打包后文件名
                    entryFileNames: '[name].js',
                    exports: 'named',
                }
            },
            lib: {
                entry: './index.ts',
                name
            }
        },
    })
}
