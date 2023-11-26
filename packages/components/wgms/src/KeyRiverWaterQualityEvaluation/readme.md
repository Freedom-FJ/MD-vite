<!--
 * @Author: Tian
 * @Date: 2023-07-27 09:14:41
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 17:38:25
 * @Description: 重点河道水质评价
-->
# DvWgmsKeyRiverWaterQualityEvaluation

> 重点河道水质评价

## Usage


```vue
<DvWgmsKeyRiverWaterQualityEvaluation :params='params' :data='data' />
```



## Attributes
params具体参数如下：

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| startTime | number | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().endOf('year').valueOf() |
| timeType | string | 时间类型| 'hour' |
| treeId | number/string | 区域id| 3301 |

是否默认不请求:

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| isLazy | boolean | 是否默认不请求 需要手动调用 `reload`| false |

data数据：

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| evaluate | string | 水质评价等级| 优 |
| grade | string | 水质等级| 1 |
| color | string | 水质等级颜色| '#3387FF' |
| name | string | 河道名称| '钱塘江' |
| yoyType | number | 同比| 0 持平 1 上升 -1 下降 |

## Events

| Name | Type | Description |
| --- | --- |-------------|
| reload | - | 手动控制组件请求数据刷新      |



## 贡献者：

```vue
<ContributorView name="王田"></ContributorView>
```