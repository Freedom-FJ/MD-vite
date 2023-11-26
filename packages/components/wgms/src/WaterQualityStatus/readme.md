<!--
 * @Author: Tian
 * @Date: 2023-07-27 09:14:41
 * @LastEditors: Tian
 * @LastEditTime: 2023-07-28 09:35:18
 * @Description: 水质状况
-->
# DvWgmsWaterQualityStatus

> 水质状况

## Usage


```vue
<DvWgmsWaterQualityStatus :params='params' :data='data' />
```



## Attributes
params具体参数如下：

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| regionCode | string | 区域code| 3301 |
| startTime | numbe | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().endOf('year').valueOf() |

是否默认不请求:

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| isLazy | boolean | 是否默认不请求 需要手动调用 `reload`| false |

data数组数据：

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| name | string | 名称| I类 |
| reachStandardRate | number | 达标率| 99 |
| target | number | 目标| 100 |
| yoy | number | 同比| 12 |

## Events

| Name | Type | Description |
| --- | --- |-------------|
| reload | - | 手动控制组件请求数据刷新      |



## 贡献者：

```vue
<ContributorView name="王田"></ContributorView>
```