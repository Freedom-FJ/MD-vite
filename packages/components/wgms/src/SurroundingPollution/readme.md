
# DvWgmsSurroundingPollution

> 周边污染影响

## Usage

```vue
 <DvWgmsSurroundingPollution :distance="10000" :start-time="1687492800000" :end-time="1687539599999" time-type="hour" :access-code-list="['YHWSZZ006', 'YHWSZZ007', 'YHWSZZ014', 'YHWSZZ015']" :time-stamp="1687536000000" :latitude="30.3992" :longitude="119.9681" :limit="3" :min-wave="2" :factor="27" />
```


## Attributes

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| startTime | number | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().endOf('year').valueOf() |
| factor | number | 因子id| 27 |
| timeType | string | 时间类型| hour |
| accessCodeList | array | 关联站点列表| ['YHWSZZ006', 'YHWSZZ007', 'YHWSZZ014', 'YHWSZZ015'] |
| distance | number | 距离| 10000 |
| overflowPortNum | number | 溢流口统计| 0 |
| timeStamp | number | 报警时间| 1687536000000 |
| latitude | number | 经纬度| 30.3992 |
| longitude | number | 经纬度| 119.9681 |
| limit | number | 长度限制| 3 |
| minWave | number | | 2 |

