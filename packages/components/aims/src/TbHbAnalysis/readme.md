# DvAimsTbHbAnalysis

> 同比环比分析

## Usage

```vue
  <DvAimsTbHbAnalysis  />
```

## Attributes
| Name | Type   | Default | Description |
| --- |--------|---------|-------------|
| apiParams | ```{dataType: 'year' \| 'quarter' \| 'month' \| 'week' \| 'day' \| 'hour';startTime: number;endTime: number;factorCode: string;codeType: string;code: string;}``` | ```{dataType: 'month',startTime: dayjs().subtract(11, 'M').valueOf(),endTime: dayjs().valueOf(),factorCode: 'cieq',codeType: 'grid',code: '0101000000',}``` | 接口的查询参数 |


## Events

| Name | Type | Description |
| --- | --- |-------------|
| - | - | - |

## 贡献者：

```vue
<ContributorView name="李国帝"></ContributorView>
```
