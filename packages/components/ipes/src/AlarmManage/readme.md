# DvIpesAlarmManage 报警管理


## Usage

```vue
  <DvIpesAlarmManage :overProofAlarm='overProofAlarm' :realAlarmList='realAlarmList'/>
```

## Attributes

| Name | Type   | Default                                                                                                                                     | Description |
| --- |--------|---------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| overProofAlarm | Object | {dqhj: 1,total: 1,ydyh: 0, wry: 1 }                                                                                                         | 超标报警统计数据 |
| realAlarmList | array | [{id: 6910,alarmName: '超标预警',alarmTime: 1690931100000,description: '【超标预警】三号渠在2023-08-02 07:05:00产生中超标报警，监测因子：水位，监测值：2.237m，超标限值：(1.5,10)'}] | 实时报警列表 |

## 贡献者：

```vue
<ContributorView name="张迪"></ContributorView>
```