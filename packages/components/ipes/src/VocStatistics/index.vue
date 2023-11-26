<!-- VOCs预警频次 -->
<template>
    <div class="vocStatistics">
        <div v-for="m, n in data" :key="n" class="base-item">
            <div class="year">
                {{ m.label }}年
            </div>
            <div class="degree">
                <div class="degree_num">
                    {{ m.value }}
                </div>
                <div class="degree_text">
                    次
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref } from 'vue'
/**
 * 定义props
 */
const props = defineProps({
    data: {
        type: Array as PropType<any[]>,
        default: () => {
            return []
        }
    }, // voc数据
})

const show = ref(false)
</script>

<script lang="ts">
export default {
    name: 'DvIpesVocStatistics',
    title: 'VOCs管控'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
