<!--
 * @Author: mjh
 * @Date: 2023-07-18 18:45:29
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-26 09:36:57
 * @Description:
-->
<template>
    <div>
        <div class="dv-ipes-alarm-statistics">
            <div class="dv-ipes-top-action dv-ipes-flex-bw-c">
                <span>报警统计<span>（本日）</span></span>
                <div class="dv-ipes-num">
                    {{ all }}
                </div>
            </div>
            <div class="dv-ipes-middle-action dv-ipes-flex-bw-c">
                <div v-for="item in data" :key="item.code" class="dv-ipes-rate" :class="`dv-ipes-${item.code}`" :style="{ width: `${(item.count / Number(all)) * 100}%` }" />
            </div>
            <div class="dv-ipes-bottom-action dv-ipes-flex-bw-c">
                <div class="dv-ipes-labels">
                    <span v-for="item in data" :key="item.code">{{ item.name }}</span>
                </div>
                <div class="dv-ipes-nums dv-ipes-flex-bw-c">
                    <span v-for="item in data" :key="item.code" :class="`dv-ipes-${item.code}-text`">{{ item.count }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { StatisticsType } from '../type'
/**
   * 定义 props
   */

const props = defineProps({
    // 数据
    data: {
        type: Array as PropType<StatisticsType[]>,
        default: () => {
            return []
        }
    },
    all: {
        type: Number,
    }
})
</script>

<script lang="ts">
export default {
    name: 'AlarmStatistics',
}
</script>

<style lang="scss" scoped>
@import "../style/AlarmStatistics";
</style>
