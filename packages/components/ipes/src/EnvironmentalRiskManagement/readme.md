# DvIpesEnvironmentalRiskManagement  环境风险管理

> 环境风险管理

## Usage

```vue
<DvIpesEnvironmentalRiskManagement />
```

## Attributes

| Name            | Type    | Default                                                 | Description                                                        |
| --------------- | ------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| getListApi      | string  | /ipes-data-aggregation-server/api/v1/emergency/resource | 环境风险管理接口【默认宁东项目】                                   |
| list            | array   | 见下方                                                  | 默认数据，code对应后端返回数值字段                                 |
| isUseBuiltInApi | boolean | true                                                    | 默认为true，使用内置接口，若isUseBuiltInApi为false则数据由list提供 |

   list 参数默认，若isUseBuiltInApi为false时需要提供num

```
[{ label:'环境风险单元', code:'riskUnitCount', num:'', unit:'个' }, 
{ label:'应急物资库', code:'wareHouseCount', num:'', unit:'个' }, 
{ label:'救援队伍', code:'resourceTeamCount', num:'', unit:'支' },
{ label:'避难场所', code:'resourceShelter', num:'', unit:'处' }, 
{ label:'应急车辆', code:'resourceCarCount', num:'', unit:'辆' }, 
{ label:'环境敏感点', code:'protectionCount', num:'', unit:'个' }]
```

## 贡献者

```vue
<ContributorView name="许绪敏"></ContributorView>
```
