# DataVisual

# 开发须知
## 工具和安装

工具及其版本  
node: v16+  
pnpm

安装
`pnpm install`

## vscode插件

`Eslint` `styleLint` `volar`

## 目录结构

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

::: tip 第一阶段
<span id="tow-MD"></span>
所有组件开发人员只需要关注 `packages/components` 下对应的业务线组件代码即可，在里面开发组件，并运行 pnpm play 进行组件功能的测试，其他工程不需要关注。
:::
  
::: tip 第二阶段
当组内组件基本开发完成后,由 `组长` 运行 `pnpm build:remote`, 然后运行 `pnpm remote` 启动远端服务，再运行 `pnpm host` 启动本地测试服务，进行组内组件的模块联邦测试工作，并将问题提交给组内对应作者进行修改，详细内容请看下[`host端测试须知`](#host端测试须知)。
:::

注意：host 端 和 remote端代码修改不要提交！！ 

## 组件库规范

1. 组件命名: 
> 组件文件夹需要大驼峰的风格
> 组件子文件 遵循小驼峰或非驼峰形式，不同文件分类需要放入对应的文件夹内：
> 组件入口文件为 index.ts 用于暴露组件
> 组件主体为 index.vue 例如：
```
├─ AirQualityCalendar  // 空气质量大屏组件
│ ├─ images          // 组件图片
│ │  ├─ air.png
│ ├─ style           // 组件样式
│ │  ├─ index.scss
│ ├─ components      // 组件子组件
│ │  ├─ test.vue     
│ ├─ api             // 组件子请求
│ │  ├─ index.ts     
│ ├─ index.vue       // 组件主体
│ ├─ index.ts        // 组件暴露
``` 

2. 在`packages/components`下分为`ipes`、 `aims`、 `wgms`、 `bmp`、 `commons`，分别对应开发一组、开发二组、开发三组、平台二组和公共。  
3. 组件最外层dom class：`dv-[ipes/wgms/aims/bmp]-{componentName}` ， 例如：
``` html
<dv-wgms-data-picker>
    <dv-wgms-data-picker-top>
        头部
    </dv-wgms-data-picker-top>
    <dv-wgms-data-picker-bottom>
        底部
    </dv-wgms-data-picker-bottom>
</dv-wgms-data-picker>
```
4. 所有style必须以外链 string 的形式引入  例如：

``` vue
<style lang="scss">
@import "../../styles/mixins";
@import "./style/index";
</style>
```

5. 开发完成的组件应在`packages/components/xxx/src/index.ts`中导出，如下（因为批量导出会失去类型所以辛苦各位每个组件都手写导出一下）

``` js
// index.ts
export * from './FactorRealTimeRank'

```

## 组件库使用

在各组的组件库`packages/components/xxx`内开发组件,并在`packages/components/xxx/src/index.ts`中导入并暴露  

在项目根目录中使用`pnpm play`命令启动项目，可在`/play/src/App.vue`中导入组件查看效果

项目使用pnpm workspace + lerna, 可使用软链在`play`中导入组件库中的组件，例如：

``` js
import { AirQualityCalendar } from '@data-visual/aims'
// @data-visual/aims 为组件库的package.json.name
```

## 提交规范
所有commit提交必须规范，请以如下格式提交，前缀类型请参考 `commitlint.config.js` 文件

```
// 格式: {type}: ** `[wgms/bmp/aims/tips]: { componentName }` **  
feat: 制作`wgms: EnvironmentalAnalysis` 空气质量组件
fix: 修复`bmp: TestCom` 数据过多换行问题
docs: 书写 `aims: FactorRealTimeRank` 文档
```
`: ` 是英文，中文会无法提交

## host端测试须知
以下内容全权由组长阅读，启动相关请看上部[第二阶段](#tow-MD)。

1. 由于链接地址导致在host端无法正确获取到png,svg 等资源，并且打包也会失去相关资源，我们暂时统一采用base64方式引入，所以项目中不可以出现 `new URL` 方式引入图片, 所有涉及到动态引入图片资源的请使用import引入。例如：
``` vue
<template>
    <img :src="wind_direction" alt="">
</template>
<script setup lang="ts">
import wind_direction from './images/wind_direction.svg'
</script>
```

2. 当运行host端时，注意使用localhost访问，而不是 127.0.0.1，不然会获取不到shared资源。

涉及到相关其他问题请反馈 `马佳辉` `王腾` 。


# 使用须知
## 1. 本地host端搭建和使用remote组件

1. 搭建工程
推荐使用[ued前端模板](https://git.fpi-inc.site/wangtian/vue3-template)，或者基于`vite`构建工程（[vite项目搭建](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)）

1. 添加模块联邦支持

- 添加`@originjs/vite-plugin-federation`插件

`yarn add @originjs/vite-plugin-federation -D`

- 修改`vite.config.ts`配置文件

``` js
// 引入@originjs/vite-plugin-federation
import federation from '@originjs/vite-plugin-federation';

// 修改plugins配置
export default defineConfig({
    plugins: [
        federation({
            name: 'project-name',
            // 远程仓库地址，需要根据项目实际情况调整
            remotes: {
                'dataVisual': 'http://localhost:4173/assets/remoteEntry.js'
            },
        }),
        // 共享依赖声明
        shared: ['vue'],
        ...
    ]
})
```

3. 使用组件

main.ts
``` ts
import { EnvironmentalAnalysis, setDomain } from 'dataVisual/wgms' // 引入组件
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import Layout from './Layout.vue'
import 'element-plus/dist/index.css'
const app = createApp(Layout)
import.meta.env.DEV && setDomain('/api') // 设置本地代理
app.component('EnvironmentalAnalysis', EnvironmentalAnalysis)
app.use(ElementPlus, { locale })
app.mount('#root')
```

**.vue
``` Vue
<template>
    <EnvironmentalAnalysis></EnvironmentalAnalysis>
    <TestCom></TestCom>
</template>
<script setup lang="ts">
import { TestCom } from 'dataVisual/bmp'
</script>
```
4. 类型问题
由于模块联邦暂时不支持ts功能，所以需要进行类型声明  

**.d.ts
``` ts
declare module 'data-visual/wgms'
```

## 2. module-federation（模块联邦）

多个独立的构建可以组成一个应用程序，这些独立的构建之间不应该存在依赖关系，因此可以单独开发和部署它们。[webpack文档](https://webpack.docschina.org/concepts/module-federation/#motivation)

模块联邦是多个独立的构建组成一个应用程序，所以使用时最少需要两个工程，根据实际使用场景分为`host`和`remote`，两者没有本质的区别，`dataVisual`作为组件库，在其中扮演`remote`角色。

本地组件库测试

如果在组件开发阶段，需要模拟线上使用，当前工程下使用`yarn serve`命令充当`remote`端

然后在`host`端添加相应的`remotes`配置


