# DvAimsCieqContributionAnalysis

> 气象分析

## 使用

```vue

<DvAimsMeteorologicalAnalysis/>
```

## Attributes

| Name            | Type           | Default   | Description            |
|-----------------|----------------|-----------|------------------------|
| isUseBuiltInApi | boolean        | true      | 可选、是否使用内置接口            |
| apiParams       | ApiParamsProps |           | 可选、接口的查询参数             |
| data            | any            | undefined | 可选、外部数据，用于覆盖不使用内置接口的情况 |

### ApiParamsProps

| Name       | Type   | Default       | Description                                                 |
|------------|--------|---------------|-------------------------------------------------------------|
| code       | string | 0101000000    | 编码（type为city时传citycode、type为grid时传gridCode、为site时传siteCode） |
| startTime  | string | -             | 开始时间                                                        |
| endTime    | string | -             | 结束时间                                                        |
| type       | string | city          | 区分城市city、区域area、站点site(后来用来区分不同模块对应的数据源)                    |
| timeType   | string | year          | 时间类型 年year、季节season、月度month                                 |
| timeValue  | string | year          | 时间类型对应的当前所选时间值（字符串），季节类型时这块下拉读配置                            |
| dataType   | string | allDay        | 数据类型：全天allDay 、污染天pollutionDay                              |
| factorCode | string | a34004(PM2.5) | 因子编码                                                        |

## Events

| Name | Type | Description |
|------|------|-------------|
| -    | -    | -           |

## 贡献者：

```vue

<ContributorView name="汤王强"></ContributorView>
```
