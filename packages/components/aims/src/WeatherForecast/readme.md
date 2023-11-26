# DvAimsWeatherForecast

> 气象预报

## 使用

```vue

<DvAimsWeatherForecast />
```

## Attributes

| Name | Type | Default | Description |
| - | - | - | - |
| isUseBuiltInApi | boolean | true | 是否使用内置接口 |
| apiParams | GetWeatherForecasListParams | {gridCode: '0101000000',startTime: dayjs().valueOf(),endTime:dayjs().add(6, 'day').valueOf(), modeId: 5} | 内置查询参数 |
| data | ListItemProps[] | null | 可选、外部数据 |

### GetWeatherForecasListParams
| Name | Type | Description |
| - | - | - |
| gridCode | string  | 网格编码 |
| startTime | number  | 开始时间 |
| endTime | number  | 结束时间 |
| modeId | number  | 模式id |


### ListItemProps

| Name | Type | Description |
| - | - | - |
| windDirection | number  | 风向角度 |
| minTemp | number  | 最小温度 |
| maxTemp | number  | 最大温度 |
| prcp | number  | 降雨量 |
| forecastTime | string  | 预报时间 |

## Events

| Name | Type | Description |
|------|------|-------------|
| -    | -    | -           |

## 贡献者：

```vue

<ContributorView name="李国帝"></ContributorView>
```
