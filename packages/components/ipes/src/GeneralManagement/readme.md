# DvIpesGeneralManagement

> 综合管理

## Usage

```vue
  <DvIpesGeneralManagement :tabList="[]" :activeTab="'forewarning'" :cardData="[]" />
```

## Attributes

| Name      | Type   | Default                                                                                                                                                       | Description                                   |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| tabList   | array  | [{ code: 'forewarning', name: '预警', num: 1 }, { code: 'inspect', name: '巡查', num: 0 }, { code: 'telegram', name: '接报', num: 0 }]                        | tab列表                                       |
| activeTab | string | forewarning                                                                                                                                                   | 默认选中tab                                   |
| cardData  | array  | [{eventLevelName:'高级', eventLevelCode: 'high', startTimeStr: '2023-06-25 05:02', description: '【超标预警】Y2（华溢）Y3（弘丰）在2023-06-25 05:02:57产生'}] | 列表渲染数据,level等级code为low、middle、high |

## Events

| Name      | Type | Description                          |
| --------- | ---- | ------------------------------------ |
| changeTab |      | 切换tab触发事件，需用户更改activeTab |

## 贡献者

```
<ContributorView name="许绪敏"></ContributorView>
```
