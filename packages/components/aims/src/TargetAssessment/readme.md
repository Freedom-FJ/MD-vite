# DvAimsTargetAssessment

> 目标考核

## 使用

```vue
  <DvAimsTargetAssessment  />
```

## Attributes
| Name | Type   | Default | Description |
| --- |--------|---------|-------------|
| isUseBuiltInApi | boolean | true | 可选、是否使用内置接口 |
| apiParams | ApiParamsProps |   | 可选、接口的查询参数 |
| data | StateProps | undefined | 可选、外部数据，用于覆盖不使用内置接口的情况 |

### ApiParamsProps
| Name | Type | Description |
| --- |--------|---------|
| year | number | 时间戳 |
| gridLevel | string | city、province 具体参考接口文档 |
| gridCode | string | 网格编码 |
| itemCode | string | 因子编码，通过接口/target-server/api/v1/target/item-inquire-by-code查询参数依赖targetTypeCode |
| targetTypeCode | string | 获取动态目标 通过接口 target-server/api/v1/target-type-api/select-by-code-or-name查询 | 

### StateProps
| Name | Type   | Default | Description |
| --- |--------|---------|-------------|
| upToStandardNum | string | '--' | 达标数量 |
| notUpToStandardNum | string | '--' | 未达标数量 |
| scrollTime | number | 10 | 滚动时间 |
| listData | ListItemProps[] | [] | 列表数据 |

### ListItemProps
| Name | Type   | Description |
| --- |--------|---------|
| id | string | id |
| gridName | string | 城市名称 |
| targetValue | string | 目标 |
| realValue | string | 实测 |
| targetStatus | string | 0:未开始，1：暂未达标，2：暂时达标，3：未达标，4：已达标  |
| targetStatusName | string | 完成情况中文描述 |

## Events

| Name | Type | Description |
| --- | --- |-------------|
| - | - | - |

## 贡献者：

```vue
<ContributorView name="李国帝"></ContributorView>
```
