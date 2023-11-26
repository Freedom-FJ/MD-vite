# DvAimsAirQualityRealTime 实时空气质量看板

> 空气质量，可以查看日维度或者小时维度

## Usage

```vue
  <DvAimsAirQualityRealTime  />
```

## Attributes
| Name | Type   | Default | Description |
| --- |--------|---------|-------------|
| apiParams | GetAirQualityParams | { time: dayjs().valueOf(), gridCode: '01010000', gridLevelNickName:'city' } | 接口的查询参数 |
| timeType | 'hour' \| 'day' | hour | 实时or今日 |

### GetAirQualityParams
| Name | Type   | Description |
| --- |--------|---------|
| time | number | 时间戳 |
| gridCode | string | 网格编码 |
| gridLevelNickName | 'city' \| 'province' \| 'county' | 网格级别 |


## Events

| Name | Type | Description |
| --- | --- |-------------|
| - | - | - |

## 贡献者：

```vue
<ContributorView name="李国帝"></ContributorView>
```
