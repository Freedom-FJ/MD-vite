# DvIpesAccessVehicleManage

> 车辆出入园统计

## Usage

```vue
<DvIpesAccessVehicleManage 
    :accessStatistic="[{label: '入园车辆', value: 23, type: 'entry'}, {label: '出园车辆', value: 999, type: 'exit'}]"
    :accessRecord="[{crossTime: 'crossTime', crossType: 'entry', plateNo: 'plateNo'}]" 
/>
```

## Attributes

| Name               | Type               | Default                                                                                  | Description                |
|--------------------|--------------------|------------------------------------------------------------------------------------------|----------------------------|
| accessStatistic           | IAccessStatistic[] | [{"label":"入园车辆","value":0,"type":"entry"},{"label":"出园车辆","value":0,"type":"exit"}]     | 出入园统计，字段类型 `IAccessStatistic`              |
| accessRecord           | IAccessRecord[]    | []                                                                                       | 出入园记录，字段类型 `IAccessRecord` |
| timeType           | string             | month                                                                                    | 时间类型                       |
| timeTypeOptions    | array              | [{"label":"年","value":"year"},{"label":"月","value":"month"},{"label":"日","value":"day"}] | 时间类型列表【注意格式保持一致】           |

## Events

| Name | Arguments                 | Description |
|------|---------------------------|-------------|
| onTimeTypeChange | value: string             | 时间切换        |
| onRecordCheck | idx: number, value: any   | 出入记录选中      |

## 贡献者

```vue
<ContributorView name="魏国"></ContributorView>
```