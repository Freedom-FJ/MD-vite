<template>
    <div :class="`${clsfix}-container`">
        <FpiElRolling direction="x" scroll-able :time="siteTypeList.length * 2">
            <div class="list flex-between-center">
                <div v-for="item in siteTypeList" :key="item.code" class="item">
                    <div v-if="item.name.length < 6" class="name">
                        {{ item.name }}
                    </div>
                    <div v-else class="name" :title="item.name">
                        {{ `${item.name.slice(0, 4)}...` }}
                    </div>
                    <div class="num">
                        <span class="pre">{{ item.onlineCount }}</span>
                        <span>/{{ item.totalCount }}</span>
                    </div>
                </div>
            </div>
        </FpiElRolling>
    </div>
</template>

<script lang="ts" setup>
import { FpiElRolling } from '@ued_fpi/element-plus-expand'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import type { GetSiteMonitorTypeTreeParams, SiteTypeData } from './api'
import { getSiteMonitorTypeTree } from './api'

/**
 * 定义props
 */
const props = withDefaults(
    defineProps<{
        // 是否使用内置接口
        isUseBuiltInApi?: boolean
        // 内置接口参数
        apiParams?: GetSiteMonitorTypeTreeParams
        // 内置接口不符合需求时，用外部数据进行覆盖
        data?: SiteTypeData[]
    }>(),
    {
        isUseBuiltInApi: true,
        apiParams: () => ({
            showCount: true,
            withPms: true
        }),
    }
)

const clsfix = 'dv-aims-environment-monitor'

/**
 * 组件数据
 */
const siteTypeList = ref<SiteTypeData[]>([])
// 获取数据
const fetchData = async () => {
    getSiteMonitorTypeTree(props.apiParams).then((res: any) => {
        if (!res) return
        const allList: SiteTypeData[] = []
        getAllChildrenData(res.filter((item: any) => item.code === 'ENV_MONITOR'), allList)
        siteTypeList.value = allList
    })
}
// 递归获取所有最深层children数据
const getAllChildrenData = (data: SiteTypeData[], allList: SiteTypeData[]) => {
    data.forEach((item: any) => {
        if (item.children?.length) {
            getAllChildrenData(item.children, allList)
            return
        }
        allList.push(item)
    })
}
onMounted(() => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch([() => props.apiParams], () => {
    if (props.isUseBuiltInApi)
        fetchData()
})
watch(() => props.data, () => {
    if (!props.isUseBuiltInApi && props.data)
        siteTypeList.value = props.data
})
</script>

<style lang="scss">
@import "@ued_fpi/element-plus-expand/es/src/fpi-el-rolling/style/index.css";
@import "./style/index";
</style>
