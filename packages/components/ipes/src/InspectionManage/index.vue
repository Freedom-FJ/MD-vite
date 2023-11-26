<!--
 * @Name: index.vue
 * @Author: forguo
 * @Date: 2023/6/30 10:23
 * @Description: 巡检管理
-->
<template>
    <div class="dv-ipes-inspection-manage">
        <div class="access-row">
            <div class="access-header">
                <div class="access-header__title">
                    <span>巡检事件</span>
                </div>
            </div>
        </div>
        <div class="inspection-event">
            <div class="inspection-num">
                <div class="left">
                    <div class="inspection-total">
                        <span class="label">总数</span>
                        <span class="num">{{ eventTotal || 0 }}</span>
                    </div>
                </div>
                <div class="right">
                    <div class="value">
                        <template v-for="(item, idx) in eventList.list" :key="idx">
                            <span :style="{ color: item.color }">{{ item.value || 0 }}</span>
                            <span v-show="idx !== eventList.list.length - 1" class="space">/</span>
                        </template>
                    </div>
                </div>
            </div>
            <div class="inspection-progress">
                <IpesPercentBar :list="eventList.list" />
            </div>
            <div class="inspection-percent">
                <div class="left">
                    <div class="title">
                        <span>已处置/处置中/未处置</span>
                    </div>
                </div>
                <div class="right">
                    <div class="value">
                        <template v-for="(item, idx) in eventList.list" :key="idx">
                            <span :style="{ color: item.color }">{{ item.percent }}%</span>
                            <span v-show="idx !== eventList.list.length - 1" class="space">/</span>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <div class="access-row">
            <div class="access-header">
                <div class="access-header__title">
                    <!-- <img src="./images/module-title-icon.png" alt="" class="module-icon"> -->
                    <span>巡检计划</span>
                    <span class="inspection-total mgl-8">{{ inspectionList.list.length || 0 }}</span>
                </div>
            </div>
            <div class="inspection-list">
                <el-scrollbar
                    height="264px"
                >
                    <el-empty
                        v-show="!inspectionList.list.length"
                        :image-size="240"
                        :image="noDataImg"
                        description=""
                    />
                    <div
                        v-for="(item, key) in inspectionList.list"
                        :key="key"
                        class="inspection-list-item"
                        :class="{ 'inspection-list-item--active': key === activeIndex }"
                        @click="handleCheck(key, item)"
                    >
                        <div class="inspection-list-item__name">
                            {{ item.PLANNAME }}
                        </div>
                        <div class="inspection-list-item__time">
                            {{ item.BEGINTIME }} ~ {{ item.ENDTIME }}
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import request from '../../service/request'
import IpesPercentBar from '../common/IpesPercentBar.vue'
import { getCssValue } from '../../utils/tools'
import noDataImg from './images/new-nodata.svg'
import type { EventType, InspectionList } from './types'
const props = withDefaults(
    defineProps<{
        eventList?: {
            list: EventType[]
        }
        inspectionList?: {
            list: InspectionList[]
        }
    }>(),
    {
        // 为防止为空默认展示数据
        eventList: () => ({
            list: [
                {
                    value: 50,
                    percent: 10,
                    color: getCssValue('--dv-color-success'),
                    background: getCssValue('--dv-color-success'),
                },
                {
                    value: 20,
                    percent: 20,
                    color: getCssValue('--dv-color-warning'),
                    background: getCssValue('--dv-color-warning'),
                },
                {
                    value: 30,
                    percent: 20,
                    color: getCssValue('--dv-color-danger'),
                    background: getCssValue('--dv-color-danger'),
                },
            ]
        }),
        inspectionList: () => ({
            list: [{
                PLANNAME: '西中岛管委会电力巡检计划',
                BEGINTIME: '2022-12-05 00:00',
                ENDTIME: '2022-12-12 00:00'
            }, {
                PLANNAME: '西中岛管委会电力巡检计划',
                BEGINTIME: '2022-12-05 00:00',
                ENDTIME: '2022-12-12 00:00'
            }]
        })
    }
)
const emits = defineEmits({
    onRecordCheck: (idx: number, value: any) => value,
})

const eventTotal = ref<number>(0)

// 选中的出入园记录
const activeIndex = ref<number>(-1)

// lifecycle
onMounted(() => {
    getEventList()
})

// methods
const getEventList = async () => {
    try {
        eventTotal.value = props.eventList.list.reduce((sum: number, item: EventType) => {
            sum = sum + item.value
            return sum
        }, 0)
    }
    catch (e) {
        console.log(e)
    }
}

const handleCheck = (idx: number, value: any) => {
    activeIndex.value = idx
    emits('onRecordCheck', idx, value)
}
</script>

<script lang="ts">
export default {
    name: 'DvIpesInspectionManage',
    title: '巡检管理'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
