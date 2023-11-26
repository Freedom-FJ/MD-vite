<!--
 * @Author: mjh
 * @Date: 2023-07-18 18:45:29
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-21 10:06:49
 * @Description:
-->
<!-- 综合管理 -->
<template>
    <div class="dv-ipes-general-management ipes-general-management-container">
        <Tabs class="dv-ipes-tab" :data="tabList" :model-value="activeTab" @change="changeTab" />
        <ListItem v-for="item, index in cardData" :key="index" class="dv-ipes-list" :data="item" />
        <div v-if="!cardData.length" class="dv-ipes-no-data">
            暂无数据
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import dayjs from 'dayjs'
import request from '../../service/request'
import type { CardType, TabType } from './type'
import Tabs from './components/Tabs.vue'
import ListItem from './components/ListItem.vue'
const props = defineProps({
    tabList: {
        type: Array<TabType>,
        default: () => []
    },
    activeTab: {
        type: String,
        default: 'forewarning'
    },
    cardData: {
        type: Array<CardType>,
        default: () => []
    }
})
const $emit = defineEmits([
    'changeTab'
])
function changeTab(tab: string) {
    $emit('changeTab', tab)
}
</script>

<script lang="ts">
export default {
    name: 'DvIpesGeneralManagement',
    title: '综合管理'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
