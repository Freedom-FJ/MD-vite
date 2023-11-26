# DvIpesTaskDispose 任务协同

> 组件readme

## Usage

```vue
  <DvIpesTaskDispose 
    :statisticalData="[
        { 
            category: '大气环境', 
            list: [
                { name: '已处置', value: 7, background: 'rgba(21, 243, 163, 1)' }, 
                { name: '处置中', value: 4, background: 'rgba(253, 189, 0, 1)' }, 
                { name: '未处置', value: 2, background: 'rgba(192, 196, 204, 1)' }
            ] 
        }, 
        { 
            category: '企业环境', 
            list: [
                { name: '已处置', value: 3, background: 'rgba(21, 243, 163, 1)' }, 
                { name: '处置中', value: 9, background: 'rgba(253, 189, 0, 1)' }
            ] 
        }
    ]" 
    :dutyRoster="[
        { duty: '值班经理', name: '张雪岗', }, 
        { duty: '平台值守', name: '吴丹', }, 
        { duty: '走航人员', name: '沈书良' }
    ]"/>
```

## Attributes

| Name | Type   | Default | Description |
| --- |--------|---------|-------------|
| statisticalData | array | [ ]       | 任务处置统计数据        |
| dutyRoster | array | [ ]       | 值班表数据        |

## 贡献者

```vue
<ContributorView name="汤佳妮"></ContributorView>
```