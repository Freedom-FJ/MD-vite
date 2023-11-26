<!-- 任务协同组件 -->
<template>
    <div class="taskDispose">
        <div class="module-content">
            <div class="monitoring-points">
                <div class="common-title">
                    <div class="title-large">
                        任务处置统计
                    </div>
                    <div class="title-time">
                        {{ currentTime }}
                    </div>
                </div>

                <div class="statistics-box">
                    <div v-for="(item, index) in statisticalData" :key="index" class="statistics-item">
                        <div class="category">
                            {{ item.category }}
                        </div>
                        <IpesPercentBar :list="item.list" />
                        <div class="legend-box">
                            <div v-for="(item2, index2) in item.list" :key="index2" class="legend-item">
                                <div class="legend-item-color" :style="{ background: item2.background }" />
                                <span class="legend-item-name">{{ item2.name }}</span>
                                <div class="legend-item-value" :style="{ color: item2.background }">
                                    {{ item2.value }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="duty-name">
                <div class="duty-title">
                    今日值班表
                </div>
            </div>
            <div class="table-box">
                <div v-for="(item, index) in dutyRoster" :key="`${index}dutyRoster`" class="dutyRosterItem">
                    <div class="duty">
                        {{ item.duty }}
                    </div>
                    <div class="name">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { PropType } from 'vue'
import IpesPercentBar from '../common/IpesPercentBar.vue'

/**
 * 定义props
 */
const props = defineProps({
    statisticalData: {
        type: Array as PropType<any[]>,
        default: () => {
            return []
        }
    }, // 任务处置统计数据
    dutyRoster: {
        type: Array as PropType<any[]>,
        default: () => {
            return []
        }
    }, // 值班表数据
})

const currentTime = ref(dayjs().format('YYYY-MM-DD HH'))
</script>

<script lang="ts">
export default {
    name: 'DvIpesTaskDispose',
    title: '任务协同'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
