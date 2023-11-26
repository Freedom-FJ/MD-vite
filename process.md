# 前言
`联邦模块是什么`  
> 1.是Webpack 5 的新特性之一，允许在多个 webpack 编译产物之间共享模块、依赖、页面甚至应用  
> 2.提供了一种轻量级的、在运行时，通过全局变量组合，在不同模块之前进行数据的获取  
> 3.提供了一种解决应用集的官方方案。 每个构建都充当一个容器，也可将其他构建作为容器。通过这种方式，每个构建都能够通过从对应容器中加载模块来访问其他容器暴露出来的模块。

那引来了一个重大问题，模块联邦是webpack的，那是不是vite是不是就没有办法实现了？  
当然不是，模块联邦的实现逻辑是干预打包，是按照一定规则将一些功能打包成同一个js文件，使其可以单独被引入使用🧪，并且可以支持依赖的共享提高效率，vite 社区就提高了此模块联邦的解决方。[@originjs/vite-plugin-federation](https://github.com/originjs/vite-plugin-federation)   
本文就是围绕此社区方案讲解如何实现一个模块联邦的组件库工程，不过在此之前请自行浏览上面链接对此插件有一个初步的了解。

# 技术栈
> vue3 ts vite monorepo

# 版本
注意`@originjs/vite-plugin-federation`版本锁死
> "@originjs/vite-plugin-federation": "1.2.3",  
> "vue": "^3.2.36",  
> "typescript": "^4.9.5",  
> "vite": "^4.3.5",

因为新版本在`host`端打包后会出现代码混淆的情况，这就会导致`host`打出的共享依赖变量都被代码混淆，那我们线上的服务端组件获取到依赖后调用方法都会是`undefined`的情况,所以当前稳定的使用正常的版本暂时是 `1.2.3`，后期关注版本更新，在合适的版本进行升级即可。

# 核心思想图：
`工程架构`:
![prj.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8aa6a45e26b487382e13729fe95f3e8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1311&h=911&s=134119&e=png&a=1&b=fefefe)

`使用`:
![1234.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c32c07f1d2474c848947cdebc011eb27~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1091&h=951&s=116112&e=png&a=1&b=fefefe)

好了接下来我们正式开始：
# 1. monorepo工程目录结构：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9207313f598849d2816d244adab4a293~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=596&h=1452&s=119541&e=png&b=181818)

```
├─ packages
│  ├─ components                   // 组件库
│  │  ├─ amis                      // 模块1
│  │  │  ├─ src                    // src
│  │  │  │  ├─ AirQualityCalendar  // 样例组件1
│  │  │  │  │  ├─ ...              // 其他文件如img，style等
│  │  │  │  │  ├─ index.vue        // vue 组件
│  │  │  │  │  ├─ index.ts         // 组件暴露文件
│  │  │  │  │  ├─ readme.md        // 组件文档
│  │  │  │  ├─ ...                 // 其他组件
│  │  │  │  ├─ index.ts            // 组件汇总
│  │  │  ├─ index.ts               // 入口文件
│  │  │  ├─ package.json           // package.json
│  │  │  ├─ vite.config.ts         // vite.config.ts
│  │  ├─ bmp                       // 模块2
│  │  ├─ ipes                      // 模块3
│  │  ├─ wgms                      // 模块4
│  ├─ host                         // host端
│  ├─ remote                       // remote端
├─ play                            // 测试工程
```
`remote`: 代表远端服务端，我们会以此工程打包我们`packages/components/`下的模块，并部署到线上的一个服务，为所有工程提供模块联邦服务。  
`host`： 是我们模块联邦使用的测试端，就是此工程会引入我们本地或者线上启动的模块联邦服务进行测试，有没有什么问题。  
`components`: 是存放我们书写的组件的文件夹。
我们将不同分类的组件区分到不同的模块当中去，也就是现在是4个模块，那我们接下来就在 `packages/components/`下的各自模块内书写相应的组件，在play端通过workspace软连接引入，并测试好组件之后，就可以书写我们的remote端远端模块服务打包策略了。  
相关的工程版本管理可以查阅相关的lerna管理工具的使用，这边就不过多赘述。
# 2. components 组件的暴露
我们简单书写一个TestButton测试组件,在`packages/components/aims/src/TestButton`目录下,也就是在后面的模块 `aims` 内的组件，组件内部的目录结构大致如此：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd233262bf1c410d92f1e6d608537485~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=334&h=222&s=15330&e=png&b=181818)  
TestButton/index.vue
```vue
<template>
    <div>
        <ElIcon>
            <ArrowLeft />
        </ElIcon>
        <img src="./images/left-arrow-double.png" alt="">
    </div>
</template>

<script lang="ts" setup>
import { ArrowLeft } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
```
接下来我们要在其目录下的index.ts文件引入此组件并暴露出去：
TestButton/index.ts
```ts
import { install } from '../../../utils'
import _AirQualityCalendar from './index.vue'

export const DvAimsAirQualityCalendar = install(_AirQualityCalendar)
export default _AirQualityCalendar
```
utils.ts
```ts
import type { App, Plugin } from 'vue'

type SFCWithInstall<T> = T & Plugin
export const install = <T>(comp: T) => {
    (comp as SFCWithInstall<T>).install = (app: App) => {
        // 当组件是 script setup 的形式时，会自动以为文件名注册，会挂载到组件的__name 属性上
        // 所以要加上这个条件
        const name = (comp as any).name || (comp as any).__name
        // 注册组件
        app.component(name, comp as SFCWithInstall<T>)
    }
    return comp as SFCWithInstall<T>
}
```
在此我们书写好了一个简单的组件并暴露了出去，这样我们需在我们的`aims` 包的主index文件内进行批量暴露出去就可以了：  
packages/components/aims/src/index.ts
```ts
export * from './TestButton'
export * from './TestButton2'
export * from './TestButton3'
...
```
packages/components/aims/index.ts
```ts
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
```
自此我们以及实现了一个简单的chunk包的组件书写，当然我们在书写组件的时候需要在我们的测试端进行组件的测试，确定组件没有bug哦😯。其他的chunk包也是类似，可以是不同业务线区分不同的chunk，也可以是不同功能的组件类型进行取消chunk，总之我们一个chunk包内的组件`需要有关联性，统一性，chunk包内的组件不能太少也不能太多，太少了chunk分割出来没必要，占用网络下载并发，太多了一个chunk太大会影响下载速度和性能。`

