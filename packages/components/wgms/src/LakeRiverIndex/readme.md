
# DvWgmsLakeRiverIndex 

> 下级排名

## Usage

```vue
<DvWgmsLakeRiverIndex   />
```
## 静态数据
当我们传入data时组件会默认不请求，而是走我们的静态数据。
```vue
<DvWgmsLakeRiverIndex 
    :data="[
        [
            { name: '钱塘江', waterQualityName: '优', waterQualityColor: '#5AB1EF', yoy: 0 },
            { name: '新安江', waterQualityName: '良', waterQualityColor: '#5AB1EF', yoy: 0 },
            { name: '富春江', waterQualityName: '差', waterQualityColor: '#DE3614', yoy: 0 }
        ],
        [
            { name: '千岛湖', waterQualityName: '优', waterQualityColor: '#DE3614', yoy: 0 },
            { name: '西湖', waterQualityName: '良', waterQualityColor: '#5AB1EF', yoy: 0 },
            { name: '西溪湿地', waterQualityName: '差', waterQualityColor: '#5AB1EF', yoy: 0 }
        ],
        [
            { name: '千岛湖', waterQualityName: '优', waterQualityColor: '#DE3614', eutrophia: '富营养化' },
            { name: '西湖', waterQualityName: '良', waterQualityColor: '#5AB1EF', eutrophia: '富营养化' },
            { name: '西溪湿地', waterQualityName: '差', waterQualityColor: '#5AB1EF', eutrophia: '富营养化' }
        ]
    ]"    
/>
```


## Attributes

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| beginTime | number | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().subtract(-1, 'y').startOf('year').valueOf() |
| factorGroupId | number/string | 因子id| 27 |
| timeType | string | 时间类型 | 'day' |
| treeId | number/string | 区域id| 3302 |
| treeType | number | 类型 1 区域 0 流域| 1 |
| queryTimeType | string |  时间统计维度 | year |
| isLazy | boolean |  默认不请求模式，可以配合 `reload` 手动请求或者传入 `data` 静态数据 | false |
| data | array |   静态数据,传此数据组件会不默认请求，传入一个数组，数组内是三个数组分别对应 `重要流域水质`, `重要水体水质`, `重要湖库营养化指数` | - |


## Methods

| Name | Type | Description |
| --- | --- |-------------|
| reload | - | 手动控制组件发送请求更新数据      |



## 贡献者：

```vue
<ContributorView name="马佳辉"></ContributorView>
```


