# DvIpesHazardousVehicleManage 

> 危险品车辆管理

## Usage

```vue
<DvIpesHazardousVehicleManage
    :carData="[{name: '进园车辆', data: [3,23,23,25,35]}, {name: '出园车辆', data: [3,23,23,25,35]}]"
/>
```

## Attributes

| Name               | Type   | Default                                                                                                                                                                                                                 | Description      |
|--------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| hazardousCar    | IHazardousCar  | {"sfCount":0,"sfCountTitle":"外来车辆数","dnCount":0,"dnCountTitle":"自有车辆数","ynCount":0,"ynCountTitle":"园区车辆","zxCount":0,"zxCountTitle":"在线车辆数","lxCount":0,"lxCountTitle":"离线车辆数","zxPercent":0,"zxPercentTitle":"车辆在线状态"} | 危化品车数据 |
| parkOptions    | IParkOption  | [{"value":"","label":"全部"},{"value":"0","label":"西中岛"},{"value":"1","label":"长兴岛"}]                                                                                                                                     | 园区类型 |

## Events

| Name | Arguments     | Description |
| --- |---------------|-------------|
| onParkTypeChange | value: string | 园区改变        |

## 贡献者

```vue
<ContributorView name="魏国"></ContributorView>
```