# 3. remote端组件的打包
## 3.1 书写模块
完成了组件的书写，接下来我们作为工程的架构师我们需要书写remote端的全局打包逻辑，以及将我们的chunk打包成我们需要的模块联邦服务，首先我们将remote目录区分为以下的形式：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46a36e5e63a0459b904e69832d2c329f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=316&h=437&s=26403&e=png&b=181818)

没错就是每一个chunk包我们都为其在我们的 remote/src/components 下创建一个chunk导出文件，内容如下：
aims.ts
```ts
import aims from '@data-visual/aims'
export * from '@data-visual/aims'
export default aims
```
引入和导出我们还是采用 `workspace` 的软连接，因为我们之前都在其包的主index.ts 导出了所有的组件，所以我们通过引入对应包的packages.json的name属性即可直接引入这个包的组件，但是记得设置packages.json 的 `"main": "./index.ts",` 也就是默认导出文件入口。这样我们就实现了一个简单的chunk导出。   
由于我们此工程是模块联邦服务，所以我们完全不用关系app.vue 和 index.html 的内容，我们只需使用`vite-plugin-federation`插件干预打包，生成对应的服务文件即可，接下来我们上打包配置：  

## 3.2 打包配置
remote/vite.config.js
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { svgBuilder } from './utils'
const isProduction = process.env.NODE_ENV === 'production'

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
            ]
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
            },
            // 共享依赖声明
            shared: ['vue', 'dayjs', 'echarts', 'lodash-es', 'axios'],
        }),
    ],
    css: {
        postcss: './postcss.config.js', // 指定 postcss 配置文件路径
    },
    resolve: {
        dedupe: ['vue'],
    },
    // 打包配置
    build: {
        target: 'esnext',
        minify: false,
        assetsInlineLimit: 409600, // 设置图片转换为 Base64 的阈值
    },
})
```

### 3.2.1 核心的配置
```ts
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
    },
    // 共享依赖声明
    shared: ['vue', 'dayjs', 'echarts', 'lodash-es', 'axios'],
}),
```
> name：定义我们模块服务的名称  
> filename：定义我们模块服务打包产物的入口文件  
> exposes：暴露的模块  
> shared：共享的依赖文件,每一个shared依赖都会导出一个相应的 `__federation_shared_[name].js` 文件,例如: `__federation_shared_vue.js`。此文件会用于对模块联邦组件的依赖共享使用，在我们host端开发环境的时候我们的模块联邦服务的chunk会默认走线上的 共享文件，但是当我们对host端进行打包后，也会打包出相应的共享文件，自此线上的组件就会直接使用host打包出的共享文件了。

### 3.2.2 打包问题详解
1. 我们在配置vite打包插件的时候需要将 federation 配置放在最后，以免出现vue相关依赖没有被解析而模块联邦打包干预开始导致报错的问题。
2. 打包需要设置 `target: 'esnext',`，主要是因为我们的模块联邦有很多语法设计到ES6在转化成老版本的时候会有报错影响，所以我们打包都采用最新版JS。
3. 需要设置代码混淆关闭，`minify: false,`,因为我们模块联邦服务会对外提供共享依赖文件，如果依赖文件的属性等被混淆，那在host端使用的时候会找不到相关的变量。
4. 我们在打包组件产物后发现在本地开发环境所有的外链的资源引入都会`404`，因为其打包产物取资源都会是`相对路径取的形式，默认地址为线上环境`，但是我们的代码被我们host端下载下来以后解析运行后实际我们的运行环境是在`host端`，而host并没有那些相关的资源文件，所以导致所有外链相关的资源都会获取不到。但是组件的外链样式文件其在打包时就会动态生成一份专门的chunk样式，在我们引入某个样式的时候其会动态生成link插入到body把我们的样式文件下载下来，所以自然就没有这个情况，由于我们没有办法干预 `vite-plugin-federation` 这一打包行为，所以我们最终采用的方案是将所有的外链资源文件都采用内敛的形式打包主要分为以下类：  

* `模版引入的图片文件`：如
```
<img src="./images/test.png"/>
or 
<img :src="testImg"/>
import { testImg } from './images/test.png'
```
我们只需将图片都转化为 `Base64` 即可，要配置vite的图片转化为base64的图片大小限制大于我们的图片即可，当然提供的图片记得要压缩，能不用图片的尽量用css和html实现。
```ts
// 打包配置
build: {
    target: 'esnext',
    minify: false,
    assetsInlineLimit: 409600, // 设置图片转换为 Base64 的阈值
},
```
* `模版引入的svg文件`：，我们采用自己书写一个自定义插件 svgBuilder 进行统一内敛化处理的：
```ts
import { readFileSync } from 'fs'
import { resolve } from 'path'

