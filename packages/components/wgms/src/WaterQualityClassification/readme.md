<!--
 * @Author: Tian
 * @Date: 2023-07-27 09:14:41
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 17:26:49
 * @Description: 水质类别占比
-->
# DvWgmsWaterQualityClassification

> 水质类别占比

## Usage


```vue
<DvWgmsWaterQualityClassification :params='params' :data='data' />
```



## Attributes
params具体参数如下：

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| controlLevel | string | 控制级别| 001 |
| treeId | string | 区域id| 3301 |
| startTime | numbe | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().endOf('year').valueOf() |
| timeType | string | 时间类型| hour |

是否默认不请求:

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| isLazy | boolean | 是否默认不请求 需要手动调用 `reload`| false |


data数组数据：

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| waterQuality | string | 水质等级名称| I类 |
| waterQualityColor | string | 水质等级颜色| #03A9F4 |
| count | string | 数量| 12 |
| percent | string | 占比| 12 |
| yoyPercent | string | 同比| 12 |

## Events

| Name | Type | Description |
| --- | --- |-------------|
| reload | - | 手动控制组件请求数据刷新      |



## 贡献者：

```vue
<ContributorView name="王田"></ContributorView>
```