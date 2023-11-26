# DvIpesInspectionManage 巡检管理

> 巡检管理

## Usage

```vue
<DvIpesInspectionManage />
```

## Attributes

| Name               | Type   | Default | Description      |
|--------------------|--------|---------|------------------|
| eventList          |  Object|---------|传入的数据          |
| inspectionList     |  Object|---------|传入的数据          |
| eventListApi       | string | /xizhongdao-cockpit-server/inspection/getEventTotalStatistic   | 例如：巡检事件api【默认西中岛】 |
| inspectionListApi  | string | /ipes-prj-map-server/motion/business/statistics/get-event-plan   | 例如：巡检记录api【默认西中岛】        |

## Events

| Name | Arguments                 | Description |
|------|---------------------------|-----------|
| onRecordCheck | idx: number, value: any   | 记录选中      |

## 贡献者

```vue
<ContributorView name="魏国"></ContributorView>
```
