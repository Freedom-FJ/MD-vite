# DvAimsEnvironmentMonitor

> 环境监测

## Usage

```vue
  <DvAimsEnvironmentMonitor  />
```

## Attributes
| Name | Type | Default | Description |
| --- |--------|---------|-------------|
| isUseBuiltInApi | boolean | true | 是否使用内置接口进行数据查询|
| apiParams | ```{ showCount?: boolean; withPms?: boolean; }``` | ```{ showCount: true, withPms: true, }``` | 内置接口查询参数 |
| data | ```{ name: string; code: string; onlineCount: number; totalCount: number; }[]``` | undefined | 自定义数据，当isUseBuiltInApi为false时生效 |


## Events

| Name | Type | Description |
| --- | --- |-------------|
| - | - | - |

## 贡献者：

```vue
<ContributorView name="宋豪镔"></ContributorView>
```
