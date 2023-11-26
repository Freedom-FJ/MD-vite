<!--
 * @Author: Tian
 * @Date: 2023-07-27 09:14:41
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 17:34:12
 * @Description: 环境在线监测
-->
# DvWgmsWaterEnvironmentOnlineMonitor

> 环境在线监测

## Usage


```vue
<DvWgmsWaterEnvironmentOnlineMonitor :params='params' :data='data' />
```



## Attributes
params具体参数如下：

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| regionCode | number/string | 区域id| 3301 |

是否默认不请求:

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| isLazy | boolean | 是否默认不请求 需要手动调用 `reload`| false |

data数组数据：

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| name | string | 名称| 国控 |
| onlineCount | string | 在线数量| 10 |
| total | string | 总数| 12 |

## Events

| Name | Type | Description |
| --- | --- |-------------|
| reload | - | 手动控制组件请求数据刷新      |



## 贡献者：

```vue
<ContributorView name="王田"></ContributorView>
```