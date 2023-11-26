# DvWgmsPollutionSourceControl  

> 污染源管控

## Usage

```vue
<DvWgmsPollutionSourceControl   />
```


## Attributes

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| beginTime | number | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().endOf('year').valueOf() |
| factorList | `{ label: string value: string }[]` | 因子列表 | [] |
| defaultSelectFactor | string | 默认选择因子，可以切换动态监听,空数组就是全部 | '' |
| distance | number | 距离米 | 3000 |
| siteCode | string/number | 研判站点code | 'zaoleishougong' |
| stationCode | string/number |  站点类型 | 1 |
| timeType | string | 研判时间类型| 'day' |
| isHandle | boolean | 是否统计手工数据| false |
| isLazy | boolean | 是否开启懒惰模式，该模式下组件默认不请求接口，组件传参变化也不会刷新需要手动调用组件方法刷新数据，但是重点源超标前三会因为选择变化刷新数据 | false |

## Events

| Name | Type | Description |
| --- | --- |-------------|
| factorChange | (code: string) | 重点源超标前三因子切换      |

## Methods

| Name | Type | Description |
| --- | --- |-------------|
| keyPollutionData | - | 获取重点源超标前三数据      |
| getPortData | - | 获取入河排污口数据      |
| keyPollutionStatistic | - | 获取重点源超标统计数据      |


## 贡献者：

```vue
<ContributorView name="马佳辉"></ContributorView>
```