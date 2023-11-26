# DvWgmsSevenDayKline

> 站点因k线与日变化

## Usage

```vue
<DvWgmsSevenDayKline :begin-time="1687492800000" :end-time="1687539599999" :factor="27" access-code="JMSZSY0008" time-type="hour" factor-name="总磷(以 P 计）" :factor-flag="false" factor-unit="mg / L" />
```


## Attributes

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| beginTime | number | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().endOf('year').valueOf() |
| accessCode | string | 站点code| JMSZSY0008 |
| timeType | string | 时间类型| hour |
| factorName | string | 因子名称| 总磷(以 P 计） |
| factorUnit | string | 因子单位| mg / L |
| factor | number | 因子ID| 27 |
| factorFlag | boolean | 是否是因子组| false |


