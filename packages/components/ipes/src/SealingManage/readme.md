# DvIpesSealingManage 封闭化管理

> 封闭化管理

## Usage

```vue
  <DvIpesSealingManage />
```

## Attributes

| Name               | Type   | Default | Description      |
|--------------------|--------|---------|------------------|
| hazardousCar    | IHazardousCar  | {"ynCount":0,"ynCountTitle":"园区车辆","zxPercent":0,"zxPercentTitle":"车辆在线状态"} | 危化品车数据 |
| accessStatistic           | IAccessStatistic[] | [{"label":"入园车辆","value":0,"type":"entry"},{"label":"出园车辆","value":0,"type":"exit"}]     | 出入园统计，字段类型 `IAccessStatistic`              |
| timeType           | string | month   | 时间类型             |
| timeTypeOptions    | array  | [{"label":"年","value":"year"},{"label":"月","value":"month"},{"label":"日","value":"day"}]   | 时间类型列表【注意格式保持一致】 |
| parkOptions    | array  | [{"value":"","label":"全部"},{"value":"0","label":"西中岛"},{"value":"1","label":"长兴岛"}]   | 园区类型【注意格式保持一致】 |

## Events

| Name | Arguments     | Description |
| --- |---------------|-------------|
| onTimeTypeChange | value: string | 时间改变        |
| onParkTypeChange | value: string | 园区改变        |

## 贡献者

```vue
<ContributorView name="魏国"></ContributorView>
```