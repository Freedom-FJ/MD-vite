# DvBmpEventList 

> 组件 README

## Usage

```vue
<DvBmpEventList />
```

## Attributes

| Name           | Type   | Default    | Description |
| -------------- | ------ | ---------- | ----------- |
| siteCodeList | Array | [] | 站点列表 |
| envTypeCodeList | Array | [] | 环境要素列表 |
| centerLatitude | String | -- | 中心纬度 |
| centerLongitude | String | -- | 中心经度 |
| timeStamp | Number | -- | 查询开始时间 |
| isUseBuiltInApi| boolean | true      | 是否使用内置接口进行数据查询 |
| data           | Object |           | 不使用内部接口查询时，传入的数据 |

## Events

| Name | Type | Description |
| ---- | ---- | ----------- |
