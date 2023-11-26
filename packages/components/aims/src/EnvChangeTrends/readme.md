# DvAimsEnvChangeTrends

> 环境变化趋势

## 使用

```vue
  <DvAimsEnvChangeTrends  />
```

## Attributes
| Name | Type   | Default | Description |
| --- |--------|---------|-------------|
| isUseBuiltInApi | boolean | true | 可选、是否使用内置接口 |
| apiParams | ApiParamsProps | `{startTime: dayjs().subtract(24, 'hour').valueOf(), endTime: dayjs().subtract(1, 'hour').valueOf()}, codeType: 'grid', codes: '0101000000'}`  | 可选、接口的查询参数 |
| dataType | 'hour'\|'day' | hour | 可选、时间类型 |
| factorCode | 'aqi'\|'a34004'\|'a34002'\|'a21026'\|\'a21004'\|\'a05024'\|\'a21005'| 可选、因子编码 |
| data | OuterDataItemProps[] | undefined | 可选、外部数据，用于覆盖不使用内置接口的情况 |

### ApiParamsProps
| Name | Type | Description |
| --- |--------|-------------|
| startTime | number | 开始时间 |
| endTime | number | 结束时间 |
| codeType | string | 编码类型 |
| codes | string | 编码 |

### OuterDataItemProps
| Name | Type | Description |
| --- |--------|-------------|
| time | string | 时间 |
| value | number | 值 |

## Events

| Name | Type | Description |
| --- | --- |-------------|
| - | - | - |

## 贡献者：

```vue
<ContributorView name="李国帝"></ContributorView>
```
