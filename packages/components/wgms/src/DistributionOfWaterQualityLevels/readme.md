<!--
 * @Author: Tian
 * @Date: 2023-07-27 09:14:41
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 17:27:08
 * @Description: 水质等级分布
-->
# DvWgmsDistributionOfWaterQualityLevels

> 水质等级分布

## Usage


```vue
<DvWgmsDistributionOfWaterQualityLevels :params='params' :data='data' />
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


data数组数据：

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| count | number | 站点数量| 10 |
| level | number | 等级| 99 |
| levelName | string | 等级名称| I类 |
| percent | number | 占比| 80 |
| qoqPercent | number | 环比| 10 |
| totalCount | number | 总数| 100 |

## Events

| Name | Type | Description |
| --- | --- |-------------|
| reload | - | 手动控制组件请求数据刷新      |

## 贡献者：

```vue
<ContributorView name="王田"></ContributorView>
```