# DvAimsCieqContributionAnalysis

> 城市年排名

## 使用

```vue

<DvAimsCieqContributionAnalysis/>
```

## Attributes

| Name            | Type           | Default   | Description                                 |
|-----------------|----------------|-----------|---------------------------------------------|
| isUseBuiltInApi | boolean        | true      | 可选、是否使用内置接口                                 |
| apiParams       | ApiParamsProps |           | 可选、接口的查询参数                                  |
| data            | StateProps     | undefined | 可选、外部数据，用于覆盖不使用内置接口的情况                      |
| rankType        | string         | cieq      | 城市排名类型，综合指数排名传cieq，优良率排名传excellent，默认综合指数排名 |
| areaType        | string         |           | 'city' \| 'province' 排名依据，省级按城市排名，城市按区域排名   |

### ApiParamsProps

| Name              | Type    | Default      | Description                                                 |
|-------------------|---------|--------------|-------------------------------------------------------------|
| gridCode          | string  | -            | 网格编码                                                        |
| startTime         | string  | -            | 开始时间                                                        |
| endTime           | string  | -            | 结束时间                                                        |
| order             | string  | currentValue | 排序字段   currentValue本期   pastValue同期   changeValue变化率   默认本期 |
| isAsc             | boolean | false        | 是否升序   默认降序                                                 |
| gridLevelNickName | string  |              | 网格等级名称                                                      |

### StateProps

| Name       | Type            | Default | Description |
|------------|-----------------|---------|-------------|
| scrollTime | number          | 10      | 滚动时间        |
| listData   | ListItemProps[] | []      | 列表数据        |

### ListItemProps

| Name         | Type   | Default | Description |
|--------------|--------|---------|-------------|
| code         | string |         | code        |
| rank         | number |         | 排名          |
| name         | string |         | 城市名称        |
| currentValue | number |         | 本期          |
| pastValue    | number |         | 同期          |
| draw         | string |         | 颜色          |

## Events

| Name | Type | Description |
|------|------|-------------|
| -    | -    | -           |

## 贡献者：

```vue

<ContributorView name="汤王强"></ContributorView>
```
