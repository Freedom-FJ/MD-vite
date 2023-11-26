<!--
 * @Author: Tian
 * @Date: 2023-07-27 09:14:41
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 17:12:49
 * @Description: 源监控
-->
# DvWgmsSourceMonitoring

> 源监控

## Usage


```vue
<DvWgmsSourceMonitoring :params='params' :data='data' :isLazy='false' />
```



## Attributes
params具体参数如下：

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| treeId | string | 区域code| 3301 |
| treeType | number | 树类型| 区域：1，流域：0 |
| year | string | 年份| 2023 |

是否默认不请求:

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| isLazy | boolean | 是否默认不请求 需要手动调用 `reload`| false |


data数据：

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| equipmentCount | number | 设备数量| 80 |
| onlinePercent | number | 联网率| 99 |
| mainCount | number | 在线数量| 80 |
| mainPerent | number | 在线率| 80 |
| totalCount | number | 总数| 100 |

## Events

| Name | Type | Description |
| --- | --- |-------------|
| reload | - | 手动控制组件请求数据刷新      |


## 贡献者：

```vue
<ContributorView name="王田"></ContributorView>
```