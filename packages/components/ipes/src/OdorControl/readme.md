# OdorControl 

> 组件readme

## Usage

```vue
  <OdorControl :siteData='{}'  :chartData='[]' />
```

## Attributes

| Name | Type   | Default | Description |
| --- |--------|---------|-------------|
| siteData | Object |   { siteCode: 'JSYQ0432062300941000',siteName: '上风向空气超站（六参）',dataTime: '2023-06-30 10',siteFactorDatas: [{factorCode: 'a21001',factorName: 'NH₃',factorValue: '0.0',factorStandardValue: '1.0',exceed: false}]}  |     站点滚动区域数据    |
| chartData | Object |   { xData: ['1月', '2月', '3月', '4月', '5月', '6月'],yData: ['0.72', '4.00', '4.30', '10.00', '5.00', '7.00']}|     异味指数图表数据    |

## 贡献者：

```vue
<ContributorView name="张迪"></ContributorView>
```