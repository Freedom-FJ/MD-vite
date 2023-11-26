<template>
    <div>
        <div class="dv-ipes-item-wrap">
            <div class="dv-ipes-top-action">
                <div class="dv-ipes-tag" :class="`dv-ipes-level${data.eventLevelCode}`">
                    {{ data.eventLevelName }}
                </div>
                <div class="dv-ipes-time">
                    {{ data.startTimeStr }}
                </div>
            </div>
            <div class="dv-ipes-bottom-action">
                {{ data.description }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { CardType } from '../type'

/**
   * 定义 props
   */

defineProps({
    // 数据
    data: {
        type: Object as PropType<CardType>,
        default: () => {
            return {

            }
        }
    },
})
</script>

<style lang="scss" scoped>
@import "../style/ListItem";
</style>
