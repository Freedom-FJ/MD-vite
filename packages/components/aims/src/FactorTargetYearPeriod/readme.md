# DvAimsFactorTargetYearPeriod

> 因子同比环比目标看板

## Usage

```vue
  <DvAimsFactorTargetYearPeriod  />
```

## Attributes
| Name | Type   | Default | Description |
| --- |--------|---------|-------------|
| isUseBuiltInApi | boolean | true | 是否使用内置接口进行数据查询|
| apiParams | ```{ time?: number; gridCode?: string; type?: 'county'; timeType?: 'year' \| 'quarter' \| 'month' \| 'week'; }``` | ```{ time: dayjs().subtract(1, 'h').valueOf(), gridCode: '0101010000',  timeType: 'year', type: 'county', }``` | 内置接口查询参数 |


## Events

| Name | Type | Description |
| --- | --- |-------------|
| - | - | - |

## 贡献者：

```vue
<ContributorView name="宋豪镔"></ContributorView>
```
