<!--
 * @Author: mjh
 * @Date: 2023-07-17 19:15:37
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 17:33:14
 * @Description:
-->
<template>
    <div class="dv-wgms-env-online dv-wgms-flex-between-center">
        <div v-for="item, index in listData" :key="index" class="dv-wgms-item-one dv-wgms-flex-between-center">
            <div class="dv-wgms-name">
                {{ item.name }}
            </div>
            <div class="dv-wgms-value">
                <span class="dv-wgms-online"> {{ item.onlineCount === null ? '--' : item.onlineCount }}</span>
                <span class="dv-wgms-split">/</span>
                <span class="dv-wgms-total">{{ item.total === null ? '--' : item.total }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { WATER_ENV_ONLINE_RES } from './api/types'
import { getWaterEnvOnlineData } from './api/index'
const props = withDefaults(defineProps<{
    params: WATER_ENV_ONLINE_RES.ParamsRequest
    data: WATER_ENV_ONLINE_RES.DataResponse[]
    isLazy: boolean
}>(), {
    params: () => {
        return {
            regionCode: '3301'
        }
    },
    data: () => {
        return []
    },
    isLazy: false

})
const listData = ref<WATER_ENV_ONLINE_RES.DataResponse[]>([])
const getResData = async () => {
    if (props.data && props.data.length) {
        listData.value = props.data
        return
    }
    const { data } = await getWaterEnvOnlineData(props.params)
    data && (listData.value = data)
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
@import "./index";
</style>
