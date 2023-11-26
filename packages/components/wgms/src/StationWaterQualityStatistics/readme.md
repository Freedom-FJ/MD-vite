
# DvWgmsStationWaterQualityStatistics 

> 站点水质统计

## Usage

```vue
 <DvWgmsStationWaterQualityStatistics />
```


## Attributes

| Name | Description   | Type | Default |
| --- |--------|-------------|-------------|
| treeId | 树id | string/number | '3301' |
| treeType | 树类型 区域/流域 | string/number | 1 |
| year | 年份 | number| '2023' |
| data | 静态数据 | array | () => [] |
| isLazy | boolean | 是否默认不请求 需要手动调用 `reload`| false |


## Events

| Name | Type | Description |
| --- | --- |-------------|
| reload | - | 手动控制组件请求数据刷新      |

## data 类型
```ts
type data = {
    dataTime: string
    level: number
    levelName: string
    levelColor: string
    target: number
    targetName: string
    targetColor: string
    siteCode: string
    siteName: string
    yoyLevel: number
    yoyLevelName: string
    yoyLevelColor: string
    index: number
}[]
```

## 贡献者：

```vue
<ContributorView name="马佳辉"></ContributorView>
```
