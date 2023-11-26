<template>
    <div class="dv-bmp-event-list">
        <div class="custom-table">
            <div class="custom-table-header">
                <div style="width: 46px;" class="fixed-width">
                    序号
                </div>
                <div v-for="item in tableProps" :key="item.prop" :class="item.width ? 'fixed-width' : 'auto-width'" :style="{ width: item.width }">
                    {{ item.label }}
                </div>
            </div>
            <el-scrollbar class="custom-table-body">
                <div v-for="(item, index) in tableData" :key="item.id" class="custom-table-row">
                    <div class="custom-table-cell fixed-width" style="width: 46px;">
                        {{ index }}
                    </div>
                    <div v-for="prop in tableProps" :key="prop.prop" class="custom-table-cell" :style="{ width: prop.width }" :class="[prop.width ? 'fixed-width' : 'auto-width', prop.prop === 'currentDisposalStatusName' ? (item[prop.prop] === 0 ? 'undisposed' : (item[prop.prop] === 1 ? 'handing' : 'disposed')) : '']">
                        {{ item[prop.prop] }}
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { queryEventDataByTimePoint } from './api'
const props = defineProps({
    siteCodeList: Array,
    envTypeCodeList: Array,
    centerLatitude: String,
    centerLongitude: String,
    timeStamp: [Number, String],
    // 是否使用内置接口进行数据查询
    isUseBuiltInApi: {
        type: Boolean,
        default: true
    },
    // 不使用内部接口查询时，组件使用的数据
    data: Array
})

const tableData = ref<Record<string, any>>({})

const tableProps = ref([
    {
        label: '事件名称',
        prop: 'eventName',
    },
    {
        label: '状态',
        prop: 'currentDisposalStatusName',
        width: '72px'
    },
    {
        label: '距离',
        prop: 'distance',
        width: '80px'
    }
])

/**
 * @name: getData
 * @test: test font
 * @msg: 获取数据
 * @return {*}
 */
const getData = async () => {
    const params = {
        siteCodeList: props.siteCodeList,
        envTypeCodeList: props.envTypeCodeList,
        centerLatitude: props.centerLongitude,
        centerLongitude: props.centerLongitude,
        timeStamp: props.timeStamp
    }
    const res: any = await queryEventDataByTimePoint(params)
    return res?.data
}

onMounted(async () => {
    if (props.isUseBuiltInApi)
        tableData.value = await getData()
    else
        tableData.value = props.data as Record<string, any> || []
})
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
