# DvIpesGasControl

> 有毒有害气体管控

## Usage

```vue
  <DvIpesGasControl :getGasControlApi="[]" :list="[]" :data="[]" />
```

## Attributes

| Name             | Type    | Default                                                                | Description                                               |
| ---------------- | ------- | ---------------------------------------------------------------------- | --------------------------------------------------------- |
| getGasControlApi | string  | /ipes-monitor-server/api/v2/monitordata/real-data-new?monitorType=aqms | 有毒有害气体、易燃易爆监测、VOCs厂界监测（默认西中岛）    |
| isUseBuiltInApi  | Boolean | true                                                                   | 是否使用内置接口，默认true，可选false，则使用data数据传入 |
| list             | array   | 见下方                                                                 | 详见示例                                                  |
| data             | array   | 见下方                                                                 | 详见示例                                                  |

list具体数据如下

```
[{
    code:'dangerous',
    name:'危险',
    count:12
    }, {
    code:'warn',
    name:'警告',
    count:32
    }, {
    code:'attention',
    name:'注意',
    count:45
    }, {
    code:'abnormal',
    name:'异常',
    count:98
    }]
```

data具体数据如下

```
[
    {
        label: '有毒有害气体',
        nums: [11, 11, 11]
    },
    {
        label: '易燃易爆监测',
        nums: [11, 11, 11]
    },
    {
        label: 'VOCs厂界监测',
        nums: [11, 11, 11]
    }
]
```

## 贡献者

```vue
<ContributorView name="许绪敏"></ContributorView>
```
