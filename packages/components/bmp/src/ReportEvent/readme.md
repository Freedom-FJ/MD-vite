# DvBmpReportEvent 事件上报

> 组件 README

## Usage

```vue
<DvBmpReportEvent />
```

## Attributes

| Name           | Type   | Default    | Description |
| -------------- | ------ | ---------- | ----------- |
| year           | string | (当前年份) | 年份        |
| title          | string | 事件上报   | 标题        |
| width          | number | 182        | 宽度        |
| height         | number | 136        | 高度        |
| regionCodeList | array  | []         | 区域站点    |
| envTypeCode    | string | water      | 环境要素    |
| isUseBuiltInApi| boolean | true      | 是否使用内置接口进行数据查询 |
| data           | Object |           | 不使用内部接口查询时，传入的数据 |

## Events

| Name | Type | Description |
| ---- | ---- | ----------- |
