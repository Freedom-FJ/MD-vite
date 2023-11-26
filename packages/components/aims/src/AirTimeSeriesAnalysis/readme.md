# DvAimsAirTimeSeriesAnalysis 时序分析

> 空气质量因子时序分析

## Usage

```vue
  <DvAimsAirTimeSeriesAnalysis  />
```
## Attributes
| Name | Type   | Default | Description |
| --- |--------|---------|-------------|
| apiParams | { dataType: 'year' \| 'month' \| 'day' \| 'hour'; startTime: number; endTime: number; factorCodes: string;codeType: string;codes: string;names?: string; } | { dataType: 'day',startTime: dayjs().subtract(6, 'd').valueOf(),endTime: dayjs().valueOf(),factorCodes: 'aqi,a34004,a34002,a21026,a21004,a05024,a21005',codeType: 'grid',codes: '0101000000' } | 接口的查询参数 |


## Events

| Name | Type | Description |
| --- | --- |-------------|
| - | - | - |

## 贡献者：

```vue
<ContributorView name="李国帝"></ContributorView>
```

