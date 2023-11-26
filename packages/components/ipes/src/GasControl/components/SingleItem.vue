<template>
    <div>
        <div class="dv-ipes-single-item dv-ipes-flex-bw-c">
            <div class="dv-ipes-label">
                {{ data.label }}
            </div>
            <div class="dv-ipes-right-action dv-ipes-flex-bw-c">
                <div v-for="item, index in data.nums" :key="index" class="dv-ipes-num">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { SingleItemType } from '../type'

/**
   * 定义 props
   */

const props = defineProps({
    // 数据
    data: {
        type: Object as PropType<SingleItemType>,
        default: () => {
            return { }
        }
    },
})
</script>

<script lang="ts">
export default {
    name: 'SingleItem',
}
</script>

<style lang="scss" scoped>
@import "../style/SingleItem";
</style>
