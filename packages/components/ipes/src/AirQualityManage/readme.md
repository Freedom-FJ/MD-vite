# AirQualityManage 空气质量管理

> 组件readme

## Usage

```vue
<AirQualityManage :air-quality-obj="{ aqiValue: 0, aqiLevel: '2', aqiColor: 'red', mainPollutants: 'PM2.5', mainPollutantValue: '100', }"/>
```

## Attributes

| Name | Type   | Default | Description |
| --- |--------|---------|-------------|
| airQualityObj | object | { aqiValue: 0, aqiLevel: '', aqiColor: '', mainPollutants: '', mainPollutantValue: '', }    | 数据：{ aqiValue: 0, aqiLevel: '2', aqiColor: 'red', mainPollutants: 'PM2.5', mainPollutantValue: '100', }         |
| width | number｜string | 100%    | 动画宽度 |
| height | number｜string | 96      | 动画高度 |



## Events

| Name | Type | Description |
| --- | --- |-------------|
