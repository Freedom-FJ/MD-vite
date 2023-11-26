
# DvWgmsUpstreamSection

> 上游断面最近报警统计

## Usage

```vue
 <DvWgmsUpstreamSection :data-type="0"
    :start-time="1653926400000" :end-time="1656691200000"
    source-ids=""
    site-code="JMSZSY0008" :station-code="1"
    time-type="hour"/>
```


## Attributes

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| dataType | number | 数据类型【手动/自动】| 0 |
| startTime | number | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().startOf('year').valueOf() |
| sourceIds | string | 关联的站点id|  |
| siteCode | string | 站点code| JMSZSY0008 |
| stationCode | number | 站点类型| 1 |
| timeType | string | 时间类型| hour |

