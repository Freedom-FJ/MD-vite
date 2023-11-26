/*
 * @Author: mjh
 * @Date: 2023-07-04 12:16:20
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-25 11:25:37
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const isProduction = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
    base: isProduction ? '/data-visual-demo/' : '/',
    resolve: {
        dedupe: ['vue']
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue'],
            dts: 'auto-imports.d.ts',
        }),
        Components({
            dirs: [],
            resolvers: [ElementPlusResolver()],
        }),
        federation({
            name: 'data-visual-host',
            remotes: {
                'data-visual': isProduction ? 'http://ued.fpi-inc.site/data-visual/assets/remoteEntry.js' : 'http://127.0.0.1:5000/data-visual/assets/remoteEntry.js',
                // 'data-visual': 'http://ued.fpi-inc.site/data-visual/assets/remoteEntry.js',
                // 'data-visual': 'http://127.0.0.1:5000/data-visual/assets/remoteEntry.js',
            },
            shared: ['vue', 'dayjs', 'echarts', 'fpi-tg-factor-tools', 'lodash-es', 'axios']
        }),
    ],
    build: {
        target: 'esnext',
        minify: false,
        // cssCodeSplit: true,
        // rollupOptions: {
        //     external: ['vue'],
        //     output: {
        //         globals: {
        //             vue: 'Vue',
        //         },
        //         format: 'esm',
        //         entryFileNames: 'assets/[name].js',
        //         minifyInternalExports: false,
        //     },
        // },
    },
    server: {
        port: 3077,
        open: true,
        host: true,
        proxy: {
            '/api-wgms': {
                target: 'http://wgms.dev.fpi-inc.site',
                rewrite: path => path.replace(/^\/api-wgms/, ''),
                changeOrigin: true
            },
            '/api-aims': {
                target: 'http://aims-test.fpi-inc.site',
                rewrite: path => path.replace(/^\/api-aims/, ''),
                changeOrigin: true
            },
            '/api-bmp': {
                target: 'http://hangzhou-test.fpi-inc.site',
                rewrite: path => path.replace(/^\/api-bmp/, ''),
                changeOrigin: true
            },
            '/api-ipes': {
                target: 'http://ipes-dev2.fpi-inc.site',
                rewrite: path => path.replace(/^\/api-ipes/, ''),
                changeOrigin: true
            },
        }
    },
})
