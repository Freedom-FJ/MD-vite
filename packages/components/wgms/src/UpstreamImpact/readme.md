<!--
 * @Descripttion: 
 * @version: 
 * @Author: admin
 * @Date: 2023-07-26 16:43:13
 * @LastEditors: admin
-->

# DvWgmsUpstreamImpact

> 上游影响

## Usage

```vue
 <DvWgmsUpstreamImpact :configTime="1671667200000" factor-code="w21003"
    access-code="JMSZSY0008"  time-type="hour"
/>
```


## Attributes

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| configTime | number | 报警时间| 1687536000000 |
| beginTime | number | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().startOf('year').valueOf() |
| factorCode | string | 因子code| w21003 |
| accessCode | string | 站点code| JMSZSY0008 |
| timeType | string | 时间类型| hour |
| factorName | string | 因子名称| 总磷(以 P 计） |
| factorUnit | string | 因子单位| mg / L |
| factor | string | 因子ID| 27 |
| accessCodeList | string | 站点code字符串|  |
| limit | number | 限制长度| 2 |
| baseLevel | number | | -1 |

