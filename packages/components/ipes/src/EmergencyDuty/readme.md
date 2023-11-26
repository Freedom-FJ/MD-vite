# DvIpesEmergencyDuty 

> 应急值守

## Usage

```vue
  <DvIpesEmergencyDuty />
```

## Attributes

| Name             | Type   | Default                                                  | Description          |
| ---------------- |--------|----------------------------------------------------------|----------------------|
| panelData        | Object | -                                                        | 传入的展示数据          |
| getUserToCockpit | string | /xizhongdao-cockpit-server/duty/system/getUserToCockpit  | 例如：获取值班人员【默认西中岛】 |


## Events

| Name   | Type           | Description                                                                          |
| ------ | -------------- |--------------------------------------------------------------------------------------|
| getImg |  name:strung   | 根据传入的边框名称获取不同的背景图片（景图片borderName取值共有三种 duty、event、accident）      |

## 贡献者：

```vue
<ContributorView name="彭静静"></ContributorView>
```