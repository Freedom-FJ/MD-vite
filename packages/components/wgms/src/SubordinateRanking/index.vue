<!--
 * @Descripttion: admin
 * @version: admin
 * @Author: admin
 * @Date: 2023-02-10 10:08:47
 * @LastEditors: mjh
-->
<template>
    <div class="dv-wgms-subordinate-ranking-table">
        <el-scrollbar class="dv-wgms-sub-scroll-table">
            <div v-for="(item, index) in countyData" :key="index" class="dv-wgms-subordinate-ranking-list">
                <span class="dv-wgms-subordinate-ranking-sort">{{ item.rankNo ? `TOP${item.rankNo}` : '--' }}</span>
                <span v-if="item.regionName.length < 6" class="dv-wgms-subordinate-ranking-name">{{ item.regionName }}</span>
                <ElTooltip v-else :content="item.regionName" placement="top" effect="dark">
                    <div class="dv-wgms-subordinate-ranking-name">
                        {{ item.regionName }}
                    </div>
                </ElTooltip>

                <div class="dv-wgms-subordinate-ranking-percent">
                    <div class="dv-wgms-ranking-percent-progress">
                        <ProgressBar
                            active-color="linear-gradient(270deg, var(--dv-color-index) 0%, var(--dv-color-index-30) 100%)"
                            :handle-style="{
                                background: 'var(--dv-color-index)',
                                width: '2px',
                                height: '12px',
                            }"
                            :percentage="Number(item.percent)"
                        />
                    </div>
                    <span class="dv-wgms-ranking-percent-num">{{ item.percent ?? '--' }}%</span>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { PropType } from 'vue'
import { onMounted, reactive, toRefs, watch } from 'vue'
import ProgressBar from '../common/ProgressBar.vue'
import { waterSubordinateRanking } from './api'

const props = defineProps({
    treeId: {
        type: [Number, String],
        default: 3302
    },
    beginTime: {
        type: Number,
        default: dayjs().startOf('year').valueOf()
    },
    endTime: {
        type: Number,
        default: dayjs().subtract(-1, 'y').startOf('year').valueOf()
    },
    timeType: {
        type: String,
        default: 'year'
    },
    controlLevel: {
        type: String,
        default: '001,002,003'
    },
    isLazy: {
        type: Boolean,
        default: false
    },
    data: {
        type: Array as PropType<Array<{
            rankNo: string | number
            regionName: string
            percent?: string | number
        }>>,
        default: () => []
    }
})

defineOptions({
    name: 'DvWgmsSubordinateRanking'
})

const data = reactive({
    isLoading: false,
    curYear: dayjs().format('YYYY'),
    countyData: props.data,
    controlLevel: ''
})

watch(() => props.data, (val) => {
    data.countyData = val
})

watch(() => [props.timeType, props.controlLevel, props.beginTime, props.endTime, props.treeId], () => {
    getRankData()
})

onMounted(() => {
    !props.isLazy && getRankData()
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
    data.isLoading = true
    const params = {
        controlLevel: props.controlLevel,
        treeId: props.treeId,
        startTime: props.beginTime,
        endTime: props.endTime,
        timeType: props.timeType,
    }
    const res: any = await waterSubordinateRanking(params)
    data.countyData = res?.data || []
}

const { countyData } = toRefs(data)

defineExpose({
    reload
})
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
