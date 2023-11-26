# DvWgmsFactorTrendComparison 

> 要素趋势对比

## Usage

## 传入条件组件内部自动请求接口
```vue
<DvWgmsFactorTrendComparison
    :end-time="1663257600000"
    :start-time="1662739200000"
    site-code="zaoleishougong"
    station-code="1"
    time-type="day"
/>
```

## 自定义传入数据
当我们传入data时组件会默认不请求，使用传入的数据进行渲染
```vue
自定义传入数据
<DvWgmsFactorTrendComparison
    :data="[
                    {
                        factorCode: 'w01001',
                        factorTimeDataList: [
                            {
                                time: '09-01',
                                value: 20.0,
                            },
                            {
                                time: '09-02',
                                value: 21.0,
                            },
                            {
                                time: '09-03',
                                value: 22.0,
                            },
                            {
                                time: '09-04',
                                value: 23.0,
                            },
                            {
                                time: '09-05',
                                value: 24.0,
                            },
                            {
                                time: '09-06',
                                value: 25.0,
                            },
                            {
                                time: '09-07',
                                value: 26.0,
                            }],
                    },
                ]
                "
/>
```

## Attributes
| Name        |      Type      | Default   | 是否必传                   | Description                                    |
|-------------|:--------------:|-----------|------------------------|------------------------------------------------|
| type        |     string     | automatic | false                  | 自动数据（automatic）/ 手工数据（manual）                  |
| timeType    |     string     | -         | false                  | 时间类型 日、周、月、季、年（day、week、month、quarter、year 等等） |
| siteCode    |     string     | -         | false                  | 站点编码                                           |
| startTime   | string, number | -         | false                  | 开始时间 (时间戳)                                     |
| endTime     | string, number | -         | false                  | 结束时间(时间戳)                                      |
| stationCode |     string     | -         | false                  | 站点类型编码                                         |
| data        |     array      | -         | 与上诉条件相反，要么传data要么传上诉条件 | 站点类型编码                                         |


## 贡献者：

```vue
<ContributorView name="张崇岩"></ContributorView>
```