# DvWgmsWaterQualityRainfall  

> 水质-雨量-水位趋势对比图

## Usage

```vue
 <DvWgmsWaterQualityRainfall :start-time="1687492800000" :end-time="1687539599999" time-type="hour" factor-name="总磷(以 P 计）" factor-unit="mg / L" :latitude="30.3992" :longitude="119.9681" />
```


## Attributes

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| startTime | number | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().endOf('year').valueOf() |
| timeType | string | 时间类型| hour |
| factorName | string | 因子名称| 总磷(以 P 计） |
| factorUnit | string | 因子单位| mg / L |
| latitude | number | 经纬度| 30.3992 |
| longitude | number | 经纬度| 119.9681 |

