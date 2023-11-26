# DvIpesHarmfulMonitoring 有毒有害监控

> 组件readme

## Usage

```vue
<DvIpesHarmfulMonitoring />
```

## Attributes

| Name | Type         | Default                                                          | Description                                                                                                                                                               |
| --- |--------------|------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| factorList | object | {wg:[],ww:[]}                                                    | {wg:[{ factorName: '甲烷', factorValue: 89.32, targetValue: 500, percent: 0.179, }],ww:[{ factorName: '非甲烷总烃总量', factorValue: 89.32, targetValue: 500, percent: 0.179, },]} |
| statusMap | object | {normal: '', abnormal: '', offline: '',}                                                                 | 状态统计                                                                                                                                                                      |
| switchTime | number | 10000                                                                 | 动画切换时间                                                                                                                                                                    |
| width | number｜string | 100%                                                             | 云动画宽度                                                                                                                                                                     |
| height | number｜string | 100%                                                             | 云动画高度                                                                                                                                                                     |



## Events

| Name | Type | Description |
| --- | --- |-------------|