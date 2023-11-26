<!--
 * @Descripttion: admin
 * @version: admin
 * @Author: admin
 * @Date: 2023-02-10 10:08:47
 * @LastEditors: mjh
-->
<template>
    <div class="dv-wgms-lake-river-index">
        <div class="dv-wgms-lake-river-item">
            <div class="dv-wgms-text-14 dv-wgms-mgb8">
                重要流域水质
            </div>
            <div class="dv-wgms-river-detail dv-wgms-flex-bw-c">
                <div v-for="item, index in keyRiverQuality" :key="index">
                    <div class="dv-wgms-top-river-name dv-wgms-text-14 dv-wgms-mgb12">
                        {{ item.name }}
                    </div>
                    <div class="dv-wgms-flex-c-c">
                        <div class="dv-wgms-lake-level-box" :style="{ background: item.waterQualityColor }">
                            {{ item.waterQualityName }}
                        </div>
                        <div class="dv-wgms-text-14 dv-wgms-white-60 dv-wgms-mgr4">
                            同比
                        </div>
                        <img :src="compareImg[item.yoy || 0]" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="dv-wgms-lake-river-item">
            <div class="dv-wgms-text-14 dv-wgms-mgb8">
                重要水体水质
            </div>
            <div class="dv-wgms-river-detail dv-wgms-flex-bw-c">
                <div v-for="item, index in waterKeyQuality" :key="index">
                    <div class="dv-wgms-top-river-name dv-wgms-text-14 dv-wgms-mgb12">
                        {{ item.name }}
                    </div>
                    <div class="dv-wgms-flex-c-c">
                        <div class="dv-wgms-lake-level-box" :style="{ background: item.waterQualityColor }">
                            {{ item.waterQualityName }}
                        </div>
                        <div class="dv-wgms-text-14 dv-wgms-white-60 dv-wgms-mgr4">
                            同比
                        </div>
                        <img :src="compareImg[item.yoy || 0]" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="dv-wgms-lake-river-item">
            <div class="dv-wgms-text-14 dv-wgms-mgb8">
                重要湖库营养化指数
            </div>
            <div class="dv-wgms-river-detail dv-wgms-flex-bw-c">
                <div v-for="item, index in eutrophication" :key="index">
                    <div class="dv-wgms-top-river-name dv-wgms-text-14 dv-wgms-mgb12">
                        {{ item.name }}
                    </div>
                    <div class="dv-wgms-flex-c-c">
                        <div class="dv-wgms-lake-level-box" :style="{ background: item.waterQualityColor }">
                            {{ item.waterQualityName }}
                        </div>
                        <div class="dv-wgms-text-14 dv-wgms-white-60 dv-wgms-mgr4">
                            {{ item.eutrophia }}
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
import { onMounted, ref } from 'vue'
import { getWgmsEutrophiaList, getWgmsNodeWaterSituation } from './api'
import type { LAKE_RIVER_INDEX_API_RESPONSE } from './api/types'
import img0 from './images/0.svg'
import img1 from './images/1.svg'
import img_1 from './images/-1.svg'

const props = defineProps({
    beginTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    endTime: {
        type: Number,
        default: dayjs().subtract(-1, 'y').startOf('year').valueOf()
    },
    factorGroupId: {
        type: [Number, String],
        default: 8
    },
    timeType: {
        type: String,
        default: 'day'
    },
    treeId: {
        type: [Number, String],
        default: '3301'
    },
    treeType: {
        type: [Number, String],
        default: '1'
    },
    isLazy: {
        type: Boolean,
        default: false
    },
    data: {
        type: Array as PropType<Array<LAKE_RIVER_INDEX_API_RESPONSE.WgmsNodeWaterSituationRes[]>>,
        default: undefined
    }
})

defineOptions({
    name: 'DvWgmsLakeRiverIndex'
})

const compareImg = [img0, img1, img_1]

const keyRiverQuality = ref<LAKE_RIVER_INDEX_API_RESPONSE.WgmsNodeWaterSituationRes[]>([])
const waterKeyQuality = ref<LAKE_RIVER_INDEX_API_RESPONSE.WgmsNodeWaterSituationRes[]>([])
const eutrophication = ref<LAKE_RIVER_INDEX_API_RESPONSE.WgmsNodeWaterSituationRes[]>([])

watch(() => props.data, (val) => {
    if (!val) return
    keyRiverQuality.value = val[0]
    waterKeyQuality.value = val[1]
    eutrophication.value = val[2]
}, { immediate: true, deep: true })

onMounted(() => {
    !props.data && !props.isLazy && getRankData()
})

const reload = () => {
    getRankData()
}
/**
 * @name: getRankData
 * @test: test font
 * @msg: 获取排名数据
 * @return {*}
 */
const getRankData = async () => {
    const params = {
        startTime: props.beginTime,
        endTime: props.endTime,
        factorGroupId: props.factorGroupId,
        queryType: 0,
        timeType: props.timeType,
        treeId: props.treeId,
        treeType: props.treeType
    }
    const allData = await Promise.all([getWgmsNodeWaterSituation({ ...params }), getWgmsNodeWaterSituation({ ...params, queryType: 1 }), getWgmsEutrophiaList({ ...params })])
    keyRiverQuality.value = Object.values(allData[0].data || [])
    waterKeyQuality.value = Object.values(allData[1].data || [])
    eutrophication.value = Object.values(allData[2].data || [])
}

defineExpose({
    reload
})
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
@import "./style/common";
</style>
