
# DvWgmsAuxiliaryJudgment

> 辅助研判

## Usage

```vue
 <DvWgmsAuxiliaryJudgment :start-time="1653926400000" :end-time="1656691200000" :factor-id="27" site-code="GKA330100_2009" time-type="hour" :latitude="30.3992" :longitude="119.9681" />
```


## Attributes

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| startTime | number | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().endOf('year').valueOf() |
| factorId | string | 因子id| 27 |
| siteCode | string | 站点code| JMSZSY0008 |
| timeType | string | 时间类型| hour |
| latitude | number | 经纬度| 30.3992 |
| longitude | number | 经纬度| 119.9681 |

