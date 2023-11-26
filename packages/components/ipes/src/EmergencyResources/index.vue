<!--
 * @Author: mjh
 * @Date: 2023-07-24 14:15:32
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-26 09:41:21
 * @Description:
-->
<template>
    <div class="dv-ipes-emergency-resources">
        <div class="list-content">
            <div v-for="item in emSoueceData" :key="item.icon" class="list flex flex-s">
                <!-- img.avatar(:src="require(`images/emergency/${item.icon}.png`)") -->
                <img class="avatar" :src="getImageUrl(item.icon)">
                <div class="detail">
                    <div class="label">
                        {{ item.label }}
                    </div>
                    <div class="value">
                        <span>{{ item.count }}</span><span> {{ item.unit }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Item } from './type'
const props = withDefaults(
    defineProps<{
        emSoueceData: Item[]
    }>(),
    {
        emSoueceData: () => ([
            {
                label: '应急预案',
                unit: '个',
                icon: 'preplan',
                key: 'plan',
                count: 0,
            },
            {
                label: '应急专家',
                unit: '人',
                icon: 'expert',
                key: 'professor',
                count: 0,
            },
            {
                label: '应急队伍',
                unit: '支',
                icon: 'team',
                key: 'team',
                count: 0,
            },
            {
                label: '应急人员',
                unit: '人',
                icon: 'personnel',
                key: 'staff',
                count: 0,
            },
            {
                label: '物资库',
                unit: '个',
                icon: 'store',
                key: 'warehouse',
                count: 0,
            },
            {
                label: '应急物资',
                unit: '件',
                icon: 'materials',
                key: 'goods',
                count: 0,
            },
            {
                label: '避难场所',
                unit: '处',
                icon: 'shelter',
                key: 'shelter',
                count: 0,
            },
            {
                label: '保护对象',
                unit: '人',
                icon: 'protected',
                key: 'protection',
                count: 0,
            },
        ]),
    }
)
const getImageUrl = (name: String) => {
    return new URL(`./images/${name}.png`, import.meta.url).href
}
</script>

<script lang="ts">
export default {
    name: 'DvIpesEmergencyResources',
    title: '应急资源',
}
</script>

<style lang="scss">
@import "../common";
@import "./style/index";
</style>
