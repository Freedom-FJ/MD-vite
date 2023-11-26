
# DvWgmsCrossSectionCorrelation

> 断面相关性系数排名及最近报警统计

## Usage

```vue
 <DvWgmsCrossSectionCorrelation :time="dayjs().startOf('year').valueOf()" :analysis-time="27" :target-factor-id="27" access-code="" query-time-type="hour" source-factors="" :delayed-flag="true" :filter-empty="false" :limit="3" :begin-time="dayjs().startOf('year').valueOf()" :end-time="dayjs().endOf('year').valueOf()" />
```


## Attributes

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| beginTime | number | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().endOf('year').valueOf() |
| targetFactorId | number | 目标因子ID| 27 |
| accessCode | string | 站点code| JMSZSY0008 |
| queryTimeType | string | 时间类型| hour |
| sourceFactors | string | |  |
| delayedFlag | boolean | | true |
| filterEmpty | boolean | | false |
| limit | number | 限制长度| 3 |

