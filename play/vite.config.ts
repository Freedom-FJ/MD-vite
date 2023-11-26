import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import packageJsonObj from './package.json'
const name = packageJsonObj.name
const isProduction = process.env.NODE_ENV === 'production'

// const ONLINENAME = 'http://115.236.6.69:31085'
// const ONLINENAME = 'http://nbstzz.ycsthjzhpt.com'

// const ONLINENAME = 'http://115.236.6.69:31085' // 余杭环境

// const ONLINENAME = 'http://115.236.6.69:31085'

// const ONLINENAMETEST = 'https://wgms-test.fpi-inc.site'
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/ // .md
            ],
            resolvers: [
                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon'
                })
            ],
            imports: ['vue-router', 'vue'],
            eslintrc: {
                enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
                filepath: './.eslintrc-auto-import.json', // 生成json文件
                globalsPropValue: true
            },
            // 声明文件生成位置和文件名称
            dts: './src/auto-import.d.ts'
        }),
        Components({
            // dirs: ['src/components/', 'src/layouts/', 'src/views/**/components/'],
            resolvers: [
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep']
                }),
                ElementPlusResolver()
            ]
        }),
        Icons({
            autoInstall: true
        }),
    ],
    base: isProduction ? `/${name}/` : '/',
    build: {
        // 生成静态资源的存放路径
        assetsDir: 'static/img/',
        // 构建后是否生成 source map 文件
        sourcemap: !isProduction,
        // chunk 大小警告的限制
        chunkSizeWarningLimit: 1500,
        // 生产环境移除 console debugger
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: isProduction,
                drop_debugger: isProduction
            }
        },
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                // 解决打包时Some chunks are larger警告
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id
                            .toString()
                            .split('node_modules/')[1]
                            .split('/')[0]
                            .toString()
                    }
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': '/src/',
            '@components': '/src/components/',
            '@assets': '/src/assets/',
            '@utils': '/src/utils/',
            '@config': '/src/config/',
            '@styles': '/src/styles/',
            '@types': '/src/types/',
            '@static': '/public/static'
        }
    },
    server: {
        port: 3077,
        open: true,
        proxy: {
            '/api-wgms': {
                target: 'http://wgms.dev.fpi-inc.site',
                // target: 'http://10.191.21.44:8086',
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
                // target: 'https://ningdong.fpi-inc.site/',
                // target: 'http://47.104.111.5:8808/', // 西中岛
                target: 'http://ipes-dev2.fpi-inc.site',
                rewrite: path => path.replace(/^\/api-ipes/, ''),
                changeOrigin: true
            },
        }
    },
    css: {
        // 处理打包出现警告 "@charset" must be the first
        postcss: {
            plugins: [
                {
                    postcssPlugin: 'internal:charset-removal',
                    AtRule: {
                        charset: (atRule) => {
                            if (atRule.name === 'charset')
                                atRule.remove()
                        }
                    }
                }
            ]
        },
    }
})
