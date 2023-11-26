<!-- 有毒有害气体管控 -->
<template>
    <div class="dv-ipes-gas-control ipes-gas-control-container">
        <SingleItem v-for="item, index in topData" :key="index" :data="item" class="dv-ipes-single-item-wrap" />
        <AlarmStatistics class="dv-ipes-alarm-statistics-wrap" :all="alarmNum" :data="list" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import request from '../../service/request'
import SingleItem from './components/SingleItem.vue'
import AlarmStatistics from './components/AlarmStatistics.vue'
import type { SingleItemType, StatisticsType } from './type'
const props = defineProps({
    // '有毒有害气体', '易燃易爆监测', 'VOCs厂界监测'数据
    getGasControlApi: {
        type: String,
        default: '/ipes-monitor-server/api/v2/monitordata/real-data-new?monitorType=aqms'
    },
    alarmNum: {
        default: 0,
        type: Number
    },
    data: {
        type: Array<SingleItemType>,
        default: () => []
    },
    list: {
        type: Array<StatisticsType>,
        default: () => []
    },
    isUseBuiltInApi: {
        default: true,
        type: Boolean
    }
})

// '有毒有害气体', '易燃易爆监测', 'VOCs厂界监测'对应正常、异常、离线数据
const topData = ref<SingleItemType[]>([])
// 获取数据
async function getGasControlData(category: any) {
    try {
        const res: any = await request({
            method: 'get',
            url: props.getGasControlApi,
            params: { category },
        })
        return res?.data?.statusMap
    }
    catch (error) {
        console.log(error)
    }
}
async function getData() {
    try {
        const res = await Promise.all([
            getGasControlData('ydyh'),
            getGasControlData('yryb'),
            getGasControlData('cjyj'),
        ])
        const labels = ['有毒有害气体', '易燃易爆监测', 'VOCs厂界监测']
        const list = labels.map((label, index) => {
            const nums = [res[index].normal, res[index].abnormal, res[index].offline]
            return {
                label,
                nums
            }
        })
        topData.value = list
    }
    catch (e) {
        console.log(e)
    }
}
if (props.isUseBuiltInApi)
    getData()
else
    topData.value = props.data
</script>

<script lang="ts">
export default {
    name: 'DvIpesGasControl',
    title: '有毒有害气体管控'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
