# DvAimsSameAndCurrentPeriodRank

> 本期同期排名

## 使用

```vue

<DvAimsSameAndCurrentPeriodRank />
```

## Attributes

| Name | Type | Default | Description |
| - | - | - | - |
| isUseBuiltInApi | boolean | true | 是否使用内置接口 |
| apiParams | GetSingleCityRankParams | {gridCode: '0101000000',factorCode: 'cieq',time: dayjs().subtract(1, 'hour').valueOf(),timeType: 'year'} | 内置查询参数 |
| data | DataItemProps[] | null | 可选、外部数据 |

### GetSingleCityRankParams
| Name | Type | Description |
| - | - | - |
| gridCode | string  | 区域编码 |
| factorCode | string  | 因子 |
| time | number  | 时间 |
| timeType | string  | 时间类型 |

### DataItemProps

| Name | Type | Description |
| - | - | - |
| groupName | string  | 区域名称 |
| rank | string  | 本期 |
| samePeriodRank | string  | 同期 |
| change | string  | 改善幅度 |

## Events

| Name | Type | Description |
|------|------|-------------|
| -    | -    | -           |

## 贡献者：

```vue

<ContributorView name="李国帝"></ContributorView>
```
