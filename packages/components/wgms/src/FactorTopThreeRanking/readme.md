# DvWgmsFactorTopThreeRanking 

> 排名前三关联因子

## Usage

## 传入条件组件内部自动请求接口
```vue
<DvWgmsFactorTopThreeRanking
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
<DvWgmsFactorTopThreeRanking 
    :data="[
        { factorCode: 'w21001',factorName: '氨氮',factorValue: 2.0}
  ]" />

```

## Attributes
| Name        |                               Type                               | Default   | 是否必传                   | Description                                    |
|-------------|:----------------------------------------------------------------:|-----------|------------------------|------------------------------------------------|
| type        |                              string                              | automatic | false                  | 自动数据（automatic）/ 手工数据（manual）                  |
| timeType    |                              string                              | -         | false                  | 时间类型 日、周、月、季、年（day、week、month、quarter、year 等等） |
| siteCode    |                              string                              | -         | false                  | 站点编码                                           |
| startTime   |                          string, number                          | -         | false                  | 开始时间 (时间戳)                                     |
| endTime     |                          string, number                          | -         | false                  | 结束时间(时间戳)                                      |
| stationCode |                              string                              | -         | false                  | 站点类型编码                                         |
| data        | [{"factorCode": "w21001","factorName": "氨氮","factorValue": 2.0}] | -         | 与上诉条件相反，要么传data要么传上诉条件 | 站点类型编码                                         |


## 贡献者：

```vue
<ContributorView name="张崇岩"></ContributorView>
```