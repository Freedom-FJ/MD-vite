<!--
 * @Author: Tian
 * @Date: 2023-07-27 09:14:41
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 17:40:47
 * @Description: 饮用水源地达标率
-->
# DvWgmsDrinkingWaterComplianceRate

> 饮用水源地达标率

## Usage


```vue
<DvWgmsDrinkingWaterComplianceRate :params='params' :titleStyle='titleStyle' />
```



## Attributes
params具体参数如下：
| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| startTime | number | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().endOf('year').valueOf() |
| timeType | string | 时间类型| hour |
| factor | string | 因子或者因子组id| 8 |
| factorFlag | boolean | 是否因子组| true |
| keyWord | string | 关键词| - |
| treeId | string | 区域id| 3301 |
| waterSourceScaleCode | string | 饮用水源地规模| - |

是否默认不请求:

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| isLazy | boolean | 是否默认不请求 需要手动调用 `reload`| false |

titleStyle: 标题样式
eg: {
    color: '#fff'
}

## Events

| Name | Type | Description |
| --- | --- |-------------|
| reload | - | 手动控制组件请求数据刷新      |

## 贡献者：

```vue
<ContributorView name="王田"></ContributorView>
```