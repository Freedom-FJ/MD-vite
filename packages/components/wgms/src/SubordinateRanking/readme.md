
# DvWgmsSubordinateRanking 

> 下级排名

## Usage

```vue
<DvWgmsSubordinateRanking controlLevel="001"  />
```

```vue
<DvWgmsSubordinateRanking :isLazy="true"  :data="[{ rankNo: 1, regionName: '测试站点', percent: 30 }]"  />
```


## Attributes

| Name | Type   | Description | Default |
| --- |--------|-------------|-------------|
| beginTime | number | 开始时间| dayjs().startOf('year').valueOf() |
| endTime | number | 结束时间| dayjs().subtract(-1, 'y').startOf('year').valueOf() |
| treeId | number/string | 区域id| 3302 |
| timeType | string |  时间统计维度 | year |
| controlLevel | string |  控制级别 | '001,002,003' |
| isLazy | boolean |  默认不请求模式，可以配合 `reload` 手动请求或者传入 `data` 静态数据 | false |
| data | array |   静态数据 | [] |


## Methods

| Name | Type | Description |
| --- | --- |-------------|
| reload | - | 手动控制组件发送请求更新数据      |



## 贡献者：

```vue
<ContributorView name="马佳辉"></ContributorView>
```


