# DvIpesWaterNetworkManage 园区供水管网管理

> 园区供水管网管理

## Usage

```vue
  <DvIpesWaterNetworkManage />
```

## Attributes

| Name            | Type   | Default                                                       | Description      |
|-----------------|--------|---------------------------------------------------------------|------------------|
| percentNum      | number | 0                                                             | 阀门开启率            |
| onlineData      | IOnlineData | {online: 0, offline: 0}                                       | 在线/断线            |
| waterStatus     | IWaterStatus | {"line":{"pel":0,"total":0},"open":{"openTotal":0,"total":0}} | 设备联网率            |
| waterVolume     | IWaterVolume | {"supply":0,"ullage":0,"per":0}                               | 供水总量             |
| timeType        | string | 'month'                                                       | 时间类型             |
| timeTypeOptions | array  | [{"label":"年","value":"year"},{"label":"月","value":"month"}]  | 时间类型列表【注意格式保持一致】 |

## Events

| Name | Arguments        | Description |
|------|------------------|-------------|
| onTimeTypeChange | value: string    | 时间切换        |

```vue
<ContributorView name="魏国"></ContributorView>
```