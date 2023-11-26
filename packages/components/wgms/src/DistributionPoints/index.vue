<!--
 * @Descripttion: admin
 * @version: admin
 * @Author: admin
 * @Date: 2023-02-10 10:08:47
 * @LastEditors: mjh
-->
<template>
    <div class="dv-wgms-distribution-points">
        <div v-for="item, index in list " :key="index" class="dv-wgms-distribution-items">
            <div class="dv-wgms-distribution-font-box">
                <div class="dv-wgms-distribution-font-blue">
                    {{ item.count }}
                </div>
            </div>
            <div class="dv-wgms-distribution-name">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { onMounted, ref, watch } from 'vue'
import { situation } from './api'

const props = defineProps({
    treeId: {
        type: [Number, String],
        default: 3302
    },
    monitoringMethods: {
        type: Number as PropType<1 | 0>,
        default: 0
    },
    isLazy: {
        type: Boolean,
        default: false
    }
})

defineOptions({
    name: 'DvWgmsDistributionPoints'
})

interface distributionStatusApiTs {
    'name': string
    'count': number
}

watch([props.monitoringMethods, props.treeId], () => {
    !props.isLazy && getRankData()
})

const list = ref<distributionStatusApiTs[]>([])

onMounted(() => {
    !props.isLazy && getRankData()
})

/**
 * @name: getRankData
 * @test: test font
 * @msg: 获取排名数据
 * @return {*}
 */
const getRankData = async () => {
    const params = {
        monitorType: props.monitoringMethods,
        treeId: props.treeId,
    }
    const res = await situation(params)
    list.value = res?.data || []
}

defineExpose({
    reload: getRankData
})
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
