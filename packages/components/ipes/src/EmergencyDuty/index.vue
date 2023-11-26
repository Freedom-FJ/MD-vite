<!--
 * @Author: mjh
 * @Date: 2023-07-05 16:47:03
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-26 09:46:29
 * @Description:
-->
<template>
    <!-- 应急值守 -->
    <div class="dv-ipes-emergency-duty">
        <div class="env-mg dv-ipes-flex-bw-c">
            <div
                v-for="(item, index) in panelData"
                :key="index"
                class="list dv-ipes-flex-bw-c"
                :style="{
                    'margin': item.isTop ? '4px 0' : 0,
                    'background-image': `url(${getImg(`${item.borderName}`)})`,
                }"
            >
                <div v-if="item.isTop" class="list-user dv-ipes-flex-bw-c">
                    <img class="left" src="./images/user.png">
                    <div class="right">
                        <span> {{ item.label }} </span>
                        <div class="name dv-ipes-single-overflow" :title="item.name">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { type } from './type'
//  展示数据 背景图片borderName取值共有三种 duty、event、accident
const props = withDefaults(
    defineProps<{
        panelData: type[]
    }>(),
    {
        panelData: () => ([
            {
                label: '值班领导',
                key: 'leader',
                isTop: true,
                borderName: 'duty',
                name: '--',
            }, {
                label: '值班人员',
                key: 'user',
                isTop: true,
                borderName: 'duty',
                name: '--',
            }
        ]),
    }
)
const getImg = (name: string) => {
    return new URL(`./images/${name}-border.png`, import.meta.url).href
}
</script>

<script lang="ts">
export default {
    name: 'DvIpesEmergencyDuty',
    title: '应急值守',
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
