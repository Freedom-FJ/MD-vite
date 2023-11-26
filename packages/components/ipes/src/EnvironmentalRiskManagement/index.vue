<template>
    <div class="dv-ipes-environmental-risk-management">
        <SingleItem v-for="item in data" :key="item.label" :data="item" />
    </div>
</template>

<script  setup lang="ts">
import { reactive } from 'vue'
import request from '../../service/request'
import SingleItem from './components/SingleItem.vue'
import type { ItemType } from './type'

const props = defineProps({
    // 环境风险管理---列表pai
    getListApi: {
        type: String,
        default: '/ipes-data-aggregation-server/api/v1/emergency/resource'
    },
    list: {
        type: Array<ItemType>,
        default: () => {
            return [
                { label: '环境风险单元', code: 'riskUnitCount', num: '', unit: '个' },
                { label: '应急物资库', code: 'wareHouseCount', num: '', unit: '个' },
                { label: '救援队伍', code: 'resourceTeamCount', num: '', unit: '支' },
                { label: '避难场所', code: 'resourceShelter', num: '', unit: '处' },
                { label: '应急车辆', code: 'resourceCarCount', num: '', unit: '辆' },
                { label: '环境敏感点', code: 'protectionCount', num: '', unit: '个' }]
        }
    },
    isUseBuiltInApi: {
        type: Boolean,
        default: true
    }
})
// 渲染数据
const data = ref<ItemType[]>([])
// 获取列表
async function getListData() {
    const res: any = await request({
        method: 'get',
        url: props.getListApi
    })
    data.value = props.list.map((ele) => {
        return {
            ...ele,
            num: res?.data[ele.code] || ''
        }
    })
}
if (props.isUseBuiltInApi)
    getListData()
else
    data.value = props.list
</script>

<script lang="ts">
export default {
    name: 'DvIpesEnvironmentalRiskManagement',
    title: '环境风险管理'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