// SVG 构建器
export function svgBuilder() {
    return {
        name: 'svg-builder',
        transform(code, id) {
            if (id.endsWith('.svg')) {
                const filePath = resolve(id)
                const fileContent = readFileSync(filePath, 'utf-8')
                // 将 SVG 文件转换成 Base64 编码
                const base64 = Buffer.from(fileContent).toString('base64')
                const codeSnippet = `export default "data:image/svg+xml;base64,${base64}"`
                return {
                    code: codeSnippet,
                    map: null,
                }
            }
        },
    }
}
```

* `处理css样式引入资源`: 我们设置postcss的扩展，强制设置样式文件全部转化为内敛的形式，并且限制为超过1kb就会被转化，不能设置设置0kb，会不生效。  
vite.config
```ts
css: {
    postcss: './postcss.config.js', // 指定 postcss 配置文件路径
},
```
postcss.config.js
```js
module.exports = {
    plugins: [
        require('postcss-url')({
            url: 'inline', // 将 URL 转换为内联形式
            maxSize: 1, // 图片大小超过 1 KB 才会被转换为 Base64
        }),
    ],
}
```
### 3.2.3 打包产物
打包产物主要分为 
1. remoteEntry 入口文件
2. 每一个chunk的js文件
3. 每一个chunk的样式文件
4. 共享依赖文件 `__federation_shared_[name].js`
5. 其他未共享的依赖文件等  

所有的文件都会打包在 `dist/assets` 文件夹下,在此我们就完成了我们模块联邦服务的打包。  
如果我们是本地启动的服务也就是 vite serve 那我们服务的路径就是 `[本地端口地址]/[工程base]/assets/remoteEntry.js`，例如
http://127.0.0.1:5000/data-visual/assets/remoteEntry.js  
如果我们的地址是线上的服务那就是 `[线上路径]/[工程base]/assets/remoteEntry.js`，例如：http://www.baidu.com/data-visual/assets/remoteEntry.js  
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87e08bcd16b34224a5c59c066f8b9002~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=320&h=858&s=62756&e=png&b=191919)

## 4. host端使用
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const isProduction = process.env.NODE_ENV === 'production'

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
            resolvers: [ElementPlusResolver()],
        }),
        federation({
            name: 'data-visual-host',
            remotes: {
                'data-visual': 'http://127.0.0.1:5000/data-visual/assets/remoteEntry.js',
            },
            shared: ['vue', 'dayjs', 'echarts', 'lodash-es', 'axios']
        }),
    ],
    build: {
        target: 'esnext',
        minify: false,
    },
    server: {
        port: 3077,
        open: true,
        host: true,
    },
})
```
### 4.1 核心配置：  
`name`：设置模块服务名称（其实没什么用）  
`remotes`：设置引入的模块服务，其实对应对象的key值就代表这个服务的引入名称，后面是模块服务的入口地址。  
`shared`：共享依赖的名称，用于在打包时在host端也打包出共享的依赖文件。  
```
federation({ 
    name: 'data-visual-host', 
    remotes: { 
        'data-visual': 'http://127.0.0.1:5000/data-visual/assets/remoteEntry.js'
    }, 
    shared: ['vue', 'dayjs', 'echarts', 'lodash-es', 'axios'] 
}),
```
### 4.2 注意事项：
1. build配置：打包时还是一样需要设置为最新版的js，需要与线上的模块联邦服务代码一致，同样不可以开启代码混淆，不然会无法获取到共享依赖的属性。
```ts
build: {
    target: 'esnext',
    minify: false,
}
```
2. server配置：因为我们模块联邦在判断是否获取线上地址的时候会默认判断是否时localhost，如果是localhost就走线上的共享依赖，不然则使用当前目录下的共享依赖，但是当我们本地开发启动项目的时候有时候会访问：127.0.0.1的地址，这也是localhost但是无法被模块联邦的服务文件所识别为本地环境，而是会以为我们是线上环境，以为我们是host端的打包后产物，然后就会相对路径`./`取共享资源，这样显然是无法获取到的, 所以我们要默认开启 `host: true` 。
```js
server: {
    port: 3077,
    open: true,
    host: true,
},
```
3. vue 版本需要与线上的模块联邦服务的vue版本一致：因为如果不一致会导致重复引入vue资源文件的问题，这样会导致线上服务和本地代码的vue上下文无法共享，那我们在使用例如vue插槽的时候会获取不到上下午导致报错。
4. chunk分包，我们在host端书写自定义chunk分别策略的时候需要注意让依赖文件全部打包在我们的资源根目录下，如果设置了 `build: { assetsDir: 'static/' }`, 则保证在 `assetsDir`对应的目录下即可，因为我们打包产物的 `host` 端模块联邦共享依赖始终会在模块我们资源的根目录下,但是我们的线上服务取资源的时候在打包后的版本只会以相对路径 `./` 的形式进行获取，如果不在一个目录下会获取不到共享资源。

### 4.3 引入组件和使用
引入组件我们只需import我们设置的模块联邦服务名称然后 /[chunk路径名称] 即可，路径这和我们线上remote端服务的chunk拆分有关
```ts
exposes: {
    './wgms': './src/components/wgms.ts',
    './ipes': './src/components/ipes.ts',
    './aims': './src/components/aims.ts',
    './bmp': './src/components/bmp.ts',
},
```
使用
a.vue
```vue
<template>
    <TestButton></TestButton>
</template>
<script setup lang="ts">
import { TestButton } from 'data-visual/aims'
</script>
```
ts的报错修复：由于我们模块联邦是纯js的chunk文件，所以会没有类型 我们需要在项目的 *.d.ts 文件内进行类型声明，不然会报错  `data-visual/aims` 没有类型。
*.d.ts
```ts
declare module 'data-visual/aims'
```