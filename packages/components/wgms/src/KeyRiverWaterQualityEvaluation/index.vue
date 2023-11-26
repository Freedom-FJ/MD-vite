<!--
 * @Author: mjh
 * @Date: 2023-07-18 18:45:29
 * @LastEditors: Tian
 * @LastEditTime: 2023-09-08 17:40:19
 * @Description:
-->
<template>
    <div class="dv-wgms-key-river dv-wgms-flex-around-center">
        <div v-for="item, index in listData" :key="index" class="dv-wgms-key-river-one dv-wgms-flex-center-center">
            <div class="dv-wgms-key-river-one-name">
                {{ item.name }}
            </div>
            <div class="dv-wgms-key-river-one-content">
                <div class="dv-wgms-key-river-one-content-text" :style="{ color: item.color }">
                    {{ item.evaluate || '--' }}
                </div>
                <img :src="getImg(`${item.grade || 0}.svg`)" alt="">
            </div>
            <div class="dv-wgms-key-river-one-compare dv-wgms-flex-left-center">
                <span>同比</span>
                <commonArrow v-if="item.yoyType !== null" :direction="item.yoyType > 0 ? 'up' : item.yoyType < 1 ? 'down' : 'flat'" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import commonArrow from '../common/common-arrow.vue'
import { getKeyRiverData } from './api'
import type { KEY_RIVER_RES } from './api/types'
const props = withDefaults(defineProps<{
    params: KEY_RIVER_RES.ParamsRequest
    data: KEY_RIVER_RES.DataResponse[]
    isLazy: boolean
}>(), {
    params: () => {
        return {
            startTime: dayjs().startOf('year').valueOf(),
            endTime: dayjs().endOf('year').valueOf(),
            timeType: 'hour',
            treeId: '3301'
        }
    },
    data: () => {
        return []
    },
    isLazy: false

})
const imgList: any = import.meta.globEager('./images/*')
const listData = ref<KEY_RIVER_RES.DataResponse[]>([])
onMounted(() => {
    !props.isLazy && getResData()
})
watch([() => props.params, () => props.data, () => props.isLazy], () => {
    !props.isLazy && getResData()
}, { deep: true })

const getResData = async () => {
    if (props.data && props.data.length) {
        listData.value = props.data
        return
    }
    const { data } = await getKeyRiverData(props.params)
    data && (listData.value = data)
}
const getImg = (url: string) => {
    return imgList[`./images/${url}`]?.default
}

defineExpose({
    reload: getResData
})
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./index";
</style>
