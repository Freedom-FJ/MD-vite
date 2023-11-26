<!--
 * @Author: mjh
 * @Date: 2023-08-31 11:25:59
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 15:28:37
 * @Description: 
-->
# DvWgmsWaterQualitySituation  

> 水质现状

## Usage

```vue
 <DvWgmsWaterQualitySituation  />
```


## Attributes

| Name | Description   | Type | Default |
| --- |--------|-------------|-------------|
| treeId | 树id | string/number | '3301' |
| treeType | 树类型 区域/流域 | string/number | 1 |
| year | 年份 | number| '2023' |
| data | 静态数据 | array `详细类型见下` | () => [] |
| isLazy | boolean | 是否默认不请求 需要手动调用 `reload`| false |


## Events

| Name | Type | Description |
| --- | --- |-------------|
| reload | - | 手动控制组件请求数据刷新      |

## data 类型
```ts
type data = {
    childList?: {
        stationTypeCode: string
        stationTypeName: string
        total: null
        excellentPercent: number
        targetPercent: null
        yoyPercent: number
        childList: null
    }[]
    excellentPercent: number
    stationTypeCode: string
    stationTypeName: string
    targetPercent: number
    total: number
    yoyPercent: number
}[]
```

## 贡献者：

```vue
<ContributorView name="马佳辉"></ContributorView>
```
