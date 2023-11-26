<!--
 * @Author: Tian
 * @Date: 2023-08-24 14:32:31
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 17:20:58
 * @Description: 源监控
-->
<template>
    <div class="dv-wgms-source-monitor">
        <div class="dv-wgms-source-monitor-list dv-wgms-flex-left-center">
            <div class="dv-wgms-source-monitor-list-item">
                <div class="title">
                    重点源企业
                </div>
                <div class="content-box dv-wgms-flex-left-center">
                    <img src="./images/source-0.svg" alt="">
                    <div class="right">
                        <div class="value">
                            <span class="online">{{ pomsData.mainCount === null ? '--' : pomsData.mainCount }}</span>
                            <span class="split">/</span>
                            <span class="total">{{ pomsData.totalCount === null ? '--' : pomsData.totalCount }}</span>
                            <span v-if="pomsData.totalCount !== null" class="unit">家</span>
                        </div>
                        <div class="percent">
                            <span class="unit">占比</span>
                            <span class="rate">{{ pomsData.mainPerent === null ? '--' : pomsData.mainPerent }}</span>
                            <span v-if="pomsData.mainPerent !== null" class="unit">%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dv-wgms-source-monitor-list-item">
                <div class="title">
                    联网率
                </div>
                <div class="content-box dv-wgms-flex-left-center">
                    <img src="./images/source-1.svg" alt="">
                    <div class="right">
                        <div class="value">
                            <span class="online mgr4">{{ pomsData.onlinePercent === null ? '--' : pomsData.onlinePercent }}</span>
                            <span v-if="pomsData.onlinePercent !== null" class="unit">%</span>
                        </div>
                        <div class="percent">
                            <span class="unit">安装设备</span>
                            <span class="rate">{{ pomsData.equipmentCount === null ? '--' : pomsData.equipmentCount }}</span>
                            <span v-if="pomsData.equipmentCount !== null" class="unit">家</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { PropType } from 'vue'
import { pomsMonitor } from './api'
import type { POMS_MONITOR_RES } from './api/types'
const props = defineProps({
    params: {
        type: Object as PropType<POMS_MONITOR_RES.ParamsRequest>,
        default: () => {
            return {
                treeId: 3301,
                treeType: 1,
                year: dayjs().format('YYYY')
            }
        }
    },
    data: {
        type: Object as PropType<POMS_MONITOR_RES.DataResponse>,
        default: () => {}
    },
    isLazy: {
        type: Boolean,
        default: false
    }
})
const pomsData = ref<POMS_MONITOR_RES.DataResponse>({
    equipmentCount: null,
    mainCount: null,
    mainPerent: null,
    onlinePercent: null,
    totalCount: null
})
const getResData = async () => {
    if (props.data && Reflect.ownKeys(props.data).length) {
        pomsData.value = props.data
        return
    }
    const { data: res } = await pomsMonitor(props.params)
    res && (pomsData.value = res)
}

onMounted(() => {
    !props.isLazy && getResData()
})
watch([() => props.params, () => props.data, () => props.isLazy], () => {
    !props.isLazy && getResData()
}, { deep: true })

defineExpose({
    reload: getResData
})
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
