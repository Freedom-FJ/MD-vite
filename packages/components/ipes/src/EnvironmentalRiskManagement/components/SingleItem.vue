<template>
    <div>
        <div class="dv-ipes-single-item dv-ipes-flex-bw-c">
            <div class="label">
                {{ data.label }}
            </div>
            <div class="right-action dv-ipes-flex-bw-c">
                <div class="num">
                    {{ data.num }}
                </div>
                <div class="unit">
                    {{ data.unit }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { ItemType } from '../type'

/**
   * 定义 props
   */

const props = defineProps({
    // 数据
    data: {
        type: Object as PropType<ItemType>,
        default: () => {
            return {
                label: '',
                unit: '',
                num: '',
            }
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
